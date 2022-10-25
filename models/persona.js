const mongoose = require(`mongoose`); // se declara a mongoose
const persona_schema = new mongoose.Schema({
    nombre: String, // forma corta
    apellido: {type: String}, // forma larga
    dni: String,
    mail: String,
    telefono: String,
    password: String,
    rol: String
    /* 
    isActive: Boolean,
    cantHijos: Number,
    birth: Date,
    _carID: mongoose.Schema.Types.ObjectId --> clave foránea 
    */
});

// se junta el nombre y apellido para hacer el nombre_completo
persona_schema.virtual("nombre_completo").get(() => {
    return `${this.nombre} ${this.apellido}`; 
});

const Persona = mongoose.model("personas", persona_schema);

module.exports = Persona;
