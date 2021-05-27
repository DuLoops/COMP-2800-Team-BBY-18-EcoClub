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
                    var groupID = doc.data().group;
                    var bio = doc.data().bio;
                    // var groupId = doc.data().group;
                    console.log(picUrl);
                    console.log(groupID);
                    // $("#image").append("<img src='" + picUrl + "'>")
                    if (name) {
                        $(".name-user").html(name);
                        $(".bio-user").text(bio);
                        $(".points-user").html(points);
                        $(".email-user").html(email);

                    } else {
                        $(".name-user").html("EcoClub User");
                    }
                    db.collection("groups").doc(groupID).get()
                        .then(function (doc) {
                            var teamName = doc.data().groupName;
                            var teamDesc = doc.data().desc
                            if (teamName) {
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
document.getElementById("callAlert").addEventListener("click", alert);

function leaveTeam() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {

            db.collection("users")
                .doc(somebody.uid)
                // Read
                .get()
                .then(function (doc) {
                    var groupID = doc.data().group;
                    console.log(groupID);
                    var GroupRef = db.collection("groups").doc(groupID);
                    GroupRef.get().then(function (doc) {
                        var leaderId = doc.data().leader;
                        if (leaderId == somebody.uid) {

                            console.log("leader");
                            db.collection("users").get().then(function (snap) {
                                snap.forEach(function (doc) {
                                    var userID = doc.id;
                                    var groupId = doc.data().group;
                                    if (groupId == groupID) {
                                        console.log("found");
                                        console.log(userID);
                                        db.collection("users").doc(userID).update({
                                            group: null
                                        })
                                    }
                                })
                            })

                            db.collection("groups").doc(groupID).delete().then(() => {
                                 console.log("Document successfully deleted!");
                            }).catch((error) => {
                                 console.error("Error removing document: ", error);
                         });

                        } else {
                            console.log("member");
                            // Atomically remove a region from the "regions" array field.
                            GroupRef.update({
                                members: firebase.firestore.FieldValue.arrayRemove(somebody.uid)
                            });
                            db.collection("users").doc(somebody.uid).update({
                                group: null
                            })
                            setTimeout(function () {
                                location.replace("/private/html/main.html")
                            }, 2000)

                        }
                    })

                })
        } else {
            console.log("Invlaid");
        }
    })
}


function alert() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {

            db.collection("users")
                .doc(somebody.uid)
                // Read
                .get()
                .then(function (doc) {
                    var groupID = doc.data().group;
                    console.log(groupID);
                    var GroupRef = db.collection("groups").doc(groupID);
                    GroupRef.get().then(function (doc) {
                        var leaderId = doc.data().leader;
                        if (leaderId == somebody.uid) {
                            console.log("leader");
                            document.getElementById("alert-text").innerHTML = "This would delete the club.Are you sure you want to leave the club?";
                        } else {
                            console.log("member");
                            document.getElementById("alert-text").innerHTML = "Are you sure you want to leave the club?";
                        }
                    })
                })
        } else {
            console.log("Invlaid");
        }
    })
}

function displayUserProfilePic() {
    firebase.auth().onAuthStateChanged(function (user) { //get user object
        db.collection("users").doc(user.uid) //use user's uid
            .get() //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic; //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();

function leaveClub(){
    setTimeout(function () {
        location.replace("/private/html/main.html")
    }, 2000)
}