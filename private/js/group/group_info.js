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
    document.getElementById("group_leader").innerHTML = "<img id='profilePic' src = '" + picUrl + "'><span id='leader' onclick='displayProfile(this)' listID='"+ doc.id +"' > " + doc.data().name + "</span>";
    var picUrl = doc.data().profilePic;
    $("#profilePic").attr("src", picUrl);
  })
  members.forEach(member => {
    var user_member = db.collection("users").doc(member);
    // console.log(member);
    user_member.get().then((doc) => {
      if (doc.exists) {
        var userName = doc.data().name;
        var userPoint = doc.data().ecopoint;
        var pic = doc.data().profilePic;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      document.getElementById("group_members").innerHTML += "<div class='member'><img id='profilePic' src= '" + pic + "'><span class='member_name' onclick='displayProfile(this)' listID='"+ member +"'>" +
        userName + "</span><span class='member_point'> | EcoPoints: " + userPoint + "</span></div><hr>";
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  });

}

function displayProfile(attr){

  var listID = (attr.getAttribute("listID"));
  localStorage.setItem('listID', listID );
  console.log(listID);
  // var leaderID = (attr.getAttribute("leaderID"));
  // localStorage.setItem('leaderID', leaderID );
  firebase.auth().onAuthStateChanged(function (user){
    if(listID == user.uid){
      location.replace("/private/html/profile/profile-main.html");
    } else{
      location.replace("/private/html/profile/listProfile.html");
    }
  })    
  
}