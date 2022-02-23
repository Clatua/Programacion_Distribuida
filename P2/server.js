require('dotenv').config()
const express = require('express')
const app = express()
const { appconfig } = require('./lib/conf');

// Metodo GET en raiz

app.get('/', function(req, res) {

    res.send('Hola Mundo!');
    
    });
    
    // Metodo GET en una ruta
    
    app.get('/get', function (req, res) {
    
    res.send('GET de respuesta desde la ruta /get');
    
    });
    
    // Metodo POST en una ruta
    
    app.post('/post', function (req, res) {
    
    res.send('POST de respuesta desde la ruta /post');
    
    });
    
    app.post(/.*_search$/, function(req, res) {
        res.send(`/.*_search/ - ${req.originalUrl}`);
      });

    app.listen(appconfig.port,()=>
        console.log('Puesto en marcha el puerto')
        );