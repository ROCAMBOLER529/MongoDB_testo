const jwt = require("jsonwebtoken");

const verificarRol = (req, res, next) => {
    body = req.body;
    
    if(body.rol !== "administrador"){
        res.status(403).json({
            ok: "false",
            mensaje: "¡uds no puede estar aqui!"
        })
    }    else {
        next();
    }

};

const verificarToken = (req, res, next) => {
    const token = req.header.token;
    const {persona} = jwt.verify(token, process.env.CLAVE_SECRETA);
    if (persona) {
        req.personas = persona;
        next();
    } else {
        res.status(401).json({
            resu: "Fallo de autenticacion",
            err
        })
        next();
    }    
};

module.exports = {verificarRol, verificarToken};