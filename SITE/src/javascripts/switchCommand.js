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
