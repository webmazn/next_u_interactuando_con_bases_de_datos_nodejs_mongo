const { Router } = require('express'),
    router = Router();

router
.get('/ruta', (req, res) => {
  res.send('Hola NODE');
})     //LoginController.getLogin
//.get('/close', HomeController.setClose)

module.exports=router
