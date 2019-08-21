const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true},
  email: { type: String, required: true },
  clave: { type: String, required: true },
  nombre: { type: String, required: true },
  fec_nacimiento: { type: Date, required: true }
})

let UserModel = mongoose.model('nu_usuarios', UserSchema)

module.exports = UserModel
