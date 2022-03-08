require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const md5 = require('md5')
const { appConfig } = require('./lib/config')
const whitelist = ['https://github.com/Clatua/Programacion_Distribuida.git']

app.use(cors({origin: whitelist}))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/practica', function (req, res) {
    res.render('practica');
});

app.post('/ingreso', function (req, res) {
    //res.send(`Has ingresado con el correo ${req.body.email} y con la contraseña ${req.body.pass}`)
    let pass = md5(req.body.pass)
    res.render('ingreso', { correo: req.body.email, pass: pass });
});

app.listen(appConfig.port, () => console.log(`Puesto en marcha en puerto ${appConfig.port}`)) 