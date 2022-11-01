const mongoose = require(`mongoose`); // se declara a mongoose
const reclamos_schema = new mongoose.Schema({
  fecha_creacion: Date,
  fecha_resuelta: String,
  categoria: String,
  domicilio: String,
});

if (!reclamos_schema.fecha_resuelta) reclamos_schema.fecha_resuelta = "No se resolvió";

const Reclamo = mongoose.model("reclamos", reclamos_schema);

module.exports = Reclamo;
