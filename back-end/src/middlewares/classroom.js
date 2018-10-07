'use strict'

const moongoose = require('mongoose')
const ClassRoom = moongoose.model('ClassRoom')

exports.get = async() => {
  try {
    const data = await ClassRoom.find()
    if (data.length === 0) {
      return {
        error: true,
        message: 'Não há nenhuma aula cadastrada'
      } 
    }
    else {
      return data
    }
  }     
  catch (error) {
    throw error
  }
}

exports.getByName = async(name) => {
  try {
    const data = await ClassRoom.find({ name: name })
    if (data.length === 0) {
      return {
        error: true,
        message: 'Não há nenhuma aula cadastrada'
      } 
    }
    else {
      return data
    }
  }     
  catch (error) {
    throw error
  }
}

exports.create = async(formData) => {
  try {
    const classroom = new ClassRoom(formData)
    let response = await classroom.save()
    
    if (response) {
      return {
        error: false,
        message: 'O horário foi adicionado.'
      }
    }
    else {
      return {
        error: true,
        message: 'Não foi possível adicionar o horário.'
      }
    }
  }
  catch (error) {
    throw error
  }
}

exports.update = async(data) => {
  try {
    await ClassRoom
      .findOneAndUpdate( {name: data.name }, data, function(err) {
        if (err) {
          return {
            error: true,
            message: 'Não foi possível atualizar a sala'
          }
        }
        else {
          return {
            error: false,
            message: 'Sala atualizada com sucesso'
          }
        }
      })
  }
  catch (error) {
    throw error
  }
}

exports.delete = async(id) => {
  try {
    const res = await ClassRoom.findByIdAndRemove({_id: id })
    return res
  }
  catch (error) {
    throw error
  }
}