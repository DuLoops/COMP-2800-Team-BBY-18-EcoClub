// function uploadUserProfilePic() {
//     // Let's assume my storage is only enabled for authenticated users 
//     // This is set in your firebase console storage "rules" tab

//     firebase.auth().onAuthStateChanged(function (user) {
//         var fileInput = document.getElementById("formFileLg").value;   // pointer #1
//         const image = document.getElementById("mypic"); // pointer #2
//         console.log("Working");

//         // listen for file selection
//         fileInput.addEventListener('change', function (e) {
//             console.log("Working2");
//             var file = e.target.files[0];
//             var blob = URL.createObjectURL(file);
//             image.src = blob;            // display this image

//             //store using this name
//             var storageRef = storage.ref("images/" + user.uid + ".jpg"); 
//             console.log("Working2");

//             //upload the picked file
//             storageRef.put(file) 
//                 .then(function(){
//                     console.log('Uploaded to Cloud Storage.');
//                 })

// 						//get the URL of stored file
//             storageRef.getDownloadURL()
//                 .then(function (url) {   // Get URL of the uploaded file
//                     console.log(url);    // Save the URL into users collection
//                     db.collection("users").doc(user.uid).update({
//                         "postPic": url
//                     })
//                     .then(function(){
//                         console.log('Added Post Pic URL to Firestore.');
//                     })
//                 })
//         })
//     })
// }

// function upload() {
//     uploadUserProfilePic();
//     console.log("uploaded");
// }

// document.getElementById('formFileLg').addEventListener('change', handleFileSelect, false);

//             // handle file upload called whenever files are selected
//             function handleFileSelect(event) {
//                 var files = event.target.files;
//                 for (var i = 0; i < files.length; i++) {
//                     file = files[i];
//                     uploadFile(file);
//                 }
//             }

//             var storageRef = storage.ref();

//             // pushing files to Firebase storage
//             function uploadFile(file) {
//                 // set file metadata
//                 var metadata = {
//                     contentType: 'image/jpeg'
//                 };

//                 // use Firebase push call to upload file to Firebase
//                 var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

//                 // monitor Firebase upload prodress and catch errors
//                 uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
//                 function(snapshot) {
//                     // calculate progress as a percentage
//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log('Upload is ' + progress + '% done');

//                     // check for a change in u0pload state
//                     switch(snapshot.state) {
//                         case firebase.storage.TaskState.PAUSED:
//                             console.log('Upload is paused');
//                             break;
//                         case firebase.storage.TaskState.RUNNING:
//                             console.log('Upload is running');
//                             break;
//                     }
//                 }, function(error) {
//                     // catch an error when it happens, note: there are more error codes
//                     switch(error.code) {
//                         case 'storage/bucket_not_found':
//                             console.log('The Bucket for this storage could not be found');
//                             break;
//                         case 'storage/unauthorized':
//                             console.log('User doesn\'t have access');
//                             break;
//                         case 'storage/cancelled':
//                             console.log('User cancelled the upload process');
//                             break;
//                         case 'storage/unknown':
//                             console.log('Unknown error');
//                             break;
//                     }
//                 return;
//                 }, function() {
//                     // on success, display the uploaded image on the page
//                     var downloadURL = uploadTask.snapshot.downloadURL;
//                     console.log('the image uploaded and can be found at ' + downloadURL);

//                     var filelist = document.getElementById('list');
//                     var newFileListElement = document.createElement('li');
//                     var fileImage = document.createElement('IMG');
//                     fileImage.src = downloadURL;
//                     newFileListElement.appendChild(fileImage);
//                     filelist.appendChild(newFileListElement);
//                 })
//             }



function uploadUserProfilePic() {
    console.log("Working");
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
            // pointer #1
            const image = document.getElementById("mypic"); // pointer #2
           
            // listen for file selection
            document.getElementById('formFileLg').addEventListener('change', handleFileSelect, false);

            function handleFileSelect(event) {
                var file = event.target.files[0];
                var blob = URL.createObjectURL(file);
                image.src = blob; // display this image

                //store using this name
                var storageRef = storage.ref("images/" + user.uid);

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
                        db.collection("users").doc(user.uid).collection("User-Post").doc("1").set({
                                "postPic": url
                            })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                            })
                    })
            }
    })
}

uploadUserProfilePic()


// function displayUserProfilePic() {
//     console.log("hi");
//     firebase.auth().onAuthStateChanged(function (user) {      //get user object
//         db.collection("users").doc(user.uid)                  //use user's uid
//             .get()                                            //READ the doc
//             .then(function (doc) {
//                 var picUrl = doc.data().postPic;           //extract pic url

// 				// use this line if "mypicdiv" is a "div"
//                 $("#mypic").append("<img src='" + picUrl + "'>")
//             })
//     })
// }
// displayUserProfilePic();