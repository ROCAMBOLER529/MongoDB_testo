const jwt = require("jsonwebtoken");

const verificarRol = (req, res, next) => {
  body = req.body;

  if (body.rol !== "administrador") {
    res.status(403).json({
      ok: "false",
      mensaje: "¡uds no puede estar aqui!",
    });
  } else {
    next();
  }
};

const verificarToken = (req, res, next) => {
  const token = req.get("token");
  try {
    const { persona } = jwt.verify(token, process.env.CLAVE_SECRETA);
    if (usuario) {
      req.userID = usuario.id;
      next();
    } else {
      res.status(401).json({
        resu: "false",
        message: "Fallo de autenticacion",
      });
      next();
    }
  } catch (e) {
    res.status(401).json({
      resu: "false",
      e,
    });
    next();
  }
};

const verificarReclamo = (req, res, next) => {
    let body = req.body;

    
    if (body.categoria != "Alumbrado" && body.categoria != "Arbolado" && body.categoria != "Limpieza" && body.categoria != "Pluvial") {
        res.status(400).json({
            resu: "false",
            mensaje: "Categoria inexistente"
        });
    } else if (!body.fecha_creacion){
        res.status(400).json({
            resu: "false",
            mensaje: "La fecha de creacion no puede estar vacia"
        });
    } else if ((body.fecha_creacion > body.fecha_resuelta) && body.fecha_resuelta){
        res.status(400).json({
            resu: "false",
            mensaje: "La fecha de creacion no puede ser posterior a la fecha resuelta"
        });
    } else if (!body.domicilio) {
        res.status(400).json({
            resu: "false",
            mensaje: "El domicilio no es valido"
        });
    } else {
        next();
    }
}



module.exports = { verificarRol, verificarToken, verificarReclamo };
