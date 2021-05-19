function sayName() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                // Read
                .get()
                .then(function (doc) {
                    // Extract the first name of the user
                    var name = doc.data().name;
                    var points = doc.data().ecopoint;
                    var email = doc.data().email;
                    var picUrl = doc.data().profilePic; 
                    // var groupId = doc.data().group;
                    console.log(picUrl);
                    // $("#image").append("<img src='" + picUrl + "'>")
                    if (name) {
                        $(".name-user").html(name);
                        $(".points-user").html(points);
                        $(".email-user").html(email);
                    } else {
                        $(".name-user").html("EcoClub User");
                    }
                    db.collection("groups").doc("example").get()
                .then(function(doc){
                    var teamName = doc.data().groupName;
                    var teamDesc = doc.data().desc
                    if (name) {
                        $("#teamName").html(teamName);
                        $("#teamDesc").html(teamDesc);
                    } else {
                        $("#teamName").html("Group Description");
                        $("#teamDesc").html("Team Description");
                    }
                })
                });
        }
    });
}
sayName();

// function getChallenges() {
//     document.getElementById("challenges-div").innerHTML = "";
  
//     db.collection("eco-challenges")
//       .get()
//       .then(function (snap) {
//         snap.forEach(function (doc) {
//           var desc = doc.data().desc;
//           var ecopoint = doc.data().ecopoint;
//           var title = doc.data().title;
//           document.getElementById("challenges-div").innerHTML += "<div class='card border-dark mb-3'><div class='card-header bg-transparent border-dark'>" + title + "</div><div class='card-body text-success'><p class='card-text'>" + desc + "</p></div><div class='card-footer bg-transparent border-dark'>EcoPoints: " + ecopoint + "</div></div>" ;
//         });
//       });
//   }
//   getChallenges();

document.getElementById("leaveTeam").addEventListener("click", leaveTeam);

function leaveTeam(){
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users").doc("somebody.uid").update({
                group : ""
            })
        } else {
            console.log("Invlaid");
        }
    })
}

  
  