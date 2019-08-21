const { Router } = require('express'),
  router = Router(),
  UsersController = require('../controllers/usuarios-controller'),
  EventsController = require('../controllers/eventos-controller');


router
  .get('/defaultUser', UsersController.defaultUser)
  .post('/login', UsersController.login)
//.get('/close', HomeController.setClose)



module.exports=router
