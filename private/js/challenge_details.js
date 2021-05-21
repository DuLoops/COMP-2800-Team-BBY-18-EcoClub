function displayDetails() {
    var docID = localStorage.getItem("docID");

    db.collection("eco-challenges").doc(docID).get().then((doc)=>{
        var title = doc.data().title;
        var desc = doc.data().desc;
        var ecopoint = doc.data().ecopoint;
        document.getElementById("chalange_name_feild").innerHTML = title;
        document.getElementById("comment").innerHTML = desc;
        document.getElementById("eco_point_p").innerHTML = ecopoint + " eco-point";
    });
}
displayDetails();

function take_challenge() {
    var challengeID = localStorage.getItem("id");
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("user_challenges").doc().set({
            "challengeID": challengeID,
        });
    });
}