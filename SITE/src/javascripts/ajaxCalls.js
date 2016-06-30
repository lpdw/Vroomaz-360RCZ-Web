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
