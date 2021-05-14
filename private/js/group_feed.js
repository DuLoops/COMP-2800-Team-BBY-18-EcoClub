// post group feed
function getPosts() {
  document.getElementById("feed_content").innerHTML = "";

  db.collection("groups")
    .doc("example")
    // .doc(getGroupID())
    .collection("posts")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        var desc = doc.data().desc;
        var poster = doc.data().poster;
        var picURL = doc.data().postPic;
        console.log("int the main func ------ "  + getPosterInfo(poster));
        document.getElementById("feed_content").innerHTML += "<div class='post'>" + getPosterInfo(poster) + "<p class='post_desc'>" + desc + "</p></div>";
      });
    });
}
getPosts();

function getGroupID() {
  var groupID;
  db.collection("users")
    .doc(getUserID())
    .get().then((doc) => {
      groupID = doc.data().group;
    })
  return groupID;
}

function getUserID() {
  var user = firebase.auth().currentUser;
  return user.uid;
}

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
    }
    ;
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}
