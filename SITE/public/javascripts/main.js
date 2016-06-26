var lastEvent;
var controlServer = "http://192.168.1.240";

function go() {
  $.ajax({
    url: controlServer + "/start"
  })
  .done(function (msg) {
    console.log(msg);
  });
}

function back() {
  $.ajax({
    url: controlServer + "/back"
  })
  .done(function (msg) {
    console.log(msg);
  });
}

function stop() {
  $.ajax({
    url: controlServer + "/stop"
  })
  .done(function (msg) {
    console.log(msg);
  });
}

function left() {
  $.ajax({
    url: controlServer + "/left"
  })
  .done(function (msg) {
    console.log(msg);
  });
}

function right() {
  $.ajax({
    url: controlServer + "/left"
  })
  .done(function (msg) {
    console.log(msg);
  });
}

$(document).keydown(function(e) {
  if($('body').is('.manualCommand')){

    //EXIT: Pour éviter le spam si on reste appuyé sur la même touche
    if (lastEvent) return;

    switch(e.which) {
      case 37: // left
        console.log('left');
        left();
        lastEvent = e;
        break;

      case 38: // forward
        console.log('forward');
        back();
        lastEvent = e;
        break;

      case 39: // right
        console.log('right');
        right();
        lastEvent = e;
        break;

      case 40: // backward
        console.log('backward');
        go();
        lastEvent = e;
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});

$(document).keyup(function(e) {
  if($('body').is('.manualCommand')){

    //EXIT: Si on appuie sur d'autre touche, pas d'effet
    if (lastEvent && lastEvent.keyCode != e.keyCode) return;

    switch(e.which) {
      case 37: // left
        console.log('stop left');
        stop();
        lastEvent = null;
        break;

      case 38: // up
        console.log('stop up');
        stop();
        lastEvent = null;
        break;

      case 39: // right
        console.log('stop right');
        stop();
        lastEvent = null;
        break;

      case 40: // down
        console.log('stop down');
        stop();
        lastEvent = null;
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});
