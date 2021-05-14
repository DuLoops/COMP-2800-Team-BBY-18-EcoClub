document.getElementById("add-button").addEventListener("click", uploadUserProfilePic);
function uploadUserProfilePic() {
    console.log("Working");
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
            // pointer #1
            const image = document.getElementById("mypic"); // pointer #2
            console.log("Working");
           
            // listen for file selection

            function handleFileSelect() {
                var file = document.getElementById('formFileLg').value;
                console.log("Working");
                

                //store using this name
                var storageRef = storage.ref("profile/" + user.uid);
                console.log("Working");

                //upload the picked file
                storageRef.put(file)
                    .then(function () {
                        console.log('Uploaded to Cloud Storage.');
                    })

                    console.log( storageRef.getDownloadURL());
                //get the URL of stored file
                storageRef.getDownloadURL()
                    .then(function (url) { // Get URL of the uploaded file
                        console.log(url); // Save the URL into users collection
                        async function myFunction() {
                           
                            var bio = document.getElementById("bio").value;
                            db.collection("users").doc(user.uid).update({
                                "profilePic": url,
                                "bio": bio
                            })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                            })
                        }
                        myFunction();
                    })
            }
            handleFileSelect();

    })
}
