$(document).ready(function() {
   var $add_event = $('#add-event');
   $add_event.submit(function () {
      $.post($(this).attr('action'), $(this).serialize(), function(data, status, xhr){
            console.log(status)
            if (status == "success") {
                alert("Event added successfully");
            }
      },'json')
      .error(function() {
        alert("Event overlaps with existing event")
      })
      return false;
   });
});

// global variable that can be accessed in HTML
var events = [];

async function fetchEvents() {
    events = await fetch('/events')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        return responseJson.data
    })

    console.log(events);
    showEvents();
}

function showEvents() {
    console.log(events);
    $("#events").css("visibility", "visible");

    var wrapper = document.getElementById("events");
    var eventsHTML = '';
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var date = new Date(event.date);
        mlist = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
        var month_name = mlist[date.getMonth()];
        dlist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var day_name = dlist[date.getDay()];
        eventsHTML += '<div class="row row-striped"><div class="col-2 text-right"><h1 class="display-4">' + 
            '<span class="badge badge-secondary">' + date.getDate() + '</span></h1><h2>' + month_name + '</h2></div>' +
            '<div class="col-10"><h3 class="text-uppercase"><strong>' + event.description + '</strong></h3>' +
            '<ul class="list-inline"><li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i> ' +
            day_name + '</li><li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> ' +
            event.start_time + ' - ' + event.end_time + '</li></ul></div></div>';
    }
    wrapper.innerHTML = eventsHTML;
}