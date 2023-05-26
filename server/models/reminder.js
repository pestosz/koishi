const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const reminderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: false
  },
  content: {
    type: String,
    required: true,
    trim: false
  },
  data: {
    type: String,
    required: false,
    trim: false
  },
  istodo: {
    type: Boolean,
    required: true,
    default: false
  }
})
reminderSchema.plugin(timestamp)
module.exports = mongoose.model('Reminder', reminderSchema)