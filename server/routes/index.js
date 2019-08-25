const { Router } = require('express'),
  router = Router(),
  UsersController = require('../controllers/usuarios-controller'),
  EventsController = require('../controllers/eventos-controller');

router
  .get('/defaultUser', UsersController.defaultUser)
  .post('/login', UsersController.login)
  .get('/events/defaultEvent', EventsController.defaultEvent)
  .get('/events/all', EventsController.getAll)
  .post('/events/new', EventsController.newEvent)
  .post('/events/delete/:id', EventsController.deleteEvent)
  .post('/events/update/:id', EventsController.updateEvent)
  .post('/logout', UsersController.logout)

module.exports=router
