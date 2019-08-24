const UsersModel = require('../models/usuarios-models'),
  session = require('express-session'),
  UserController = () => {}

UserController.defaultUser = (req, res, next) => {
  let user = new UsersModel({
    userId: 1,//Math.floor(Math.random() * 50),
    email: 'maycol_630@hotmail.com',
    clave: 'clave01',
    nombre: 'Maycol Zambrano Nuñez',
    fec_nacimiento: '1986-01-07'
  })
  user.save(function (error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Registro guardado")
  })
}

UserController.login = (req, res, next) => {
  let user = req.body.user,
    pass = req.body.pass
  console.log(`Usuario: ${user} & Password ${pass}`)

  UsersModel.findOne({
    email: user
  }).exec(function (err, doc) {
    if (err) {
      res.status(500)
      res.json(err)
    } else {
      console.log(doc)
      if(doc != null && pass == doc.clave){
        req.session.userID = doc.userId
        res.json('Validado')
      }else{
        res.json(err)
      }
    }
  })
}

module.exports = UserController
