firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid).get().then((doc) => {
        groupStatus = doc.data().group;
        console.log("Group status " + groupStatus);
        if (groupStatus != null) {
            window.location.assign("/private/html/challenges/eco_challenge.html"); //re-direct to main.html after signup
        }

    });
});


function displayName() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users")
                .doc(user.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    if (name) {
                        $("#userName").html(name);
                    } else {
                        $("#userName").html("User Name");
                    }
                })
        }
    })
}
displayName();

firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid)
                    .get()
                    .then(function(doc){
                        var bio = doc.data().bio;
                        var profilepic = doc.data().profilePic;
                        if(bio == null && profilepic == null) {
                            document.getElementById("build_profile").style.visibility = "visible";
                            document.getElementById("edit_profile").style.display = "none";
                        } else {
                            document.getElementById("build_profile").style.display = "none";
                            document.getElementById("edit_profile").style.visibility = "visible";
                        }
                    })
})