// jwt = json web token

const jwt = require("jsonwebtoken");


// payload en este caso se le a
const generarToken = (id_usuario) => {
    return new Promise((resolve, reject) => {
        const payload = { id: id_usuario };

        jwt.sign(payload, process.env.CLAVE_SECRETA, {expiresIn: process.env.TIEMPO_DE_CADUCIDAD}, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        }); 
    });
};

module.exports = generarToken;
// verificarToken
