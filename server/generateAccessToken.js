const jwt = require("jsonwebtoken")
const jwtKey = "sci_zlota_szkola";
function generateAccessToken (user) {
const token = jwt.sign(user, jwtKey, {expiresIn: "24h"})
return token
}
module.exports=generateAccessToken