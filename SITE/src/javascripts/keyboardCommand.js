//Keyboard support

$(document).keydown(function(e) {
  if($('body').is('.command')){
    if (lastEvent) return;

    switch(e.which) {
      case 37: // left
        console.log('left');
        left();
        lastEvent = e;
        break;

      case 38: // forward
        console.log('forward');
        start();
        lastEvent = e;
        break;

      case 39: // right
        console.log('right');
        right();
        lastEvent = e;
        break;

      case 40: // backward
        console.log('backward');
        back();
        lastEvent = e;
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});

$(document).keyup(function(e) {
  if($('body').is('.command')){
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
