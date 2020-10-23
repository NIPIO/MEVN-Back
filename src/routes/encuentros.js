const express = require('express')
const router = express.Router(); //objecto para almacenar rutas
const Encuentros = require('../models/Encuentros') //modelo que viene de Models, es así como se hacen petciones a mongoose

//Puedo trabajar de 3 maneras para esperar respuesta de la base:
//los metodos son independientes de las maneras

////////////// 1- Promesas (.then()) //////////////
router.get('/' , (req, res) => { //cuando soliciten esta ruta...
	Encuentros.find().then(response=>{ //.find es como un Select * from
		console.log('Promesas', Encuentros)
		res.json(response)
	})
}) 

////////////// 2- Async Await //////////////

router.post('/', async (req, res) => {
	const newEncuentro = new Encuentros(req.body)
	await newEncuentro.save()
	res.json({
		status: 'Encuentro guardado'
	})
})


router.put('/:id' , async (req, res) => {
	await Encuentros.findByIdAndUpdate(req.params.id, req.body)
	res.json({
		status: 'Encuentro actualizado'
	})
})


router.get('/:id' , (req, res) => { //cuando soliciten esta ruta...
	Encuentros.findById({_id: req.params.id}).then(response=>{ //.find es como un Select * from
		res.json(response)
	})
}) 


////////////// 3- Callbacks (funciones dentro de funciones) //////////////
router.delete('/:id', (req, res) => {
	Encuentros.findByIdAndDelete(req.params.id, function (err, docs) { 
	   	err ? 	
	   	res.json({
			status:  err
		}) 
		:  
		res.json({
			status: "Encuentro eliminado"
		})
	}) 
});


module.exports = router