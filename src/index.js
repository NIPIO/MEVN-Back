const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')

//Settings
const app = express();
// mongoose.connect('mongodb://localhost/mevn-database')
//datos en connect cuando se crea el cluster https://cloud.mongodb.com/v2/5f94e334f114b91d818a5cc4#clusters
mongoose.connect('mongodb+srv://nmpiovano:cnrt1234@encuentrosdb.jyi5k.mongodb.net/encuentrosDB?retryWrites=true&w=majority')
	.then(db => console.log('Db conectada'))
	.catch(error => console.log(error))

	
app.set('port', process.env.PORT || 3000); //dame el puerto que te da la aplicacion o correlo en el 3000

//Middlewares -> functiones del npm que se ejecutan antes de las rutas
app.use(morgan('dev'))
app.use(express.json()) //cada json que se reciba del navegador, el servidor lo va a poder entender
app.use(cors())


//Routes -> incluyo el archivo de rutas
app.use('/encuentros', require('./routes/encuentros')) 
app.use('/users', require('./routes/auth')) 


//Static files -> archivos que se envian al front end
app.use(express.static(__dirname + '/public')) // va ir a buscar el index.html y lo pinta en el navegador




//Server on
app.listen(app.get('port'), () => {
	console.log('Server on', app.get('port'))
})