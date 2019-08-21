const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventSchema = new Schema({
  eventoId: { type: Number, required: true, unique: true},
  userId: { type: Number, required: true},
  titulo: { type: String, required: true },
  fec_inicio: { type: Date, required: true },
  hor_inicio: { type: String, required: false },
  fec_fin: { type: Date, required: false },
  hor_fin: { type: String, required: false },
  dia_completo: { type: String, required: true, enum: ['0', '1'] }
})

let EventModel = mongoose.model('nu_eventos', EventSchema)

module.exports = EventModel
