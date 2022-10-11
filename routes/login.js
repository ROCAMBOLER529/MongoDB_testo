const express = require("express");
const app = express();
const Persona = require("../models/persona.js"); // importa los modelos de persona.js

app.post(`/personas/login`, async (req, res) => {
    const {Uid, mail, password} = req.body; // id de personas/${id} 
    Persona.findOne({_id: Uid}).exec(async (err, data) => {
        if (err) {
            res.status(400).json({
                resu: "Usuario no existente",
                err
            });
        } else {
             
        }
    });
});

// ¡¡ESTUDIAR ASYNCRONISMO!!

module.exports = app;
