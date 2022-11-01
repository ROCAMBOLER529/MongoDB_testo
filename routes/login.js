const express = require("express");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const app = express();
const Persona = require("../models/persona.js");
const generarJWT = require("../helpers/generador_JWT.js");
const verificarSignUp = require("../middleware/signUp.js");
const Usuario = require("../models/usuarios.js");
const async = require("hbs/lib/async");
const verificarRol = require("../middleware/autenticacion.js").verificarRol;

app.post(`/personas/signup`, verificarSignUp, async (req, res) => {
  body = req.body;
  var salt = bcrypt.genSaltSync(10);
  const contra = bcrypt.hashSync(body.password, salt);

  let nuevoUsuario = new Usuario({
    mail: body.mail,
    password: contra,
    rol: body.rol,
    acceso_fechas: ["2022-11-1"]
  });

  try {
    let userDB = await nuevoUsuario.save();
    res.json({
      resu: "ok",
      mail: body.mail,
      contra
    });
  } catch (err) {
    res.status(500).json({
      resu: "failed",
      err
    });
  }
});

app.put(`/personas/login`, verificarSignUp, async (req, res) => {
  const { mail, password } = req.body;
  var salt = bcrypt.genSaltSync(10);
  let contra = bcrypt.hashSync(password, salt);

  try {
    const diaDeHoy = new Date();
    const current = diaDeHoy.getfullYear()+"-"+diaDeHoy.getMonth()+"-"+diaDeHoy.getDay();

    const data = await Usuario.updateOne({ mail: mail },
      {
        $set: {
          acceso_fechas: data.acceso_fechas.add(diaDeHoy)
        },
      });
    
    if (bcrypt.compareSync(data.password, contra)) {
      
      const token = await generarJWT(data._id);
      res.json({
        resu: "ok",
        data, 
        token,
      });
    } else {
      res.status(400).json({
        resu: "contraseña incorrecta",
        mail,
        password,
      });
    }
  } catch (err) {
    res.status(500).json({
      resu: "mail o contraseña incorrecta",
      err,
    });
  }
});

app.get("/login/resumen", verificarRol, async (req, res) => {
  try {
    
    const dataPersona = await Persona.find({});
    const dataUsuario = await Usuario.find({});
    console.log("1");
    
    const mails = dataUsuario.map((a) => a.mail);
    console.log("2");
    const detallesAccesoHoy = mails.map((a) => {
      filtrados = dataPersona.filter((b) => b.mail == a);
      return {
        users: filtrados.nombre,
        accesos_fechas: mails.acceso_fechas,
      }
    });
    console.log("3");
    

    const accesos = dataUsuario.map((a) => a.acceso_fechas);
    console.log("3.5");
    const totalAccesos = accesos.flat();
    console.log("4");
    const totalAccesosHoy = totalAccesos.length();
    console.log("5");

    res.json({
      totalAccesosHoy,
      accesos
    });

  } catch(err) {
    res.json({
      resu: "failed",
      err
    })
  }

});

// ¡¡ESTUDIAR ASYNCRONISMO!!

module.exports = app;
