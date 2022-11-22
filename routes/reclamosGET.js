const express = require("express");
const app = express();
const Reclamo = require("../models/reclamos.js");
const {
    verificarRol,
    verificarToken,
    verificarReclamo,
  } = require("../middleware/autenticacion.js");

app.get(`/reclamos/prom`, verificarRol, async (req, res) => {
    try {
        const data = await Reclamo.find({});
        const categ = ["Alumbrado", "Arbolado", "Limpieza", "Pluvial"];

        const promedios = categ.map(c => {
            const filtrados = data.filter(f => f.categoria == c);
            const resueltos = filtrados.filter(f => f.fecha_resuelta != "");

            const diferencia = resueltos.map(a => {
                const comienzo = a.fecha_creacion.getTime();
                const final = new Date(a.fecha_resuelta).getTime();
                return (final - comienzo) / (1000 * 3600 * 24);
            });

            const cont = diferencia.reduce((acu, a) => acu + a);
            
            /*
            - Obtener numero de dia inicial
            - Obtener numero de dia final
            - Restar individualmente el final con el inicial
            - Acumular el resultado
            - Dividir el resultado total por la cantidad de reclamos
            */
            
            console.log(diferencia);        
            return {
                cat: c,
                prom_dias_resolucion: cont / diferencia.length
            };
        });
        res.json({
            resu: "ok",
            promedios
        });
    } catch (err) {
        res.json({
            resu: "failed",
            err
        });
    }
});

module.exports = app;