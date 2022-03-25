require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')
const { appConfig } = require('./lib/config')
const connection = require('./db/mysql.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/404', function(req, res) {
    res.render('404');
});

app.get('/registro', function(req, res) {
    res.render('registro');
});

app.get('/movies', function(req, res) {
    connection.query('SELECT * FROM telematica4c.movie' ,function(err, result, fields){
        //console.log(result[0]['titulo'])     
         res.render('movies',{data:result})

    })
});

app.get('/movieadd', function(req, res) {
    res.render('movieadd');
});

app.get('/dash', function(req, res) {
    console.log(req.body)
});

app.post('/registroUser', function(req, res) {
    if(req.body.registro == ""){
        let pass  = md5(req.body.pass) //Ciframos la contraseña.
        //Realizamos la query del insert de los datos enviados.
        connection.query('INSERT INTO registro (user, email, password) VALUES (?, ?, ?)',[req.body.username, req.body.email, pass], function(err, result, fields){
            
            if (err){
                throw err; //Si hay un error, lo muestra
                res.redirect('/')
            }
                
            
        })
       }else{
        res.redirect('/')
       }
});

app.post('/addmovie',(req,res)=>{
    if(req.body.agregarpeli == ""){
        res.redirect('/movieadd')
    }else{
        res.redirect('/404')
    }
})

app.post('/addmovies',(req,res)=>{
    if(req.body.agregar == ""){
        connection.query('INSERT INTO movie (titulo, descripcion, fecha) VALUES (?, ?, ?)',[req.body.nombre, req.body.descc, req.body.fecha], (err, result, fields)=>{
            
            if (err){
                throw err; //Si hay un error, lo muestra
                res.redirect('/')
            }
        })
        }else{
            res.redirect('/movies')
        }
})

app.post('/auth', function(req, res) {
    
    if(req.body.sesion == ""){
        let pass = md5(req.body.pass)
        
        var sql = 'SELECT id, user, email FROM telematica4c.registro WHERE email = "' + req.body.email +'" AND password = "' + pass +'"';
        
        connection.query(sql , function(err, resp, fields){
            if(resp.length){
                res.render('movies', {correo: resp[0].email});
            }else{
                res.redirect('/404')
            }
        });
        
    }else{
        res.redirect('/registro')
    }
});

app.listen(appConfig.port, ()=> console.log(`Puesto en marcha en puerto ${appConfig.port}`))