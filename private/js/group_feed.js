// post group feed
function getPosts() {
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("feed_content").innerHTML = "";
    db.collection("users")
      .doc(user.uid)
      .get().then(function (doc) {
        var groupID = doc.data().group;
        db.collection("groups")
          .doc(groupID)
          .collection("posts")
          .get()
          .then(function (snap) {
            snap.forEach(function (doc) {
              var description = doc.data().groupDesc;
              var picURL = doc.data().postPic;
              var likesArray = doc.data().likes;
              var PosterName = doc.data().postedBy;
              var PosterID = doc.data().posterId;
              var likedStatus = "btn-secondary unliked";
              for (var i in likesArray) {
                if (likesArray[i] == user.uid) {
                  likedStatus = "btn-success liked"
                } 
              }
             

              
             
              document.getElementById("feed_content").innerHTML += "<div class='post'><p class='poster'><span id='name' onclick='displayProfile(this)' posterID='"+PosterID+"'>"+  PosterName +"</span></p><img class='post_pic' src='" + picURL + "' alt='postPic'><p class='post_desc'>" + description + "</p><div class='post_btn'><p class='likes'><i class='far fa-thumbs-up'></i>"+likesArray.length+"</p><div><button type='button' id='btn'class='btn' "+likedStatus+"' onclick='likePost(this)' groupID='"+groupID+"' postID='"+doc.id+"'>Like</button><button type='button'id='btn' class='btn' onclick='postDetail(this)' postID='"+doc.id+"' groupID='"+groupID+"'>Comment</button></div></div></div><hr>";
            });
          });
      })
  })
}

// call getPosts() function if the collection is not empty
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid).get()
    .then((doc) =>{
      let groupID = doc.data().group;
      db.collection("groups")
      .doc(groupID)
      .collection("posts")
      .get()
      .then((doc) => {
        if (!doc.empty) {
          getPosts();
        }
      })
    })

});




// function getPosterInfo(userID) {
//   var user_member = db.collection("users").doc(userID);
//   // console.log(member);
//   user_member.get().then((doc) => {
//     if (doc.exists) {
//       var userName = doc.data().name;
//       var returnString = "<div class='post_poster'>" + userName + "</div>"
//       console.log(returnString);
//       return returnString;
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("Cannot find the user");
//     };
//   }).catch((error) => {
//     console.log("Error getting document:", error);
//   });
// }

function likePost(attr) {
  var groupID = (attr.getAttribute("groupID"));
  console.log(groupID);
  var postID = (attr.getAttribute("postID"));
  console.log(postID);
  if (attr.classList.contains("unliked")){
    db.collection("groups")
          .doc(groupID)
          .collection("posts")
          .doc(postID)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
          }); 
  } else {
    db.collection("groups")
          .doc(groupID)
          .collection("posts")
          .doc(postID)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
          });
  }
  getPosts();
}


function postDetail(attr) {
  var groupID = (attr.getAttribute("groupID"));
  var postID = (attr.getAttribute("postID"));
  console.log(postID);
  window.localStorage.setItem("groupID", groupID);
  localStorage.setItem('postID', postID );
  location.replace("/private/html/post/postdetail.html");
  // window.localStorage.setItem("postID", postID);
  // window.replace.href = .html;
}


function displayProfile(attr){

  var posterID = (attr.getAttribute("posterID"));
  localStorage.setItem('posterID', posterID );
  console.log(posterID);
  firebase.auth().onAuthStateChanged(function (user){
    if(posterID == user.uid){
      location.replace("/private/html/profile/profile-main.html");
    } else{
      location.replace("/private/html/profile/memberProfile.html");
    }
  })    
  
}