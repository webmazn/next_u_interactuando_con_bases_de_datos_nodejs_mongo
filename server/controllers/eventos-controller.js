const EventModel = require('../models/eventos-models'),
  EventsController = () => {}

EventsController.defaultEvent = (req, res, next) => {
  let event = new EventModel({
    eventoId : Math.floor(Math.random() * 50),
    userId : 7,
    titulo : 'Mi primer evento',
    fec_inicio : '2019-08-22',
    hor_inicio : '17:00',
    fec_fin : '2019-08-22',
    hor_fin : '17:30',
    dia_completo : '0'
  })
  event.save(function (error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Registro guardado")
  })
}

EventsController.getAll = (req, res, next) => {
  console.log('Traeremos todos los eventos')
  EventModel.find().exec(function(err, doc){
      if (err) {
          res.status(500)
          res.json(err)
      }
      //console.log(doc)
      let data = []
      doc.forEach(event => {
        data.push({
          'id': String(event.eventoId),
          'title': event.titulo,
          'start': event.fec_inicio.toISOString().slice(0, 10),
          'end': event.fec_fin.toISOString().slice(0, 10)
        })
      })
      console.log(data)
      res.json(data)
  })
}

EventsController.newEvent = (req, res, next) => {
  console.log('Grabaremos un nuevo evento')
  let userId = req.session.userID,
    titulo = req.body.title,
    fec_inicio = req.body.start,
    fec_fin = req.body.end,
    hor_inicio = req.body.start_hour,//fec_inicio.length > 0 ? fec_inicio.substring(11,6) : '',
    hor_fin = fec_fin != '' ? req.body.end_hour : '',
    dia_completo = fec_fin != '' ? '0' : '1';

  let event = new EventModel({
    eventoId : Math.floor(Math.random() * 50),
    userId : userId,
    titulo : titulo,
    fec_inicio : fec_inicio,
    hor_inicio : hor_inicio,
    fec_fin : fec_fin,
    hor_fin : hor_fin,
    dia_completo : dia_completo
  })
  //console.log(event)
  event.save(function (error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Evento guardado")
  })
}

module.exports = EventsController