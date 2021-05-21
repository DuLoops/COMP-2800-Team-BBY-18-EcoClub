// Displaying group info
//change "example" to the getGroupID function
firebase.auth().onAuthStateChanged(function (user) {
  db.collection("users")
    .doc(user.uid)
    .get().then(function (doc) {
      var groupID = doc.data().group;
      // console.log(groupID);
      var docRef = db.collection("groups").doc(groupID);
      docRef.get().then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          var groupCode = doc.data().groupCode;
          var groupName = doc.data().groupName;
          var desc = doc.data().desc;
          var leader = doc.data().leader;
          var members = doc.data().members;
          console.log(groupCode);
          displayGroupInfo(groupCode, groupName, desc);
          displayMembers(leader, members);
          //if the user is the admin
          if(user.uid == leader){
            console.log("Admin logged in");
            document.getElementById("forAdmin").innerHTML = "<div id='admin_edit'><a id='group_edit' href='group_edit.html'>Edit Club Info</a><div>";
          } else {
            // doc.data() will be undefined in this case
            console.log("Not an admin");
          }

        } 
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    });

});

function getGroupID() {
  var groupID;
  db.collection("users")
    .doc(getUserId())
    .get().then((doc) => {
      groupID = doc.data().group;
    })
  return groupID;
}

function getUserID() {
  var user = firebase.auth().currentUser;
  return user.uid;
}

function displayGroupInfo(groupCode, groupName, desc) {
  console.log("displaying");
  document.getElementById("group_code").textContent = "#" + groupCode;
  document.getElementById("group_name").textContent = "Club Name: " + groupName;
  document.getElementById("group_desc").textContent = "Description: " + desc;
}

function displayMembers(leader, members) {
  db.collection("users")
  .doc(leader)
  .get().then((doc)=>{
    document.getElementById("group_leader").textContent = "Admin: " + doc.data().name;
  })
  members.forEach(member => {
    var user_member = db.collection("users").doc(member);
    // console.log(member);
    user_member.get().then((doc) => {
      if (doc.exists) {
        var userName = doc.data().name;
        var userPoint = doc.data().ecopoint;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      document.getElementById("group_members").innerHTML += "<div class='member'><p class='member_name'>" +
        userName + "</p><p class='member_point'>EcoPoint: " + userPoint + "</p></div>";
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  });

}