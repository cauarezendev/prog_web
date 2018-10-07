'use strict'

const express     = require('express')
const controller  = require('../controllers/classroom')

const router      = express.Router()

router.get('/', controller.get)
router.get('/:name', controller.getByName)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/:id', controller.delete)

module.exports = router