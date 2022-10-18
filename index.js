
/*
  npm install --save nodemon
  npm install --save express
  npm install --save mongooose
  npm install --save hbs
  npm install --save body-parser
  npm install --save bcryptjs
  npm install --save jsonwebtokens
  npm start

  Postman:
    localhost:3000/...
*/


const express = require("express");
require("./config/config.js");
const app = express();
const mongoose = require('mongoose');

const hbs = require("hbs");
// Middleware necesario para parsear parametros del POST.
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jsw = require("jsonwebtoken");

app.use(express.static("public"));

app.set("view engine", "hbs");
hbs.registerPartials("./views/partials");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
 app.use(bodyParser.json());

app.use(require("./routes/index")); //importante que esto DESPUES de urlencoded

const mongodb = "mongodb://0.0.0.0:27017/municipalidad";

mongoose.connect(mongodb, (err) => {
    if(err){
        console.log("Ocurrio un error ", err);
    }else{
        console.log("Conexion exitosa");
    }
})

//Rutas

app.get("/", (req, res) => {
   res.render("home.hbs");
 });

 app.get("/usuario/administrador", (req, res) => {
   res.render("administrador.hbs");
 });

app.get("/usuario/contribuyente", (req, res) => {
  res.render("contribuyentes.hbs");
});

app.listen(process.env.PORT, () => {
   console.log(`Escuchando en el puerto ${process.env.PORT}`);
});

