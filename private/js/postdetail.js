// db.collection("groups").doc("example").collection("posts").doc("example").collection("comment").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         var nameId = doc.data().commenter;
//         var comment = doc.data().comment;
//         console.log(nameId);
//         console.log(comment);
//         db.collection("users").doc(nameId).get().then(function(doc){
//             var name = doc.data().name;
//             console.log(name);
//         })
//     });
// });

document.getElementById("post-btn").addEventListener("click", uploadComment);

function uploadComment() {
    console.log("Working");
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user.uid);
        var userId = user.uid;

        function handleFileSelect() {

            async function myFunction() {

                var comment = document.getElementById("comment").value;
                db.collection("users").doc(user.uid).get().then(async function (doc) {
                    var groupId = doc.data().group;
                    var post = (localStorage.getItem('postID'));
                    console.log(post);
                    await db.collection("groups").doc(groupId).collection("posts").doc(post).collection("comment").add({
                            "comment": comment,
                            "commenter": userId
                        })
                        .then(function () {
                            console.log('Added comment to Firestore.');
                        })
                        window.location.reload();
                })
            }
            myFunction();

        }
        handleFileSelect();
    })
}

function displayUserProfilePic() {
    firebase.auth().onAuthStateChanged(function (user) { //get user object
        db.collection("users").doc(user.uid) //use user's uid
            .get() //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic; //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}

function getChallenges() {
    document.getElementById("comment-box").innerHTML = "";

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).get().then(function (doc) {
            var groupId = doc.data().group;
            var post = (localStorage.getItem('postID'));
            db.collection("groups").doc(groupId).collection("posts").doc(post).collection("comment")
                .get()
                .then(function (snap) {
                    snap.forEach(async function (doc) {
                        var comment = doc.data().comment;
                        await db.collection("users").doc(user.uid).get().then(function (doc) {
                            var userName = doc.data().name;
                            var picUrl = doc.data().profilePic;
                            $(".profile-pic").attr("src", picUrl);
                            document.getElementById("comment-box").innerHTML += "<div> <img class='profile-pic' src='" + picUrl
                            + "' alt='profilePic'><span class='name'>" + userName + "</span><br><p>" + comment + "</p></div><hr>";
                        })

                    });
                });
        })
    })
}
getChallenges();