const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
// Middleware necesario para parsear parametros del POST.
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(express.static("public"));

app.set("view engine", "hbs");
hbs.registerPartials("./views/partials");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require("./routes/index")); //importante que este esto DESPUES de urlencoded

let mongodb = "mongodb://localhost:27017/municipio";

mongoose.connect(mongodb, {}, (err) => {
  if (err) {
    console.error("Error de conexion con la BDD", err);
  }
});

//Rutas

app.get("/", (req, res) => {
  res.render("home.hbs");
});

app.get("/usuario/administrador", (req, res) => {
  res.render("administrador.hbs");
});

app.get("/usuario/contribuyente", (req, res) => {
  res.render("contribuyente.hbs");
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
