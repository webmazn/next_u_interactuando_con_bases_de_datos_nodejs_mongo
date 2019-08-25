const EventModel = require('../models/eventos-models'),
  EventsController = () => {}

EventsController.defaultEvent = (req, res, next) => {
  let event = new EventModel({
    eventoId: 1, // Math.floor(Math.random() * 50),
    userId: 1,
    titulo: 'Mi primer evento',
    fec_inicio: '2019-08-22',
    hor_inicio: '17:00:00',
    fec_fin: '2019-08-22',
    hor_fin: '17:30:00',
    dia_completo: '0'
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
  EventModel.find().exec(function (err, doc) {
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
    //console.log(data)
    res.json(data)
  })
}

EventsController.newEvent = (req, res, next) => {
  console.log('Grabaremos un nuevo evento')
  let userId = req.session.userID,
    titulo = req.body.title,
    fec_inicio = req.body.start,
    fec_fin = req.body.end == '' ? '1999-01-01' : req.body.end,
    hor_inicio = req.body.start_hour, //fec_inicio.length > 0 ? fec_inicio.substring(11,6) : '',
    hor_fin = fec_fin != '' ? req.body.end_hour : '',
    dia_completo = req.body.end == '' ? '1' : '0',
    total = 0;

  EventModel.findOne().sort('-eventoId').exec(function (err, doc) {
    let event = new EventModel({
      eventoId: (doc.eventoId + 1),
      userId: userId,
      titulo: titulo,
      fec_inicio: fec_inicio,
      hor_inicio: hor_inicio,
      fec_fin: fec_fin,
      hor_fin: hor_fin,
      dia_completo: dia_completo
    })
    console.log(event)
    let data = []
    event.save(function (error, doc) {
      if (error) {
        res.status(500)
        res.json(error)
      }
      data.push({
        'id': doc.eventoId,
        'msg': "Evento guardado"
      })
      console.log(data)
      res.json(data)
      //res.send("Evento guardado")
    })
  })

  /*EventModel.countDocuments({}, function (err, count) {
    total = count
  }).then(function () {

  }).catch(function (err) {
    console.log(err)
  })*/
}

EventsController.deleteEvent = (req, res, next) => {
  console.log('Eliminamos un evento')
  let eid = req.params.id
  EventModel.deleteOne({
    eventoId: eid
  }, function (error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Evento eliminado")
  })
}

EventsController.updateEvent = (req, res, next) => {
  console.log('Actualizamos un evento')
  let eid = req.params.id,
    fec_inicio = req.body.start,
    fec_fin = req.body.end

  EventModel.updateOne({
    eventoId: eid
  }, {
    fec_inicio: fec_inicio,
    fec_fin: fec_fin
  }, (error, doc) => {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Registro actualizado")
  })
}

module.exports = EventsController
