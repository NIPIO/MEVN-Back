const mongoose = require('mongoose')
const { Schema } = mongoose //solo requiero el Schema de mongoose

const User = new Schema({
	name: String,
	email: String,
	password: String,
})

module.exports = mongoose.model('User', User)