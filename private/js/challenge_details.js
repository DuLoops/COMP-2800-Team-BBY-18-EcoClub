function createGrid() {
    var timeslocal = localStorage.getItem("desc");
    // var times = JSON.parse(timeslocal);
    // console.log(times[1][0]);
    console.log(timeslocal);
    document.getElementById("chalange_name_feild").innerHTML = timeslocal;
}
createGrid();

function take_challenge() {
    var challengeID = localStorage.getItem("id");
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("user_challenges").doc().set({
            "challengeID": challengeID,
        });
    });
}