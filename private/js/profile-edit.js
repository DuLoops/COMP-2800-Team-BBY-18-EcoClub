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
                        document.getElementById("name").value = name;
                        document.getElementById("bio").value = bio;
                    } else {
                        document.getElementById("name").placeholder = "EcoClub User Name";
                        document.getElementById("bio").placeholder = "EcoClub User Bio";
                    }
                });
        }
    });
}
sayName();

document.getElementById("done-button").addEventListener('click', uploadUserProfile);
document.getElementById("mypic-input").addEventListener('change', uploadOnClick);
let file;

function uploadOnClick(e) {

    file = e.target.files[0];
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    var blob = URL.createObjectURL(file);
    image.src = blob; // display this image
}

function uploadUserProfile(e) {
    var loaderDiv = document.createElement("div");
        loaderDiv.setAttribute("class", "loader");
        document.body.appendChild(loaderDiv);
        var updating = document.createElement("p");
        updating.setAttribute("class", "text");
        updating.innerHTML = "Updating..";
        document.body.appendChild(updating);
    console.log("Working");
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("profile/" + user.uid + ".jpg");

        //upload the picked file
        storageRef.put(file)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
            })

        //get the URL of stored file
        storageRef.getDownloadURL()
            .then(function (url) { // Get URL of the uploaded file
                console.log(url); // Save the URL into users collection
                var bio = document.getElementById("bio").value;
                var name = document.getElementById("name").value;
                db.collection("users").doc(user.uid).update({
                    "name": name,
                    "bio": bio,
                    "profilePic": url
                })
            })
            .then(function () {
                console.log('Added Profile Pic URL to Firestore.');

                setTimeout(function () {
                    location.replace("/private/html/profile/profile-main.html")
                }, 2000)
            })
    })
    console.log("Working");

}

function displayUserProfilePic() {
    console.log("hi");
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
displayUserProfilePic();

