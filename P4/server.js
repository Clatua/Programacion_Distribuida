require('dotenv').config()
const express = require('express')
const app = express()
const { appConfig } = require('./lib/config')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug');


app.get('/', function(req, res) {
    res.render('index');
});
app.get('/practica', function(req, res) {
    //Renderizar vista
    res.render('vista');
});
app.post('/ingreso', function(req, res) {
    let pass = md5(req.body.oass);
    res.render('ingreso',{correo:req.body.email, pass:pass});
    //res.send(`Has ingresado con el correo ${req.body.email} y con la contraseña ${req.body.pass}`)
});

app.listen(appConfig.port, ()=> console.log(`Puesto en marcha en puerto ${appConfig.port}`))