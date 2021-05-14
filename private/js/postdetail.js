db.collection("groups").doc("example").collection("posts").doc("example").collection("comment").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var nameId = doc.data().commenter;
        var comment = doc.data().comment;
        console.log(nameId);
        console.log(comment);
        db.collection("users").doc(nameId).get().then(function(doc){
            var name = doc.data().name;
            console.log(name);
        })
    });
});

document.getElementById("post-btn").addEventListener("click", uploadComment);
function uploadComment() {
    console.log("Working");
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (users) {
            console.log(users.uid);
            var userId = users.uid;
            function handleFileSelect() {
                
                        async function myFunction() {
                           
                            var comment = document.getElementById("comment").value;
                            db.collection("groups").doc("example").collection("posts").doc("example").collection("comment").add({
                                "comment": comment,
                                "commenter": userId
                            })
                            .then(function () {
                                console.log('Added comment to Firestore.');
                            })
                        }
                        myFunction();
                   
            }
            handleFileSelect();
        })
}




