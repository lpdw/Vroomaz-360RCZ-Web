//Keyboard support

$(document).keydown(function(e) {
  if($('body').is('.command')){
    if (lastEvent) return;
    if(lastController && lastController != "kb") reset();

    switch(e.which) {
      case 32: // stop
        console.log('stop key pressed');
        stop();
        lastController = "kb";
        break;

      case 37: // left
        console.log('left key pressed');
        left(e);
        lastController = "kb";
        break;

      case 38: // forward
        console.log('forward key pressed');
        start(e);
        lastController = "kb";
        break;

      case 39: // right
        console.log('right key pressed');
        right(e);
        lastController = "kb";
        break;

      case 40: // backward
        console.log('backward key pressed');
        back(e);
        //lastEvent = e;
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
        if(!lastEvent){
          console.log("stop flag rised");
          stopFlag = true;
          break;
        }
        console.log('left key released');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      case 38: // up
        if(!lastEvent){
          console.log("stop flag rised");
          stopFlag = true;
          break;
        }
        console.log('forward key released');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      case 39: // right
        if(!lastEvent){
          console.log("stop flag rised");
          stopFlag = true;
          break;
        }
        console.log('right key released');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      case 40: // down
        if(!lastEvent){
          console.log("stop flag rised");
          stopFlag = true;
          break;
        }
        console.log('backward key released');
        stop();
        lastEvent = null;
        lastController = "kb";
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});
