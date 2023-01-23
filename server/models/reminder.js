const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  istodo: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Reminder', reminderSchema)