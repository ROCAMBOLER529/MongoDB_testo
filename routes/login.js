const express = require("express");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const app = express();
const Persona = require("../models/persona.js");
const crearUsuario = require("../helpers/encriptador.js");
const generarJWT = require("../helpers/generador_JWT.js");
const verificarSignUp = require("../middleware/signUp.js");
const Usuario = require("../models/usuarios.js");



app.post(`/personas/login`, async (req, res) => {
  const { mail, password } = req.body;

  try {
    const data = await Usuario.findOne({ mail: mail });
    let contra = bcrypt.hashSync(data.password, salt);
    if (bcrypt.compareSync(password, contra)){
      const token = await generarJWT(data.id);
      res.json({
        resu: "ok",
        data, 
        token,
      });
    } else {
      res.status(400).json({
        resu: "mail o contraseña incorrectos. Si no tiene una cuenta, por favor loguearse",
        mail,
        password,
      });
    }
  } catch (err) {
    res.status(500).json({
      resu: "failed",
      err,
    })
  }



  /*
  Persona.findOne({ mail: mail }).exec(async (err, data) => {
    let contra = bcrypt.hashSync(data.password, salt);



    
    if (err) {
      res.status(500).json({
        resu: "failed",
        err,
      });
    } else if (bcrypt.compareSync(password, contra)) {
      const token = await generarJWT(data.id);
        res.json({
        resu: "ok",
        data,
        token
      });
    } else {
        res.status(400).json({
            resu: "mail o contraseña incorrectos. Si no tiene una cuenta, por favor loguearse",
            mail,
            password
        });
    }
  });

  */
});

app.put(`/personas/signup`, verificarSignUp, async (req, res) => {
    
  /*
    body = req.body;
    var salt = bcrypt.genSaltSync(10);
    const contra = bcrypt.hashSync(body.password, salt);

    let nuevaPersona = new Persona({
        dni: "",
        nombre: "",
        apellido: "",
        mail: body.mail,
        telefono: "",
        password: contra,
        rol: "contribuyente"
    });

    try {
        let personaDB = await nuevaPersona.save();
        res.json({
            resu: "ok",
            mail: body.mail,
            password: contra,
        });
    } catch (err) {
        res.status(500).json({
            resu: "failed",
            err,
        });
    }
    */
});

// ¡¡ESTUDIAR ASYNCRONISMO!!

module.exports = app;
