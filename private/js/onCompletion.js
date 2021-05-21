function displayPoints(){
    var challengeID = (localStorage.getItem('challengeID'));
    db.collection("eco-challenges").doc(challengeID).get().then(function(doc){
        var points = doc.data().ecopoint;
        console.log(points);
        document.getElementById("ecoPoint").innerHTML = points;
        increasePoints(points);
    })
}
displayPoints();

function increasePoints(point){
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
            "ecopoint": firebase.firestore.FieldValue.increment(point)
        })
    })
}
