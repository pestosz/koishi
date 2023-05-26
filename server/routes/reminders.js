const express = require('express')
const router = express.Router()
const reminders = require('../models/reminder')
const bodyParser = require("body-parser")

let urlencodedParser = bodyParser.urlencoded({extended: false})

// Getting all
router.get('/', async (req, res) => {
  try {
    const reminder = await reminders.find()
    res.json(reminder)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get('/test', async (req, res) => {
  try {
    const reminder = await reminders.find()
    res.json(reminder)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getReminder, (req, res) => {
  res.json(res.reminder)
})

// Creating one
router.post('/add', async (req, res) => {
  const neureminder = new reminders({
    name: req.body.name,
    content: req.body.content,
    data: req.body.data,
    istodo: req.body.istodo
  })
  console.log(neureminder)
  try {
    const newReminder = await neureminder.save()
    res.status(201).json(newReminder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getReminder, async (req, res) => {
  if (req.body.name != null) {
    res.reminder.name = req.body.name
  }
  if (req.body.content != null) {
    res.reminder.content = req.body.content
  }
  if (req.body.data != null) {
    res.reminder.data = req.body.data
  }
  if (req.body.istodo != null) {
    res.reminder.istodo = req.body.istodo
  }
  try {
    const updatedReminder = await res.reminder.save()
    res.json(updatedReminder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getReminder, async (req, res) => {
  try {
    await res.reminder.remove()
    res.json({ message: 'Deleted Reminder' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getReminder(req, res, next) {
  let reminder
  try {
    reminder = await reminders.findById(req.params.id)
    if (reminder == null) {
      return res.status(404).json({ message: 'Cannot find the reminder' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.reminder = reminder
  next()
}

module.exports = router