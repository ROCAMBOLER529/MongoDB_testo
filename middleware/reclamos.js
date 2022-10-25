const verificarResuelta = (req, res, next) => {
    let fecha = req.body.fecha;

    if (!fecha || fecha == "") {
        res.status(400).json({
            resu: "false",
            mensaje: "Se supone que uds vino para poner fecha resuelta a un reclamo. Este campo no puede estar vacio."
        });
    } else {
        next();
    }
}

module.exports = verificarResuelta;