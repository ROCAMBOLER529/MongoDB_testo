const express = require("express");
const app = express();
const Reclamo = require("../models/reclamos.js");
const {verificarRol} = require("../middleware/autenticacion.js");

app.get("/reclamos/all", verificarRol, (req, res) => {
    res.status(200).json({
        resu: "ok",
        mensaje: "perfecto!"
    });
    /*Reclamo.find().exec((err, reclamos_data) => {
        if (err) {
            res.status(500).json({
                res: "failed",
                err
            });
        } else {
            res.status(200).json({
                resu: "ok",
                mensaje: "perfecto!"
            });
        }
    });*/
});

module.exports = app;