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
    try 
    {
        const {persona} = jwt.verify(token, process.env.CLAVE_SECRETA);
    } catch(e) {
        res.status(401).json({
            resu: "Fallo de autenticacion",
            e
        })
        next();
    }

    if (persona) {
        req.get(token);
        next();
    }   
};

module.exports = {verificarRol, verificarToken};
