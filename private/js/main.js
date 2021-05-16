function displayName() {
    firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then(function(doc){
                        var name = doc.data().name;
                        if(name) {
                            $("#userName").html(name);
                        } else {
                            $("#userName").html("User Name");
                        }
                    })
            }
        })
}
displayName();