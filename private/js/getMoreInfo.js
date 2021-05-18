document.getElementById("add-button").addEventListener('click', uploadUserProfilePic);
document.getElementById("mypic-input").addEventListener('change', uploadOnClick);
let file;
function uploadOnClick(e) {

     file = e.target.files[0];
     const image = document.getElementById("mypic-goes-here"); // pointer #2
     var blob = URL.createObjectURL(file);
     image.src = blob;            // display this image
}

function uploadUserProfilePic(e) {
    firebase.auth().onAuthStateChanged(function (user) {
        var loaderDiv = document.createElement("div");
        loaderDiv.setAttribute("class", "loader");
        document.body.appendChild(loaderDiv); 
        var updating = document.createElement("p");
        updating.setAttribute("class", "text");
        updating.innerHTML = "Updating..";
        document.body.appendChild(updating); 
        //store using this name
          var storageRef = storage.ref("profile/" + user.uid + ".jpg"); 
                
          //upload the picked file
              storageRef.put(file) 
                    .then(function(){
                         console.log('Uploaded to Cloud Storage.');
                 })
    
                             //get the URL of stored file
                 storageRef.getDownloadURL()
                     .then(function (url) {   // Get URL of the uploaded file
                         console.log(url);    // Save the URL into users collection
                         var bioDesc = document.getElementById("bio-desc").value;
                         db.collection("users").doc(user.uid).update({
                             "bio" : bioDesc,
                             "profilePic" : url
                             })
                         })
                         .then(function(){
                             console.log('Added Profile Pic URL to Firestore.');

                            setTimeout(function(){
                                 alert("Updated Succesfully");
                                 location.replace("/private/html/main.html")
                            },2000)
                         })
                     })
}