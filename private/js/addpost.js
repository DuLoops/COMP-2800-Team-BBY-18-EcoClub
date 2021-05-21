document.getElementById("button").addEventListener('click', uploadUserProfilePic);
document.getElementById("mypic-input").addEventListener('change', uploadOnClick);
let file;

function uploadOnClick(e) {

    file = e.target.files[0];
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    var blob = URL.createObjectURL(file);
    image.src = blob; // display this image
}

function uploadUserProfilePic() {
    firebase.auth().onAuthStateChanged(async function (user) {
        var loaderDiv = document.createElement("div");
        loaderDiv.setAttribute("class", "loader");
        document.body.appendChild(loaderDiv);
        var updating = document.createElement("p");
        updating.setAttribute("class", "text");
        updating.innerHTML = "Posting..";
        document.body.appendChild(updating);


        let name = Math.random().toString(36).substr(2, 9);
        //store using this name
        console.log(name);
        var storageRef = storage.ref("images/" + name + ".jpg");

        //upload the picked file
        await storageRef.put(file)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
            })

        //get the URL of stored file
        storageRef.getDownloadURL()
            .then(function (url) { // Get URL of the uploaded file
                console.log(url); // Save the URL into users collection
                db.collection("users").doc(user.uid).get().then(function (doc) {
                        var groupId = doc.data().group;
                        var name = doc.data().name;
                        var groupDesc = document.getElementById("post-desc").value;
                        

                        
                        db.collection("groups").doc(groupId).collection("posts").add({
                            "postPic": url,
                            "groupDesc": groupDesc,
                            "postedBy": name,
                             "likes": [],
                        })

                    })
                    .then(function () {
                        console.log('Added Post Pic URL to Firestore.');
                        setTimeout(function () {
                            location.replace("/private/html/group/group_feed.html")
                        }, 2000)
                    })
            })
    })
}


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