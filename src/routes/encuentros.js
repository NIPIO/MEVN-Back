const express = require('express')
const router = express.Router(); //objecto para almacenar rutas
const Encuentros = require('../models/Encuentros') //modelo que viene de Models, es así como se hacen petciones a mongoose
const imageSearch = require('image-search-google');
const client = new imageSearch('7a460b780129f0c50', 'AIzaSyCCGge0AcnsCP2THzX3LI7FIVHObEqYpAo');
const options = {page:1};


/*
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
IMPORTANTE REQ.PARAMS PARA OBTENER IDS PASADOS POR PARMETRO. REQ.BODY PARA OBJETOS ENVIADOS EN LA PETICION!!!
*/




////////////// 1- Promesas (.then()) //////////////
router.get('/' , (req, res) => { //cuando soliciten esta ruta...
	Encuentros.find().then(response=>{ //.find es como un Select * from
		console.log('Promesas', Encuentros)
		res.json(response)
	})
}) 

////////////// 2- Async Await //////////////
//Se obtiene con req.body
router.post('/', async (req, res) => {			
			   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'POST Enc'
		}) 
	// client.search(req.body.localidad, options)
 //    .then(images => {
 //    	const newEncuentro = new Encuentros(req.body)
 //    	newEncuentro.src = images[0].url
	// 	newEncuentro.save().then(()=>
	// 		res.json({
	// 			status: 'Encuentro guardado'
	// 		})
	// 	)
 //    })
	// .catch(error =>
	// 	res.json({
	// 		error: true,
	// 		status: error
	// 	})
	// );
})


router.put('/:id' , async (req, res) => {
			   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'put Enc'

		}) 
	// await Encuentros.findByIdAndUpdate(req.params.id, req.body)
	// res.json({
	// 	status: 'Encuentro actualizado'
	// })
})


router.get('/:id' , (req, res) => { //cuando soliciten esta ruta...
			   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'get Enc'

		}) 
	// Encuentros.findById({_id: req.params.id}).then(response=>{ //.find es como un Select * from
	// 	res.json(response)
	// })
}) 


////////////// 3- Callbacks (funciones dentro de funciones) //////////////
router.delete('/:id', (req, res) => {
			   	res.json({
			a:  req.body,
			b:  req.query,
			c:  req.params,
			d: 'delete Enc'
			
		}) 
	// Encuentros.findByIdAndDelete(req.params.id, function (err, docs) { 
	//    	err ? 	
	//    	res.json({
	// 		status:  err
	// 	}) 
	// 	:  
	// 	res.json({
	// 		status: "Encuentro eliminado"
	// 	})
	// }) 
});


module.exports = router