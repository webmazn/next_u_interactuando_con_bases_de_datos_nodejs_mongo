const express = require('express'),
      app = express(),
      port = (process.env.PORT || 3000),
      mongoose = require('mongoose'),
      routes = require('./routes');

app.use(express.static('client'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(routes)

app.listen(port, function() {
  console.log('Server is listeng on port: ' + port)
})
