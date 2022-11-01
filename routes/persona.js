const express = require("express");
const app = express();
const Persona = require("../models/persona.js"); // importa los modelos de persona.js
const {verificarRol, verificarToken } = require("../middleware/autenticacion.js");

app.get("/personas/all", verificarRol, (req, res) => {
  Persona.find().exec((err, personas_data) => {
    if (err) {
      res.status(500).json({
        res: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        personas: personas_data,
      });
    }
  });
});

app.get("/personas/:nombre", verificarRol, (req, res) => {
  // id de personas/${id}
  Persona.find({ nombre: req.params.nombre }).exec((err, data) => {
    if (err) {
      res.status(500).json({
        resu: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        personas: data,
      });
    }
  });
});

app.post("/personas/add", verificarRol, async (req, res) => {
  let body = req.body;
  console.log(body);

  let persona = new Persona({
    nombre: body.nombre,
    apellido: body.apellido,
    password: body.password,
    dni: body.dni,
    mail: body.mail,
    telefono: body.telefono,
    rol: body.rol
  });

  console.log(persona);

  res.json({
    ok: true,
    persona: persona,
  });

  try {
    let personaDB = await persona.save();
  } catch (e) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
});

app.put("/personas/edit/:id", verificarRol, async (req, res) => {
  let body = req.body;
  
  Persona.updateOne(
    { _id: req.params.id },
    {
      $set: {
        nombre: body.nombre,
        apellido: body.apellido,
        dni: body.dni,
        mail: body.mail,
        telefono: body.telefono,
        rol: body.rol,
        password: body.password
      },
    }
  ).exec((err, persona_data) => {
    if (err) {
      res.status(500).json({
        resu: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        persona: persona_data,
      });
    }
  });
});

app.delete("/personas/delete/:id", verificarRol, (req, res) => {
  let id = req.params.id;

  Persona.deleteOne({ _id: id }).exec((err, persona_data) => {
    if (err) {
      res.status(500).json({
        resu: "fallo",
        err,
      });
    }
    res.json({
      resu: "ok",
      persona: persona_data,
    });
  });
});

module.exports = app;

/* 

const express = require("express");
const app = express();
const Persona = require("../models/persona");

app.get("/persona/all", (req, res) => {
  Persona.find().exec((error, data) => {
    if (error) {
      res.status(500).json({
        resul: "fallo",
        error,
      });
    }
    res.json({
      resul: "ok",
      personas: data,
    });
  });
});

app.get("/persona/:id", (req, res) => {
  Persona.find({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      res.status(500).json({
        resul: "fallo",
        error,
      });
    }
    res.json({
      resul: "ok",
      persona: data,
    });
  });
});

app.get("/registro/persona", (req, res) => {
  res.render("registroPersona.hbs");
});

app.post("/persona", async (req, res) => {
  let body = req.body;
  console.log(body)

	let persona = new Persona({
		nombre: body.nombre,
		apellido: body.apellido,
		DNI: body.DNI,
		email: body.email,
    telefono: body.telefono
	})
 
  console.log(persona)

  res.json({
      ok: true,
      persona: persona
    });

		try{
      let personaDB = await persona.save();
    } catch(err) {
			// Envia codigo de error 400
			res.status(400).json({
				ok: false,
				err
			});
		} 
	});

app.put("/persona/edit/:id", (req, res) => {
  Persona.updateOne(
    { _id: req.params.id },
    {
      $set: { nombre: "Javier" },
    }
  ).exec((error, data) => {
    if (error) {
      res.status(500).json({
        resul: "fallo",
        error,
      });
    }
    res.json({
      resul: "ok",
      persona: data,
    });
  });
});

app.delete("/persona/delete/:id", (req, res) => {
  Persona.remove({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      res.status(500).json({
        resul: "fallo",
        error,
      });
    }
    res.json({
      resul: "ok",
      persona: data,
    });
  });
});



*/
