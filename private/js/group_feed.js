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

// function getGroupID() {
//   firebase.auth().onAuthStateChanged(function (user) {
//     db.collection("users")
//       .doc(user.uid)
//       .get().then(function (doc) {
//         var groupID = doc.data().group;
//         console.log(groupID);
//         return groupID;
//       })
//   })

// }


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