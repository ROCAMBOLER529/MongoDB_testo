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

app.get("/reclamos/pendientes/all", verificarRol, (req, res) => {
  Reclamo.find({ fecha_resuelto: "" }).exec((err, reclamos_data) => {
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

app.get("/reclamos/:categoria", verificarRol, (req, res) => {
  let categoria = req.params.categoria;

  Reclamo.find({ categoria: categoria }).exec((err, reclamos_data) => {
    if (err) {
      res.status(500).json({
        resu: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        reclamo: reclamos_data,
      });
    }
  });
});

app.get("/reclamos/pendientes/:categoria", verificarRol, (req, res) => {
  let categoria = req.params.categoria;

  Reclamo.find({ categoria: categoria, fecha_resuelta: "" }).exec(
    (err, reclamos_data) => {
      if (err) {
        res.status(500).json({
          resu: "failed",
          err,
        });
      } else {
        res.json({
          resu: "ok",
          reclamo: reclamos_data,
        });
      }
    }
  );
});

app.get("/reclamos/piso/:domicilio", (req, res) => {
  let domicilio = req.params.domicilio;

  Reclamo.find({ domicilio: domicilio }).exec((err, reclamos_data) => {
    if (err) {
      res.status(500).json({
        resu: "failed",
        err,
      });
    } else {
      res.json({
        resu: "ok",
        reclamo: reclamos_data,
      });
    }
  });
});

app.get("/reclamos/piso/pendiente/:domicilio", (req, res) => {
    let domicilio = req.params.domicilio;
  
    Reclamo.find({ domicilio: domicilio, fecha_resuelta: "" }).exec((err, reclamos_data) => {
      if (err) {
        res.status(500).json({
          resu: "failed",
          err,
        });
      } else {
        res.json({
          resu: "ok",
          reclamo: reclamos_data,
        });
      }
    });
  });

app.post("/reclamos/add", verificarReclamo, async (req, res) => {
  let body = req.body;

  let reclamo = new Reclamo({
    fecha_creacion: body.fecha_creacion,
    fecha_resuelta: body.fecha_resuelta,
    categoria: body.categoria,
    domicilio: body.domicilio,
  });

  console.log(reclamo);

  res.json({
    ok: true,
    reclamo: reclamo,
  });

  try {
    let reclamoDB = await reclamo.save();
  } catch (e) {
    res.status(400).json({
      ok: false,
      err,
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

module.exports = app;
