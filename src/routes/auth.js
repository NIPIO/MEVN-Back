const express = require('express')
const router = express.Router(); //objecto para almacenar rutas
const User = require('../models/Auth') //modelo que viene de Models, es así como se hacen petciones a mongoose

router.get('/signUp' , (req, res) => {
	//Se obtiene con req.body
	//Se obtiene con req.query EN HEROKU	
	let params = req.query
	Object.keys(params).length < 1 ? params = req.body : null

	User.find({"email": params.email}).then(user=>{ 
		//hay un registro
		if(user.length > 0){
			res.json({
				existeUsuario: true,
				color: 'red',
				mensaje: 'Existe ya un usuario con ese mail'
			})
		} else {
			const newUser = new User(params)
			newUser.save().then(()=>
				res.json({
					existeUsuario: false,
					color: 'green',
					mensaje: 'Usuario creado!'
				})
			)
		}
	})
}) 



router.get('/signIn' , (req, res) => { 
	//Se obtiene con req.body EN LOCAL
	//Se obtiene con req.query EN HEROKU
	let params = req.query
	Object.keys(params).length < 1 ? params = req.body : null
	

	User.find({"email": params.email, "password": params.password}).then(user=>{ 
		// hay usuario
		if (user.length > 0) {
			res.json({
				error: false
			})
		} else {
			//no hay pero existe el mail
			User.find({"email": params.email}).then(user=>{ 
				console.log(user)
				if (user.length > 0) {
					res.json({
						error: true,
						color: 'red',
						mensaje: 'Contraseña incorrecta.'
					})
				} else {
					res.json({
						error: true,
						color: 'red',
						mensaje: 'Credenciales incorrectas. Logueate, por favor.'
					})
				}
			})

		}
	})
}) 


//Se obtiene con req.params
router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, function (err, docs) { 
	   	err ? 	
	   	res.json({
			status:  err
		}) 
		:  
		res.json({
			status: "Usuario eliminado"
		})
	}) 
});


router.get('/all' , (req, res) => { 
	User.find().then(users=>{ 
		res.json({users})
	})
}) 
module.exports = router
