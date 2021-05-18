// Displaying group info
//change "example" to the getGroupID function
var docRef = db.collection("groups").doc("example");

docRef.get().then((doc) => {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
        var groupCode =doc.data().groupCode;
        var groupName = doc.data().groupName;
        var desc = doc.data().desc;
        var groupPic = doc.data().groupPic;
        var leader = doc.data().leader;
        var members = doc.data().members;

        displayGroupInfo(groupCode, groupName, desc, groupPic);
        displayMembers(leader, members);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
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

function displayGroupInfo(groupCode, groupName, desc, groupPic) {
  document.getElementById("group_code").textContent = "#" + groupCode;
  document.getElementById("group_name").textContent = groupName;
  document.getElementById("group_desc").textContent = desc;
}

function displayMembers(leader, members) {
  document.getElementById("group_leader").textContent = leader;
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
      document.getElementById("group_members").innerHTML += "<div class='member'><p class='member_name'>" 
        + userName + "</p><p class='member_point'>EcoPoint: " + userPoint + "</p></div>";
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  });
  
}
