'use strict'

const mongoose    = require('mongoose')
const ClassRoom   = mongoose.model('ClassRoom')
const middleware  = require('../middlewares/classroom')

exports.get = async(req, res, next) => {
  try {
    const data = await middleware.get()
    res.status(200).send(data)
  } 
  catch (error) {
    res.status(200).send({
      error: true,
      message: error
    })
  }
}

exports.getByName = async(req, res, next) => {
  try {
    const data = await middleware.getByName(req.params.name)
    res.status(200).send(data)
  } 
  catch (error) {
    res.status(200).send({
      error: true,
      message: error
    })
  }
}

exports.post = async(req, res, next) => {
  try {
    const data = await middleware.create(req.body)
    res.status(200).send(data)
  } 
  catch (error) {
    res.status(200).send({
      error: true,
      message: error
    })
  }
}

exports.put = async(req, res, next) => {
  try {
    const data = await middleware.create(req.body)
    res.status(200).send(data)
  } 
  catch (error) {
    res.status(200).send({
      error: true,
      message: error
    })
  }
}


exports.delete = async(req, res, next) => {
  try {
    console.log('ENTREI AQUI', req.params.id)
    const data = await middleware.delete(req.params.id)
    res.status(200).send(data)
  } 
  catch (error) {
    res.status(200).send({
      error: true,
      message: error
    })
  }
}