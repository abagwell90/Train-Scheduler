//my fire base push 2 database for train project
var config = {
  apiKey: "AIzaSyDhfcce4HWXefzBScucxJOCwST0QY1qwiY",
  authDomain: "test-firebase-push-2.firebaseapp.com",
  databaseURL: "https://test-firebase-push-2.firebaseio.com",
  projectId: "test-firebase-push-2",
  storageBucket: "",
  messagingSenderId: "80334993650"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTime = "";
var frequency = "";

$('#button').on('click', function (event) {
  event.preventDefault();
  var name = $('#nameField').val().trim();
  var destination = $('#destinationField').val().trim();
  var firstTrain = moment($('#firstTrainField').val().trim(), "HH:mm").format("");
  var frequency = $('#frequencyField').val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  });

  location.reload(true);
});

database.ref().on("child_added", function (childSnapshot) {
  // console.log(childSnapshot.val().name);
  // console.log(childSnapshot.val().destination);
  // console.log(childSnapshot.val().firstTrain);
  // console.log(childSnapshot.val().frequency);

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // console.log(name);
  // console.log(destination);
  // console.log(firstTrain);
  // console.log(frequency);

  //from class train predictions example
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var nextTrainFinal = moment(nextTrain).format("hh:mm a");

  $("#trainInfo").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainFinal + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});