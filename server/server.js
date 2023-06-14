//!!!teraz kazdy request sprawdza token!!!

require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const mysql = require("mysql")

let corsOptions = {
    origin : ['http://127.0.0.1:5500'],
}    

const mysqldb = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",       //localhost
    user: "root",            //root
    password: "",            //no pass
    database: "koishi",      //db name
    port: "3306"             //3306 default
 })
 mysqldb.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successfully: " + connection.threadId)
 })

mongoose.connect("mongodb+srv://pestosz:pestosz@cluster0.sqwp9xj.mongodb.net/koishi?authMechanism=DEFAULT", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

//💀💀💀💀💀💀
app.use(cors(corsOptions))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5500");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Body', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

const remindersRouter = require('./routes/reminders')
app.use('/reminders', remindersRouter)


//start server
app.listen(3000, () => console.log('Server Started'))

//to nizej nie dzialalo w innym pliku wiec jest tu
const bcrypt = require("bcrypt")

app.use(express.json())

app.post("/createUser", async (req,res) => {
const user = req.body.name;
const hashedPassword = await bcrypt.hash(req.body.password,10);
mysqldb.getConnection( async (err, connection) => {
 if (err) throw (err)
 const sqlSearch = "SELECT * FROM credentials WHERE name = ?"
 const search_query = mysql.format(sqlSearch,[user])
 const sqlInsert = "INSERT INTO credentials VALUES (0,?,?)"
 const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
 
 await connection.query (search_query, async (err, result) => {
  if (err) throw (err)
  console.log("------> Search Results")
  console.log(result.length)
  if (result.length != 0) {
   connection.release()
   console.log("------> User already exists")
   res.sendStatus(409) 
  } 
  else {
   await connection.query (insert_query, (err, result)=> {
   connection.release()
   if (err) throw (err)
   console.log (`--------> Created new User: ${user}`)
   console.log(result.insertId)
   res.sendStatus(201)
  })
 }
}) 
}) 
}) 

const generateAccessToken = require("./generateAccessToken")
app.post("/login", (req, res)=> {
const user = req.body.name
const password = req.body.password
mysqldb.getConnection ( async (err, connection)=> {
if (err) throw (err)
 const sqlSearch = "Select * from credentials where name = ?"
 const search_query = mysql.format(sqlSearch,[user])
await connection.query (search_query, async (err, result) => {
connection.release()
  
  if (err) throw (err)
if (result.length == 0) {
   console.log("--------> User does not exist")
   res.sendStatus(404)
  } 
  else {
   const hashedPassword = result[0].password
if (await bcrypt.compare(password, hashedPassword)) {
    console.log("---------> Login Successful")
    console.log("---------> Generating accessToken")
    const token = generateAccessToken({user: user})   
    console.log(token)
    res.json({accessToken: token,})
   } else {
    res.send("Password incorrect!")
   } 
}
}) 
}) 
}) 


