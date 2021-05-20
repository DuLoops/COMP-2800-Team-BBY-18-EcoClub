// post group feed
// post group feed
function getPosts() {
  document.getElementById("feed_content").innerHTML = "";
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get().then(function (doc) {
        var groupID = doc.data().group;
        console.log(groupID);
        db.collection("groups")
          .doc(groupID)
          // .doc(getGroupID())
          .collection("posts")
          .get()
          .then(function (snap) {
            snap.forEach(function (doc) {
              console.log("work");
              var description = doc.data().groupDesc;
              console.log(description);
              // var poster = doc.data().poster;
              // // var picURL = doc.data().postPic;
              // console.log("int the main func ------ " + getPosterInfo(poster));
              document.getElementById("feed_content").innerHTML += "<div class='post'>" + "<p class='post_desc'>" + description + "</p></div>";
            });
          });
        // return groupID;
      })
  })
}
getPosts();

function getGroupID() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get().then(function (doc) {
        var groupID = doc.data().group;
        // console.log(groupID);
        db.collection("groups")
          .doc(groupID)
          .collection("posts")
          .get()
          .then(function (snap) {
            snap.forEach(function (doc) {
              var description = doc.data().desc;
              var poster = doc.data().poster;
              var picURL = doc.data().postPic;
              var likes = doc.data().likes;
              // var posterw = getPosterInfo(poster);
              document.getElementById("feed_content").innerHTML += "<div class='post'><img class='post_pic' src='" + picURL + "' alt='postPic'><p class='post_desc'>" + description + "</p><div class='post_btn'><p class='likes'><i class='far fa-thumbs-up'></i>"+likes+"</p><div><button type='button' class='btn btn-secondary unliked' onclick='likePost(this)' groupID='"+groupID+"' postID='"+doc.id+"'>Like</button><button type='button' class='btn btn-success' onclick='postDetail(this)'>Comment</button></div></div></div>";
            });
          });
      })
  })
}

getPosts();


function getPosterInfo(userID) {
  var user_member = db.collection("users").doc(userID);
  // console.log(member);
  user_member.get().then((doc) => {
    if (doc.exists) {
      var userName = doc.data().name;
      var userPofile = doc.data().profilePic;
      var returnString = "<div class='post_poster'>" + userName + "</div>"
      console.log(returnString);
      return returnString;
    } else {
      // doc.data() will be undefined in this case
      console.log("Cannot find the user");
    };
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

function likePost(attr) {
  var groupID = (attr.getAttribute("groupID"));
  var postID = (attr.getAttribute("postID"));
  if (attr.classList.contains("unliked")){
    attr.classList.remove("unliked");
    attr.classList.add("liked");
    attr.classList.remove("btn-secondary");
    attr.classList.add("btn-success");
    db.collection("groups")
          .doc(groupID)
          .collection("posts")
          .doc(postID)
          .update({
            likes: firebase.firestore.FieldValue.increment(1) 
          }); 
  } else {
    attr.classList.remove("liked");
    attr.classList.add("unliked");
    attr.classList.remove("btn-success");
    attr.classList.add("btn-secondary");
    db.collection("groups")
          .doc(groupID)
          .collection("posts")
          .doc(postID)
          .update({
            likes: firebase.firestore.FieldValue.increment(-1) 
          });
  }
  updateLikes();
}

function postDetail() {
  var groupID = (attr.getAttribute("groupID"));
  var postID = (attr.getAttribute("postID"));
  window.localStorage.setItem("groupID", groupID);
  window.localStorage.setItem("postID", postID);
  // window.replace.href = .html;
}