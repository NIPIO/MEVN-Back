const mongoose = require('mongoose')
const { Schema } = mongoose //solo requiero el Schema de mongoose

const Encuentros = new Schema({
	localidad: String,
	provincia: String,
	details: String,
	src: String,
	date: String,
	time: String,
	clima: Object
})

module.exports = mongoose.model('Task', Encuentros)