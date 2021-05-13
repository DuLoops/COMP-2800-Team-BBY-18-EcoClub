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
                    console.log(picUrl);
                    // $("#image").append("<img src='" + picUrl + "'>")

                    if (name) {
                        $(".name-user").html(name);
                        $(".points-user").html(points);
                        $(".email-user").html(email);
                    } else {
                        $(".name-user").html("EcoClub User");
                    }
                });
        }
    });
}
sayName();

function getChallenges() {
    document.getElementById("challenges-div").innerHTML = "";
  
    db.collection("eco-challenges")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          var desc = doc.data().desc;
          var ecopoint = doc.data().ecopoint;
          var title = doc.data().title;
          document.getElementById("challenges-div").innerHTML += "<div class='card border-dark mb-3'><div class='card-header bg-transparent border-dark'>" + title + "</div><div class='card-body text-success'><p class='card-text'>" + desc + "</p></div><div class='card-footer bg-transparent border-dark'>EcoPoints: " + ecopoint + "</div></div>" ;
        });
      });
  }
  getChallenges();
  
  