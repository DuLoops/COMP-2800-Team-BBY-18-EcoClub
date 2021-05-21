// Displaying group info
//change "example" to the getGroupID function
firebase.auth().onAuthStateChanged(function (user) {
  db.collection("users")
    .doc(user.uid)
    .get().then(function (doc) {
      var groupID = doc.data().group;
      var docRef = db.collection("groups").doc(groupID);
      docRef.get().then((doc) => {
        if (doc.exists) {
          var groupName = doc.data().groupName;
          var desc = doc.data().desc;
          var members = doc.data().members;
          $("#name").val(groupName);
          $("#desc").val(desc);
          displayMembers(members);
          console.log(members);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
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

function displayMembers(members) {
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
        userName + "</p><p class='member_point'>EcoPoint: " + userPoint + "</p><button class='remove_member btn btn-danger' onClick='removeMember(this) memberID='" + doc.id + "'>Remove</button></div>";
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  });

  document.getElementById("save_btn").addEventListener("click", saveChanges);

  function saveChanges() {
    var newName = document.getElementById("name").value;
    var newDesc = document.getElementById("desc").value;
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users")
        .doc(user.uid)
        .get().then(function (doc) {
          var groupID = doc.data().group;
          db.collection("groups").doc(groupID).update({
            "groupName": newName,
            "desc": newDesc
          })
        });
    });
  }
}