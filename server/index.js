const express = require('express'),
      session = require('express-session'),
      app = express(),
      port = (process.env.PORT || 3000),
      mongoose = require('mongoose'),
      routes = require('./routes');

mongoose.connect('mongodb://localhost/nextu_final_db')
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err))

app.use(express.static('client'))
  .use(express.json())
  .use(express.urlencoded({ extended: true}))
  .use(session({
    secret: 'secret@NU2019',
    saveUninitialized: true,
    resave: true
  }))
  .use(routes)

app.listen(port, function() {
  console.log('Server is listeng on port: ' + port)
})
