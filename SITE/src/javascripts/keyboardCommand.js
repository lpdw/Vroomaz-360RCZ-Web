//Keyboard support

$(document).keydown(function(e) {
  if($('body').is('.command')){
    if (lastEvent) return;
    if(lastController && lastController != "kb") reset();

    switch(e.which) {
      case 32: // stop
        console.log('stop');
        stop();
        lastEvent = e;
        lastController = "kb";
        break;

      case 37: // left
        console.log('left');
        left();
        lastEvent = e;
        lastController = "kb";
        break;

      case 38: // forward
        console.log('forward');
        start();
        lastEvent = e;
        lastController = "kb";
        break;

      case 39: // right
        console.log('right');
        right();
        lastEvent = e;
        lastController = "kb";
        break;

      case 40: // backward
        console.log('backward');
        back();
        lastEvent = e;
        lastController = "kb";
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
        lastController = "kb";
        break;

      case 38: // up
        console.log('stop up');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      case 39: // right
        console.log('stop right');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      case 40: // down
        console.log('stop down');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});
