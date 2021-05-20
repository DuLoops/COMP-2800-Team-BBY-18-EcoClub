document.getElementById("button").addEventListener('click', uploadUserProfilePic);
document.getElementById("mypic-input").addEventListener('change', uploadOnClick);
let file;

function uploadOnClick(e) {

    file = e.target.files[0];
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    var blob = URL.createObjectURL(file);
    image.src = blob; // display this image
}

function uploadUserProfilePic(e) {
    firebase.auth().onAuthStateChanged(function (user) {
        //store using this name
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //upload the picked file
        storageRef.put(file)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
            })

        //get the URL of stored file
        storageRef.getDownloadURL()
            .then(function (url) { // Get URL of the uploaded file
                console.log(url); // Save the URL into users collection
                db.collection("users").doc(user.uid).get().then(function (doc) {
                        var groupId = doc.data().group;
                        var groupDesc = document.getElementById("post-desc").value;
                        db.collection("groups").doc(groupId).collection("posts").add({
                            "postPic": url,
                            "groupDesc": groupDesc
                        })
                    })
                    .then(function () {
                        console.log('Added Profile Pic URL to Firestore.');
                    })
            })
    })
}

function myFunction() {
    document.getElementById("post-desc").value = "I have completed " + localStorage.getItem("challenge_title");
}

myFunction();



// function displayUserProfilePic() {
//     console.log("hi");
//     firebase.auth().onAuthStateChanged(function (user) {      //get user object
//         db.collection("users").doc(user.uid)                  //use user's uid
//             .get()                                            //READ the doc
//             .then(function (doc) {
//                 var picUrl = doc.data().postPic;           //extract pic url

//              // use this line if "mypicdiv" is a "div"
//                 $("#mypic").append("<img src='" + picUrl + "'>")
//             })
//     })
// }
// displayUserProfilePic();