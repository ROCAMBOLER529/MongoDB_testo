const express = require("express");
const app = express();
const Persona = require("../models/persona.js"); // importa los modelos de persona.js

app.get("/personas/all", (req, res) => {
    Persona.find().exec((err, personas_data) => {
        if (err) {
            res.status(500).json({
                res: "failed",
                err
            });
        } else {
            res.json({
                resu: "ok",
                personas: personas_data
            });
        }
    });
});

app.get(`/personas/:id`, (req, res) => {
    const id = req.params.id; // id de personas/${id} 
    Persona.find({_id: id}).exec((err, persona_data) => {
        if (err) {
            res.status(500).json({
                resu: "failed",
                err
            });
        } else {
            res.json({
                resu: "ok",
                personas: persona_data
            });
        }
    });
});

app.post("/personas/add", (req, res) => {
    res.json({
        resu: "ok",
        personas: {}
    });
});

app.put("/personas/edit", (req, res) => {
    res.json({
        resu: "ok",
        personas: {}
    });
});

app.delete("/personas/delete", (req, res) => {
    res.json({
        resu: "ok",
        personas: {}
    });
});

//export 
module.exports = app;