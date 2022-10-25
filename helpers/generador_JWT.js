// jwt = json web token

const jwt = require("jsonwebtoken");


// payload en este caso se le a
const generarToken = (id_usuario) => {
    const payload = {
        id_usuario
    }
    
    return new Promise((result, reject) => {
        jwt.sign(payload, process.env.CLAVE_SECRETA, {
            expiresIn: 60000
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                result(token);
            }
        });
    });
};



module.exports = generarToken;
// verificarToken
