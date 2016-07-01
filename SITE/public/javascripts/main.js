var lastEvent;
var modeSelected;
var stopFlag;

//Ajax calls
var controlServer = "http://localhost:3001";

//Moving forward
function start(e) {
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
      lastEvent = e;
      console.log(msg);
      $("#forward-button").addClass("activated");
      $("#stop-button").removeClass("activated");
      $('#carDirection').html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');
      if(stopFlag){
        stop();
        stopFlag = null;
        console.log("stopflag catched");
      }
    });
  }
}


//Moving backward
function back(e) {
  $.ajax({
    url: controlServer + "/back",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    lastEvent = e;
    $("#backward-button").addClass("activated");
    $("#stop-button").removeClass("activated");
    $('#carDirection').html('<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>');
    if(stopFlag){
      stop();
      stopFlag = null;
      console.log("stopflag catched");
    }
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
    lastEvent = null;
    $('#carDirection').html('');
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
function left(e) {
  $.ajax({
    url: controlServer + "/left",
    method: "POST"
  })
  .done(function (msg) {
    lastEvent = e;
    console.log(msg);
    $("#avg").addClass("turn-left");
    $("#avd").addClass("turn-left");
    $("#left-button").addClass("activated");
    $("#stop-button").removeClass("activated");
    $('#carDirection').html('<i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>');
    if(stopFlag){
      stop();
      stopFlag = null;
      console.log("stopflag catched");
    }
  });
}


//Turn right
function right(e) {
  $.ajax({
    url: controlServer + "/right",
    method: "POST"
  })
  .done(function (msg) {
    lastEvent = e;
    console.log(msg);
    $("#avg").addClass("turn-right");
    $("#avd").addClass("turn-right");
    $("#right-button").addClass("activated");
    $("#stop-button").removeClass("activated");
    $('#carDirection').html('<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>');
    if(stopFlag){
      stop();
      stopFlag = null;
      console.log("stopflag catched");
    }
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
  start("ok");
  $("#forward-button").removeClass("activable");
  if($('#switch3').is(':checked')){
    $("#forward-button").on('mouseup', function(){
      $("#forward-button").addClass("activable");
      if(!lastEvent){
        console.log("stop flag rised");
        stopFlag = true;
        return;
      }
      stop();
    })
  }
});

$("#backward-button").mousedown(function(){
  back("ok");
  $("#backward-button").removeClass("activable");
  $("#backward-button").on('mouseup', function(){
    $("#backward-button").addClass("activable");
    if(!lastEvent){
      console.log("stop flag rised");
      stopFlag = true;
      return;
    }
    stop();
  })
});

$("#right-button").mousedown(function(){
  right("ok");
  $("#right-button").removeClass("activable");
  $("#right-button").on('mouseup', function(){
    $("#right-button").addClass("activable");
    if(!lastEvent){
      console.log("stop flag rised");
      stopFlag = true;
      return;
    }
    stop();
  })
});

$("#left-button").mousedown(function(){
  left("ok");
  $("#left-button").removeClass("activable");
  $("#left-button").on('mouseup', function(){
    $("#left-button").addClass("activable");
    if(!lastEvent){
      console.log("stop flag rised");
      stopFlag = true;
      return;
    }
    stop();
  })
});

$("#stop-button").mousedown(function(){
  stop();
  $("#stop-button").removeClass("activable");
  $("#stop-button").on('mouseup', function(){
    $("#stop-button").addClass("activable");
    stop();
  })
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

$(document).ready(function ($) {

    setInterval(function () {
        moveRight();
    }, 3000);

	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});

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
