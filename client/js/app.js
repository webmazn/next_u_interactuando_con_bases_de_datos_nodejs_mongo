class EventManager {
  constructor() {
    this.urlBase = "/events"
    //this.obtenerDataInicial()
    this.inicializarFormulario()
    this.guardarEvento()
    this.cerrarSesion()
  }

  obtenerDataInicial() {
    let url = this.urlBase + "/all"
    $.get(url, (response) => {
      this.inicializarCalendario(response)
    })
  }

  eliminarEvento(evento) {
    let eventId = evento.id
    $.post(this.urlBase + '/delete/' + eventId, {
      id: eventId
    }, (response) => {
      alert(response)
    })
  }

  cerrarSesion() {
    $('#logout').on('click', (ev) => {
      ev.preventDefault()
      $.post('/logout/', (response) => {
        if (response == "cerrar") {
          window.location.href = "http://localhost:3000/"
        }
      })
    })
  }

  guardarEvento() {
    $('.addButton').on('click', (ev) => {
      ev.preventDefault()
      let nombre = $('#titulo').val(),
        start = $('#start_date').val(),
        title = $('#titulo').val(),
        end = '',
        start_hour = '',
        end_hour = '';

      if (!$('#allDay').is(':checked')) {
        end = $('#end_date').val()
        start_hour = $('#start_hour').val()
        end_hour = $('#end_hour').val()
        start = start // + 'T' + start_hour
        end = end // + 'T' + end_hour
      }
      let url = this.urlBase + "/new"
      if (title != "" && start != "") {
        let ev = {
          id: '',
          title: title,
          start: start,
          end: end,
          start_hour: start_hour,
          end_hour: end_hour
        }

        $.ajax({
          url: url,
          dataType: "json",
          data: ev,
          type: 'POST',
          success: (data) =>{
            alert(data[0].msg)
            ev['id']=data[0].id;
            $('.calendario').fullCalendar('renderEvent', ev)
          },
          error: function(){
            alert("error en la comunicación con el servidor");
          }
        })
      } else {
        alert("Complete los campos obligatorios para el evento")
      }
    })
  }

  inicializarFormulario() {
    $('#start_date, #titulo, #end_date').val('');
    $('#start_date, #end_date').datepicker({
      dateFormat: "yy-mm-dd"
    });
    $('.timepicker').timepicker({
      timeFormat: 'HH:mm:ss',
      interval: 30,
      minTime: '5',
      maxTime: '23:59:59',
      defaultTime: '',
      startTime: '5:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
    });
    $('#allDay').on('change', function () {
      if (this.checked) {
        $('.timepicker, #end_date').attr("disabled", "disabled")
      } else {
        $('.timepicker, #end_date').removeAttr("disabled")
      }
    })
  }

  inicializarCalendario(eventos) {
    $('.calendario').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,basicDay'
      },
      defaultDate: new Date(), //'2016-11-01',
      navLinks: true,
      editable: true,
      eventLimit: true,
      droppable: true,
      dragRevertDuration: 0,
      timeFormat: 'H:mm',
      eventDrop: (event) => {
        this.actualizarEvento(event)
      },
      events: eventos,
      eventDragStart: (event, jsEvent) => {
        $('.delete').find('img').attr('src', "img/trash-open.png");
        $('.delete').css('background-color', '#a70f19')
      },
      eventDragStop: (event, jsEvent) => {
        var trashEl = $('.delete');
        var ofs = trashEl.offset();
        var x1 = ofs.left;
        var x2 = ofs.left + trashEl.outerWidth(true);
        var y1 = ofs.top;
        var y2 = ofs.top + trashEl.outerHeight(true);
        if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
          jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
          this.eliminarEvento(event)
          $('.calendario').fullCalendar('removeEvents', event.id);
        }
      }
    })
  }

  actualizarEvento(evento) {
    let eventId = evento.id,
      start_date = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
      end_date = moment(evento.end==null?evento.start:evento.end).format('YYYY-MM-DD HH:mm:ss'),
      start = start_date.substr(0,10),
      end = end_date.substr(0,10),
      url = this.urlBase + "/update/"+ eventId,
      ev = {start: start, end: end}
    $.post(url, ev, (response) => {
      alert(response)
    })
  }
}

const Manager = new EventManager()
Manager.obtenerDataInicial();
