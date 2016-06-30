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
        left(e);
        //lastEvent = e;
        lastController = "kb";
        break;

      case 38: // forward
        console.log('forward');
        start(e);
        //lastEvent = e;
        lastController = "kb";
        break;

      case 39: // right
        console.log('right');
        right(e);
        //lastEvent = e;
        lastController = "kb";
        break;

      case 40: // backward
        console.log('backward');
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
  var inter = setInterval(function () {
    if($('body').is('.command')){
      if (lastEvent && lastEvent.keyCode != e.keyCode) return;
      switch(e.which) {
        case 37: // left
          if(!lastEvent){
            stopFlag = true;
            break;
          }
          console.log('stop left');
          stop();
          lastEvent = null;
          lastController = "kb";
          clearInterval(inter);
          inter = 0;
          break;

        case 38: // up
          if(!lastEvent){
            stopFlag = true;
            break;
          }
          console.log('stop up');
          stop();
          lastEvent = null;
          lastController = "kb";
          clearInterval(inter);
          inter = 0;
          break;

        case 39: // right
          if(!lastEvent){
            stopFlag = true;
            break;
          }
          console.log('stop right');
          stop();
          lastEvent = null;
          lastController = "kb";
          clearInterval(inter);
          inter = 0;
          break;

        case 40: // down
          if(!lastEvent){
            stopFlag = true;
            break;
          }
          console.log('stop down');
          stop();
          lastEvent = null;
          lastController = "kb";
          clearInterval(inter);
          inter = 0;
          break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    }
  }, 0);
});
