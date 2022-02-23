require('dotenv').config()
const express = require('express')
const app = express()
const { appconfig } = require('./Config/config');

app.listen(appconfig.port,()=>
console.log('Puesto en marcha el puerto'));