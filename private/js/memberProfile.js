firebase.auth().onAuthStateChanged(function (somebody) {
    if (somebody) {
        var posterId = (localStorage.getItem('posterID'));
        console.log(posterId);
        db.collection("users").doc(posterId).get().then(function (doc) {
                var name = doc.data().name;
                var points = doc.data().ecopoint;
                var email = doc.data().email;
                var groupID = doc.data().group;
                var bio = doc.data().bio;
                document.getElementById("heading").innerHTML = name;
                $(".name-user").html(name);
                $(".bio-user").text("Bio: " + bio);
                $(".points-user").html(points);
                $(".email-user").html(email);
                var picUrl = doc.data().profilePic; //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
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

            })
        }
})

