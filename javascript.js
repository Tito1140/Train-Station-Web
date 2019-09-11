var config = {
    apiKey: "AIzaSyCFjwY3uvJYXuWuPczMjHdM_woeceSiGAk",
    authDomain: "train-station-3f870.firebaseapp.com",
    databaseURL: "https://train-station-3f870.firebaseio.com",
    projectId: "train-station-3f870",
    storageBucket: "train-station-3f870.appspot.com",
    messagingSenderId: "663553491494"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#departure-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    dataRef.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
    $("form")[0].reset();
});

dataRef.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;
    var minAway = childSnapshot.val().frequency - remainder;
    var frequency = childSnapshot.val().frequency;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(minAway),
        $("<td>").text(nextTrain)
    )
    $("#myTable > tbody:last-child").append(newRow)
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


