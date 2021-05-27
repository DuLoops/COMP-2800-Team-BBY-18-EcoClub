document.getElementById("button").addEventListener('click', post);
document.getElementById("mypic-input").addEventListener('change', uploadOnClick);

let file;

function uploadOnClick(e) {
    file = e.target.files[0];
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    var blob = URL.createObjectURL(file);
    image.src = blob; // display this image
}

async function post() {
    await firebase.auth().onAuthStateChanged(async function (user) {
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
        var storageRef = storage.ref("challengesPost/" + name + ".jpg");

        //upload the picked file
        await storageRef.put(file)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
            })

        //get the URL of stored file
        await storageRef.getDownloadURL()
            .then(function (url) { // Get URL of the uploaded file
                db.collection("users").doc(user.uid).get().then(function (doc) {
                        var groupId = doc.data().group;
                        var name = doc.data().name;
                        var groupDesc = document.getElementById("post-desc").value;
                        var timestamp = firebase.firestore.FieldValue.serverTimestamp(); 
                        
                        db.collection("groups").doc(groupId).collection("posts").add({
                            "postPic": url,
                            "groupDesc": groupDesc,
                            "postedBy": name,
                             "likes": [],
                             "time": timestamp
                        })

                    })
                    .then(function () {
                        console.log('Added Post Pic URL to Firestore.');
                    })
            })
            var challengeID = localStorage.getItem("challengeID");
            await firebase.auth().onAuthStateChanged(async function (user) {
                await db.collection("users").doc(user.uid).collection("user_challenges").where("challengeID", "==", challengeID)
                    .get().then(function (snap) {
                        snap.forEach( function (doc) {
                            console.log(doc.id);
                            const yourDate = new Date();
                             db.collection("users").doc(user.uid)
                                .collection("completedChallenge").add({
                                    date: yourDate.toISOString().split('T')[0],
                                    challengeID: challengeID
                                });

                             db.collection("users").doc(user.uid)
                                .collection("user_challenges").doc(doc.id).delete().then(() => {
                                    console.log("Document successfully deleted!");
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });        
                        })
                    })
            })

            setTimeout(function () {
                location.replace("/private/html/challenges/OnCompletion.html")
            }, 2000)

        })
}


function myFunction() {
    document.getElementById("post-desc").value = "I have completed " + localStorage.getItem("challengeTitle");
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


(function() {
    if (window.__twitterIntentHandler) return;
    var intentRegex = /twitter\.com\/intent\/(\w+)/,
        windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        width = 550,
        height = 420,
        winHeight = screen.height,
        winWidth = screen.width;
  
    function handleIntent(e) {
      e = e || window.event;
      var target = e.target || e.srcElement,
          m, left, top;
  
      while (target && target.nodeName.toLowerCase() !== 'a') {
        target = target.parentNode;
      }
  
      if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
        m = target.href.match(intentRegex);
        if (m) {
          left = Math.round((winWidth / 2) - (width / 2));
          top = 0;
  
          if (winHeight > height) {
            top = Math.round((winHeight / 2) - (height / 2));
          }
  
          window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                             ',height=' + height + ',left=' + left + ',top=' + top);
          e.returnValue = false;
          e.preventDefault && e.preventDefault();
        }
      }
    }
  
    if (document.addEventListener) {
      document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
      document.attachEvent('onclick', handleIntent);
    }
    window.__twitterIntentHandler = true;
  }());

  $("#tweet").click(function () {
    var desc = document.getElementById("post-desc").value;
    var href = "https://twitter.com/intent/tweet?hashtags=EcoClub&text=Posted%20from%20EcoClub:%20" + desc + "&tw_p=tweetbutton&url=https://ecoclub-a9e9e.web.app/";
    $("#tweet").attr('href', href);
  });

  // facebook
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1122768921575874"; // appId must be valid
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));