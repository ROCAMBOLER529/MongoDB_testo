const express = require("express");
const app = express();

// se llama a persona.js
app.use(require("./persona.js"));
app.use(require("./reclamos.js"));
app.use(require("./login.js"));

// se exporta el archivo index
module.exports = app;
