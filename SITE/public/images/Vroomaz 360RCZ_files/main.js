//Ajax calls

var lastEvent; //var used for key detection

var controlServer = "http://localhost:3001";

//Moving forward
function start() {
  $.ajax({
    url: controlServer + "/start",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    $("#forward-button").addClass("activated");
    $("#stop-button").removeClass("activated");
  });
}


//Moving backward
function back() {
  $.ajax({
    url: controlServer + "/back",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    $("#backward-button").addClass("activated");
    $("#stop-button").removeClass("activated");
  });
}


//Stop all
function stop(callback) {
  $.ajax({
    url: controlServer + "/stop",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    $("#stop-button").addClass("activated");
    $("#left-button").removeClass("activated");
    $("#right-button").removeClass("activated");
    $("#backward-button").removeClass("activated");
    $("#forward-button").removeClass("activated");
    $("#avg").removeClass("turn-left");
    $("#avd").removeClass("turn-left");
    $("#avg").removeClass("turn-right");
    $("#avd").removeClass("turn-right");
    if(callback) callback();
  });
}


//Turn left
function left() {
  $.ajax({
    url: controlServer + "/left",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    $("#avg").addClass("turn-left");
    $("#avd").addClass("turn-left");
    $("#left-button").addClass("activated");
    $("#stop-button").removeClass("activated");
  });
}


//Turn right
function right() {
  $.ajax({
    url: controlServer + "/right",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    $("#avg").addClass("turn-right");
    $("#avd").addClass("turn-right");
    $("#right-button").addClass("activated");
    $("#stop-button").removeClass("activated");
  });
}

//Html buttons support
var pressedButon = false;
var switchCommand = $('#switch2').is(':checked');

var disableButtons = function() {
  $("#backward-button").prop('disabled', true);
  $("#left-button").prop('disabled', true);
  $("#right-button").prop('disabled', true);
  stop();
  $("#stop-button").addClass('activated');
}

var enableButtons = function()  {
  $("#backward-button").prop('disabled', false);
  $("#left-button").prop('disabled', false);
  $("#right-button").prop('disabled', false);
  stop();
  $("#stop-button").addClass('activated');
}

$("#forward-button").click(function(){
  if(pressedButon && !switchCommand){
    stop(start);
  } else if(!switchCommand){
    start();
  }
  pressedButon = true;
});

$("#backward-button").click(function(){
  if(pressedButon){
    stop(back);
  } else {
    back();
  }
  pressedButon = true;
});

$("#left-button").click(function(){
  if(pressedButon){
    stop(left);
  } else {
    left();
  }
  pressedButon = true;
});

$("#right-button").click(function(){
  if(pressedButon){
    stop(right);
  } else {
    right();
  }
  pressedButon = true;
});

$("#stop-button").click(function(){
  stop();
  pressedButon = true;
});

$('#switch1').change(function(){
  if(this.checked) {
    disableButtons();
  } else {
    enableButtons();
  }
});

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

//Keyboard support

$(document).keydown(function(e) {
  if($('body').is('.command') && $('#switch2').is(':checked')){
    if (lastEvent) return;

    switch(e.which) {
      case 32: // stop
        console.log('stop');
        stop();
        lastEvent = e  ;
        break;

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
  if($('body').is('.command') && $('#switch2').is(':checked')){
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
