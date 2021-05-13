function sayName() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                // Read
                .get()
                .then(function (doc) {
                    // Extract the first name of the user
                    var name = doc.data().name;
                    var bio = doc.data().bio;

                    if (name) {
                        document.getElementById("name").placeholder = name;
                        document.getElementById("bio").placeholder = bio;
                    } else {
                        document.getElementById("name").placeholder = "EcoClub User Name";
                        document.getElementById("bio").placeholder = "EcoClub User Bio";
                    }
                });
        }
    });
}
sayName();