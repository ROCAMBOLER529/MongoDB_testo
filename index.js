// npm install -> instala.

const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

// import persona.js
app.use(require("./routes/index.js"));

// nodemon -> 
// json: todos los campos van separados por comas MENOS el ultimo

const mongoDB = `mongodb://localhost/municipio`;
mongoose.connect(mongoDB, {}, (err) => {
    if (err) {
        console.log("Hubo un error en: ", err);
    } else {
        console.log("Se conecto!");
    }
})

app.listen(PORT, () => {
    console.log(`Escuchando en el puertoooooo ${PORT}...`);
});

