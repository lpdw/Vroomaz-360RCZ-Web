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
  });
}
