// Displaying group info
//change "example" to the getGroupID function
function displayGroupInfo() {
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
            // document.getElementById("group_members").innerHTML = "";
            displayMembers(members);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      });

  });
}

displayGroupInfo();

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
      document.getElementById("group_members").innerHTML += "<div class='member'><span class='member_name'>" +
        userName + "</span><span class='member_point'> | EcoPoint: " + userPoint + "</span><button class='remove_member btn btn-danger' onClick='removeMember(this)' memberID='" + doc.id + "'>Remove</button></div>";
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  });
}

document.getElementById("save_btn").addEventListener("click", async function () {
  var newName = document.getElementById("name").value;
  var newDesc = document.getElementById("desc").value;
  await firebase.auth().onAuthStateChanged(async function (user) {
    await db.collection("users")
      .doc(user.uid)
      .get().then(function (doc) {
        var groupID = doc.data().group;
        db.collection("groups").doc(groupID).update({
          "groupName": newName,
          "desc": newDesc
        })
      }).then(function() {
        console.log("groupname changes");
        setTimeout(function () {
          location.replace("/private/html/group/group_info.html")
      }, 2000)
      })
  });
});




async function removeMember(attr) {
  var memberID = attr.getAttribute("memberID");
  await db.collection("users").doc(memberID).update({
    group: null
  });

  await firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get().then(function (doc) {
        var groupID = doc.data().group;
        db.collection("groups").doc(groupID).update({
          members: firebase.firestore.FieldValue.arrayRemove(memberID)
        });
        console.log(memberID);
      });
  });

  displayGroupInfo();
}