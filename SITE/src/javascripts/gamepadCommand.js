//Gamepad support

var hasGP = false;
var repGP;
var lastEventGP;

function canGame() {
  return "getGamepads" in navigator;
}

function reportOnGamepad() {
  var gp = navigator.getGamepads()[0];
  var html = "";
  var xinput = {
    0: "A",
    1: "B",
    2: "X",
    3: "Y",
    4: "LB",
    5: "RB",
    6: "LT",
    7: "RT",
    8: "BACK",
    9: "START",
    10: "LSTICK",
    11: "RSTICK",
    12: "UP",
    13: "DOWN",
    14: "LEFT",
    15: "RIGHT"
  };

  for(var i=0;i<gp.buttons.length;i++) {

    html+= "Button "+ xinput[i] +" (" + i +") :";

    if(gp.buttons[i].pressed) {

      html+= " pressed";

      if (lastEventGP) {
        html+= "<br/>";
        continue;
      }

      switch(xinput[i]) {
        case "RIGHT": // left
          console.log('left');
          left();
          lastEventGP = i;
          break;

        case "UP": // forward
          console.log('forward');
          start();
          lastEventGP = i;
          break;

        case "LEFT": // right
          console.log('right');
          right();
          lastEventGP = i;
          break;

        case "DOWN": // backward
          console.log('backward');
          back();
          lastEventGP = i;
          break;

        default:
          break;
      }

    } else { //if button

      switch(xinput[i]) {
        case "LEFT": // left
          if (lastEventGP == i) {
            console.log('stop left');
            stop();
            lastEventGP = null;
          }
          break;

        case "UP": // up
          if (lastEventGP == i) {
            console.log('stop up');
            stop();
            lastEventGP = null;
          }
          break;

        case "RIGHT": // right
          if (lastEventGP == i) {
            console.log('stop right');
            stop();
            lastEventGP = null;
          }
          break;

        case "DOWN": // down
          if (lastEventGP == i) {
            console.log('stop down');
            stop();
            lastEventGP = null;
          }
          break;

        default:
          break;
      }

    }

    html+= "<br/>";
  }

  // Pour les axes analogiques
  for(var i=0;i<gp.axes.length; i+=2) {
    html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
  }

  $("#gamepadDisplay").html(html);
  //console.log(html);
}

$(document).ready(function() {

  if(canGame()) {

    var gamepad_state = "Not connected";

   $("#state").text(gamepad_state);
    console.log(gamepad_state);

    $(window).on("gamepadconnected", function() {
      hasGP = true;
      $("#state").html("Gamepad connected!");
      console.log("connection event");
      repGP = window.setInterval(reportOnGamepad,100);
    });

    $(window).on("gamepaddisconnected", function() {
      console.log("disconnection event");
      $("#state").text(gamepad_state);
      window.clearInterval(repGP);
    });

    //setup an interval for Chrome
    // var checkGP = window.setInterval(function() {
    //     console.log('checkGP');
    //     if(navigator.getGamepads()[0]) {
    //         if(!hasGP) $(window).trigger("gamepadconnected");
    //         window.clearInterval(checkGP);
    //     }
    // }, 500);
  }

});
