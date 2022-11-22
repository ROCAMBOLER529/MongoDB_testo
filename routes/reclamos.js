const express = require("express");
const app = express();
const Reclamo = require("../models/reclamos.js");
const {
  verificarRol,
  verificarToken,
  verificarReclamo,
} = require("../middleware/autenticacion.js");
const verificarResuelta = require("../middleware/reclamos.js");

app.get("/reclamos/all", verificarRol, (req, res) => {
  Reclamo.find().exec((err, reclamos_data) => {
    if (err) {
      res.status(500).json({
        res: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        reclmao: reclamos_data,
      });
    }
  });
});

app.get("/reclamos/pendientes/all", verificarRol, async (req, res) => {
  try {
    const data = await Reclamo.find({});
    const pendiente = data.filter((a) => a.fecha_resuelta == "");
    res.json({
      resu: "ok",
      pendiente,
    });
  } catch (err) {
    res.status(500).json({
      res: "failed",
      err,
    });
  }
});

app.get("/reclamos/parcial", verificarRol, async (req, res) => {
  try {
    const data = await Reclamo.find({});
    const tipos = ["Arbolado", "Alumbrado", "Pluvial", "Limpieza"];
    const cantsPorTipos = tipos.map((t) => {
      const filtrados = data.filter((v) => v.categoria == t);
      return {
        categoria: t,
        cant: filtrados.length,
        votantes: filtrados.map((v) => v.nombre),
      };
    });
    console.log("1");
    res.json({
      
      resu: "ok",
      cantsPorTipos,
    });
  } catch (err) {
    res.status(500).json({
      resu: "failed",
      err,
    });
  }
});

app.get("/reclamos/todos/:categoria", verificarRol, async (req, res) => {
  let categoria = req.params.categoria;

  try {
    const data = await Reclamo.find({});
    const filtrados = data.filter((a) => a.categoria == categoria);
    console.log("3");s
    res.json({
      resu: "ok",
      filtrados,
    });
    
  } catch (err) {
    res.status(500).json({
      resu: "failed",
      err,
    });
  }
});

app.get("/reclamos/pendientes/:categoria", verificarRol, async (req, res) => {
  let categoria = req.params.categoria;

  try {
    const data = await Reclamo.find({});
    const filtrados = data.filter((a) => (a.categoria == categoria) && (a.fecha_resuelta == ""));
    res.json({
      resu: "Ok",
      filtrados
    });
    console.log("1");
    
  } catch(err) {
    res.status(500).json({
      resu: "failed",
      err,
    })
  }

});

app.get("/reclamos/piso/:domicilio", async (req, res) => {
  let domicilio = req.params.domicilio;

  try {
    const data = await Reclamo.find({});
    const filtrados = data.filter((a) => (a.domicilio == domicilio));
    res.json({
      resu: "ok",
      filtrados
    });
    
  } catch(err) {
    res.status(500).json({
      resu: "failed",
      err,
    })
  }
});

app.get("/reclamos/pendiente/masViejo", async (req, res) => {

  try {
    const data = await Reclamo.find({});
    const filtrados = (data.filter((a) => a.fecha_resuelta == ""));
    const masViejo = filtrados.sort((a, b) => {
      new Date(a.fecha_creacion) - new Date(b.fecha_creacion);
    });
    res.json({
      resu: "ok",
      masViejo
    });
    
  } catch(err) {
    res.status(500).json({
      resu: "failed",
      err,
    })
  }

});

app.get("/reclamos/piso/pendiente/:domicilio", async (req, res) => {
    let domicilio = req.params.domicilio;
  
    try {
      const data = await Reclamo.find({});
      const filtrados = data.filter((a) => (a.domicilio == domicilio) && (a.fecha_resuelta == ""));
      res.json({
        resu: "ok",
        filtrados
      });
      
    } catch(err) {
      res.status(500).json({
        resu: "failed",
        err,
      })
    }
});


app.post("/reclamos/add", verificarReclamo, async (req, res) => {
  let body = req.body;

  let reclamo = new Reclamo({
    fecha_creacion: body.fecha_creacion,
    fecha_resuelta: body.fecha_resuelta,
    categoria: body.categoria,
    domicilio: body.domicilio,
  });

  

  try {
    console.log("1");
    let reclamoDB = await reclamo.save();
    console.log("2");
    res.json({
      ok: true,
      reclamo,
    });
  } catch (err) {
    console.log("3");
    res.status(500).json({
      ok: false,
      err
    });
  }
});

app.put("/reclamos/edit/:id", verificarRol, async (req, res) => {
  let body = req.body;

  Reclamo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        fecha_creacion: body.fecha_creacion,
        fecha_resuelta: body.fecha_resuelta,
        categoria: body.categoria,
        domicilio: body.domicilio,
      },
    }
  ).exec((err, reclamos_data) => {
    if (err) {
      res.status(400).json({
        resu: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        reclamos: reclamos_data,
      });
    }
  });
});

app.put("/reclamos/resueltos/:id", verificarRol, verificarResuelta, (req, res) => {
    let fecha = req.body.fecha;
  
    Reclamo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          fecha_resuelta: fecha,
        },
      }
    ).exec((err, reclamos_data) => {
      if (err) {
        res.status(500).json({
          resu: "failed",
          err,
        });
        
      } else {
        res.json({
          resu: "ok",
          reclamos: reclamos_data,
        });
      }
    });
});

app.delete("/reclamos/delete/:id", verificarRol, (req, res) => {
  let id = req.params.id;

  Reclamo.deleteOne({ _id: id }).exec((err, reclamos_data) => {
    if (err) {
      res.status(500).json({
        resu: "fallo",
        err,
      });
    }
    res.json({
      resu: "ok",
      reclamos: reclamos_data,
    });
  });
});



//export
module.exports = app;
