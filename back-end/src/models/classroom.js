'use strict'

const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  course: {
    type: String,
    trim: true,
    required: true
  },
  teacher: {
    type: String,
    trim: true,
    required: true
  },
  subject: {
    type: String,
    trim: true,
    required: true
  },
  day: [{
    type: String,
    trim: true,
    required: true
  }],
  schedule: [{
    type: String,
    trim: true,
    required: true
  }]
})

module.exports = mongoose.model('ClassRoom', schema)