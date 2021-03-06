const express = require('express')
const router = express.Router(); //objecto para almacenar rutas
const Encuentros = require('../models/Encuentros') //modelo que viene de Models, es así como se hacen petciones a mongoose
const imageSearch = require('image-search-google');
const client = new imageSearch('7a460b780129f0c50', 'AIzaSyCCGge0AcnsCP2THzX3LI7FIVHObEqYpAo');
const options = {page:1};


////////////// 1- Promesas (.then()) //////////////
router.get('/' , (req, res) => { 
	Encuentros.find().then(response=>{ 
		console.log('Promesas', Encuentros)
		res.json(response)
	})
}) 

////////////// 2- Async Await //////////////
//Se obtiene con req.body
router.post('/', async (req, res) => {			
	client.search(req.body.localidad + ' paisaje Argentina', options)
    .then(images => {
    	const newEncuentro = new Encuentros(req.body)
    	newEncuentro.src = images[0].url
		newEncuentro.save().then(()=>
			res.json({
				status: 'Encuentro guardado'
			})
		)
    })
	.catch(error =>
		res.json({
			error: true,
			status: error
		})
	);
})


router.put('/:id' , async (req, res) => {
	await Encuentros.findByIdAndUpdate(req.params.id, req.body)
	res.json({
		status: 'Encuentro actualizado'
	})
})

//req.params.id para el id
router.get('/:id' , (req, res) => {
	Encuentros.findById({_id: req.params.id}).then(response=>{
		res.json(response)
	})
}) 


////////////// 3- Callbacks (funciones dentro de funciones) //////////////
//req.params.id para el id
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