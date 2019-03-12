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
});

dataRef.ref().on("child_added", function (childSnapshot) {
    var tableName = childSnapshot.val().trainName;
    var tableDestination = childSnapshot.val().destination;
    var tableTrain = childSnapshot.val().firstTrain;
    var tableFrequency = childSnapshot.val().frequency;

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency)
    )
    $("#myTable > tbody:last-child").append(newRow)
})

