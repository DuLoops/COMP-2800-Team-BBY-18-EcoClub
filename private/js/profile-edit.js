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

document.getElementById("done-button").addEventListener("click", uploadUserProfile);
function uploadUserProfile() {
    console.log("Working");
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
            console.log("Working");
           
            // listen for file selection

            function handleFileSelect() {
                        async function myFunction() {
                           
                            var bio = document.getElementById("bio").value;
                            var name = document.getElementById("name").value;
                            db.collection("users").doc(user.uid).update({
                                "name": name,
                                "bio": bio
                            })
                            .then(function () {
                                console.log('Updated profile');
                            })
                        }
                        myFunction();
                    }
                    handleFileSelect();
            })

}