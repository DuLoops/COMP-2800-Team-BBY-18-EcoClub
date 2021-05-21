function createGrid() {
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("list").innerHTML = "";

        db.collection("users").doc(user.uid)
            .collection("user_challenges").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var id = doc.data().challengeID;
                    db.collection("eco-challenges").doc(id).get().then(function (doc) {
                        var name = doc.data().title;
                        var div = $("<div class='form-group'></div><br>");
                        var title = $("<p class='chalange_name'>" + name + "</p>");
                        var complete = $("<button class='button button5' onclick='CompleteChallenge(this)' challengeID='" + doc.id + "'>Complete</button>");
                        var Delete = $("<button class='button button5' onclick='DeleteChallenge(this)' challengeID='" + doc.id + "'>Delete</button>");
                        div.append(title);
                        div.append(complete);
                        div.append(Delete);
                        $("#list").append(div);
                    });
                })


            });

    });
    // I should change the example with leader


}

createGrid();

function DeleteChallenge(attr) {

    var challengeID = (attr.getAttribute("challengeID"));
    console.log(challengeID);
    if(challengeID == "Easter"){
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users").doc(user.uid).collection("user_challenges").where("challengeID", "==", challengeID)
                .get().then(function (snap) {
                    snap.forEach(async function (doc) {
                        console.log(doc.id);
                        await db.collection("users").doc(user.uid)
                            .collection("user_challenges").doc(doc.id).delete().then(() => {
                                console.log(user.uid);
                                console.log("Document successfully deleted!");
                            }).catch((error) => {
                                console.error("Error removing document: ", error);
                            });
                        location.replace("/private/html/easter.html");
                    })
                })
        })
    } else {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users").doc(user.uid).collection("user_challenges").where("challengeID", "==", challengeID)
                .get().then(function (snap) {
                    snap.forEach(async function (doc) {
                        console.log(doc.id);
                        await db.collection("users").doc(user.uid)
                            .collection("user_challenges").doc(doc.id).delete().then(() => {
                                console.log(user.uid);
                                console.log("Document successfully deleted!");
                            }).catch((error) => {
                                console.error("Error removing document: ", error);
                            });
                            window.location.reload();
                    })
                })
        })
    }



}

function CompleteChallenge(attr) {

    var challengeID = (attr.getAttribute("challengeID"));
    localStorage.setItem('challengeID', challengeID );
    console.log(challengeID);
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users").doc(user.uid).collection("user_challenges").where("challengeID", "==", challengeID)
                .get().then(function (snap) {
                    snap.forEach(async function (doc) {
                        console.log(doc.id);
                        await db.collection("users").doc(user.uid)
                            .collection("completedChallenge").add({
                                         isCompleted: true,
                                         challengeID: challengeID
                            });
                            location.replace("/private/html/challenges/eco_challenge_add_post.html");
                        
                    })
                })
        })
}
