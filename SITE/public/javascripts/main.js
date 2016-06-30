var lastEvent;
var lastController;
var modeSelected;

var reset = function(){
  console.log("reset");
}

//Ajax calls
var controlServer = "http://192.168.1.239";

//Moving forward
function start() {
  var req = "";
  if($('#switch1').is(':checked')) {
    req = "/mode/auto";
  } else if($('#switch2').is(':checked')) {
    req = "/mode/line";
  } else if($('#switch3').is(':checked')) {
    req = "/start";
  }
  if (req != "") {
    $.ajax({
      url: controlServer + req,
      method: "POST"
    })
    .done(function (msg) {
      console.log(msg);
      $("#forward-button").addClass("activated");
      $("#stop-button").removeClass("activated");
    });
  } else {
    alert("Please chose a mode with the switch buttons")
  }

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

$("#forward-button").mousedown(function(){
  lastController = "b";
  start();
  $("#forward-button").removeClass("activable");
  $("#forward-button").on('mouseup', function(){
    $("#forward-button").addClass("activable");
    stop();
  })
});

$("#backward-button").mousedown(function(){
  lastController = "b";
  back();
  $("#backward-button").removeClass("activable");
});

$("#right-button").mousedown(function(){
  lastController = "b";
  right();
  $("#right-button").removeClass("activable");
});

$("#left-button").mousedown(function(){
  lastController = "b";
  left();
  $("#right-button").removeClass("activable");
});

$("#stop-button").mousedown(function(){
  lastController = "b";
  stop();
  $("#stop-button").removeClass("activable");
});

// $(".depth").mouseup(function(){
//   console.log("up");
//   $(".depth").addClass("activable");
//   stop();
// });

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
          lastController = "gp";
          break;

        case "UP": // forward
          console.log('forward');
          start();
          lastEventGP = i;
          lastController = "gp";
          break;

        case "LEFT": // right
          console.log('right');
          right();
          lastEventGP = i;
          lastController = "gp";
          break;

        case "DOWN": // backward
          console.log('backward');
          back();
          lastEventGP = i;
          lastController = "gp";
          break;

        case "BACK": // stop
        case "START": // stop
          console.log('stop');
          stop();
          lastEventGP = null;
          lastController = "gp";
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
            lastController = "gp";
          }
          break;

        case "UP": // up
          if (lastEventGP == i) {
            console.log('stop up');
            stop();
            lastEventGP = null;
            lastController = "gp";
          }
          break;

        case "RIGHT": // right
          if (lastEventGP == i) {
            console.log('stop right');
            stop();
            lastEventGP = null;
            lastController = "gp";
          }
          break;

        case "DOWN": // down
          if (lastEventGP == i) {
            console.log('stop down');
            stop();
            lastEventGP = null;
            lastController = "gp";
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
    html+= "Stick "+(Math.ceil(i/2)+1)+": "+ (Math.floor(gp.axes[i] * 100) / 100).toFixed(2) +","+(Math.floor(gp.axes[i+1] * 100) / 100).toFixed(2)+"<br/>";
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

$('#switch1').change(function(){
  disableButtons();
  $('#switch2').prop('checked', false);
  $('#switch3').prop('checked', false);
});

$('#switch2').change(function(){
  disableButtons();
  $('#switch1').prop('checked', false);
  $('#switch3').prop('checked', false);
});

$('#switch3').change(function(){
  enableButtons();
  $('#switch1').prop('checked', false);
  $('#switch2').prop('checked', false);
});
