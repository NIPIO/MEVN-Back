const express = require('express')
const router = express.Router(); //objecto para almacenar rutas
const User = require('../models/Auth') //modelo que viene de Models, es así como se hacen petciones a mongoose


router.get('/signUp' , (req, res) => { 
	User.find({"email": req.query.email}).then(user=>{ 
		//hay un registro
		user.length > 0 ?
		res.json({
			existeUsuario: true,
			color: 'red',
			mensaje: 'Existe ya un usuario con ese mail'
		}) : 
		res.json({
			existeUsuario: false,
			color: 'green',
			mensaje: 'Usuario creado!'
		})
	})
}) 

router.get('/signIn' , (req, res) => { 
	User.find({"email": req.query.email, "password": req.query.password}).then(user=>{ 
		user.length > 0 ?
		res.json({
			error: false
		}) : 
		res.json({
			error: true,
			color: 'red',
			mensaje: 'Credenciales incorrectas. Logueate, por favor.'
		})
	})
}) 

router.get('/all' , (req, res) => { 
	User.find().then(users=>{ 
		res.json({users})
	})
}) 
module.exports = router
