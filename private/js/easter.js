function increasePoints(){
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
            "ecopoint": firebase.firestore.FieldValue.increment(20)
        })
    })
}
increasePoints();