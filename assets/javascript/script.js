$(document).ready(function(){
  
  var trainData = new Firebase("https://traintrack.firebaseio.com/");

  $(document).on('click', '#submit', function(){
    var trName = $('#trainName').val();
    var trDest = $('#destination').val();
    var trStart = $('#startTime').val();
    var trFreq = $('#frequency').val();

    
    trainData.push({
      name: trName,
      destination: trDest,
      start: trStart,
      frequency: trFreq
    })

    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");

    return false;
  })

  trainData.on("child_added", function(childSnapshot, prevChildKey){

    var trName = childSnapshot.val().name;
    var trDest = childSnapshot.val().destination;
    var trStart = childSnapshot.val().start;
    var trFreq = childSnapshot.val().frequency;

    var firstTimeConverted = moment(trStart,"hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trFreq;
    var tMinutesTillTrain = trFreq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm")

    $("#trainTable").append("<tr><td>" + trName + "</td><td>" + trDest + "</td><td>" + trFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  })
});