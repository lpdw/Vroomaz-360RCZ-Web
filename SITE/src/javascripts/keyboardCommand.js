//Keyboard support

$(document).keydown(function(e) {
  if($('body').is('.command')){
    if ((lastEvent && $('#switch3').is(':checked'))
        | ($('#switch2').is(':checked') | $('#switch1').is(':checked')) && e.keyCode != 32 && e.keyCode != 38
        | (lastEvent && lastEvent.keyCode == e.keyCode)) return;

    switch(e.which) {
      case 32: // stop
        console.log('stop key pressed');
        stop();
        lastEvent = e;
        break;

      case 37: // left
        console.log('left key pressed');
        left(e);
        break;

      case 38: // forward
        console.log('forward key pressed');
        start(e);
        break;

      case 39: // right
        console.log('right key pressed');
        right(e);
        break;

      case 40: // backward
        console.log('backward key pressed');
        back(e);
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});

$(document).keyup(function(e) {
  if($('body').is('.command')){
    if (lastEvent && lastEvent.keyCode != e.keyCode) return;
    if($('#switch1').is(':checked') | $('#switch2').is(':checked')) return;
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
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});
