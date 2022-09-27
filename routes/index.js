// 
const express = require("express");
const app = express();

// se llama a persona.js
app.use(require("./persona.js"));



// se exporta el archivo index
module.exports = app;