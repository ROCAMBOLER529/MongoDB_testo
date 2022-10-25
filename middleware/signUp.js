const verificarSignUp = (req, res, next) => {
    let { mail, password } = req.body;

    if (!mail) {
        res.status(400).json({
            resu: "false",
            mensaje: "El mail no puede estar vacio"
        });
    } else if (!password) {
        res.status(400).json({
            resu: "false",
            mensaje: "La contraseña no puede estar vacia"
        });
    } else {
        next();
    }
}

module.exports = verificarSignUp;