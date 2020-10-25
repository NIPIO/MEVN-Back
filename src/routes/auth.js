const express = require('express')
const router = express.Router(); //objecto para almacenar rutas
const User = require('../models/Auth') //modelo que viene de Models, es así como se hacen petciones a mongoose

/*
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
*/



//Se obtiene con req.body
router.get('/signUp' , (req, res) => {
		   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'signUp'
		})  
	// User.find({"email": req.body.email}).then(user=>{ 
	// 	//hay un registro
	// 	if(user.length > 0){
	// 		res.json({
	// 			existeUsuario: true,
	// 			color: 'red',
	// 			mensaje: 'Existe ya un usuario con ese mail'
	// 		})
	// 	} else {
	// 		const newUser = new User(req.body)
	// 		newUser.save().then(()=>
	// 			res.json({
	// 				existeUsuario: false,
	// 				color: 'green',
	// 				mensaje: 'Usuario creado!'
	// 			})
	// 		)
	// 	}
	// })
}) 


//Se obtiene con req.body EN LOCAL
//Se obtiene con req.query EN HEROKU
router.get('/signIn' , (req, res) => { 
	User.find({"email": req.body.email, "password": req.body.password}).then(user=>{ 
		// hay usuario
		if (user.length > 0) {
			res.json({
				error: false
			})
		} else {
			//no hay pero existe el mail
			User.find({"email": req.body.email}).then(user=>{ 
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
			   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'delete user'
			
		})
	// User.findByIdAndDelete(req.params.id, function (err, docs) { 
	//    	err ? 	
	//    	res.json({
	// 		status:  err
	// 	}) 
	// 	:  
	// 	res.json({
	// 		status: "Usuario eliminado"
	// 	})
	// }) 
});


router.get('/all' , (req, res) => { 
			   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'get user'
			
		}) 
	// User.find().then(users=>{ 
	// 	res.json({users})
	// })
}) 
module.exports = router
