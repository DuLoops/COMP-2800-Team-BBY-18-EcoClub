document.getElementById("button").addEventListener("click", uploadUserProfilePic);
function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input");   // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image

            //store using this name
            var storageRef = storage.ref("images/" + user.uid + ".jpg"); 
            
            //upload the picked file
            storageRef.put(file) 
                .then(function(){
                    console.log('Uploaded to Cloud Storage.');
                })

						//get the URL of stored file
            storageRef.getDownloadURL()
                .then(function (url) {   // Get URL of the uploaded file
                    console.log(url);    // Save the URL into users collection
                    db.collection("groups").doc("example").collection("posts").add({
                      "postPic": url
                   })
                    .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                    })
                })
        })
    })
}
// uploadUserProfilePic();

// function addDescription() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         var desc = document.getElementById("post-desc").value;
//         db.collection("groups").doc("example").collection("posts").add({
//             "desc": desc
//          })
//     })
// }
