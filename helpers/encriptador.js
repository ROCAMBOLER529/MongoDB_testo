const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const Persona = require("../models/persona.js"); 

const crearUsuario = (req) => {
    const { mail, password } = req;

    return new Persona({
        nombre: "",
        apellido: "",
        dni: "",
        rol: "Contribuyente",
        telefono: "",
        mail: mail,
        password: bcrypt.hashSync(password, salt)
    });
}

module.exports = crearUsuario;