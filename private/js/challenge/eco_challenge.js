function createGrid() {
    $("#btn_completed").removeClass("btn-success");
    $("#btn_completed").addClass("btn-secondary");
    $("#btn_progress").addClass("btn-success");
    $("#btn_progress").removeClass("btn-secondary");
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("list").innerHTML = "";
        db.collection("users").doc(user.uid)
            .collection("user_challenges").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var id = doc.data().challengeID;
                    db.collection("eco-challenges").doc(id).get().then(function (doc) {
                        var name = doc.data().title;
                        var desc = doc.data().desc;
                        document.getElementById("list").innerHTML += "<div class='accordion accordion-flush' id='accordionFlushExample'><div class='accordion-item'>" 
                        + " <h2 class='accordion-header' id='flush-headingOne'> <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapseOne' aria-expanded='false' aria-controls='flush-collapseOne'>" 
                        + name + "</button></h2><div id='flush-collapseOne' class='accordion-collapse collapse' aria-labelledby='flush-headingOne' data-bs-parent='#accordionFlushExample'>" 
                        + "<div class=' accordion-body'>" + desc + "<br><br><button class='btn button button5' onclick='CompleteChallenge(this)' challengeID='" + doc.id + "'>Complete</button><button class='btn button button5' onclick='DeleteChallenge(this)' challengeID='" + doc.id + "'>Delete</button></div></div></div>"
                    });
                })

            });
            document.getElementById("list").innerHTML += "</div>";
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid).collection("user_challenges").get()
        .then((doc) => {
            if (doc.empty) {
                console.log("empty");
            } else {
                console.log("not empty");
                createGrid();
            }
        })

});

function Completed() {
    $("#btn_progress").removeClass("btn-success");
    $("#btn_progress").addClass("btn-secondary");
    $("#btn_completed").addClass("btn-success");
    $("#btn_completed").removeClass("btn-secondary");
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("list").innerHTML = "";
        db.collection("users").doc(user.uid)
            .collection("completedChallenge").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var id = doc.data().challengeID;
                    var cDate = doc.data().date;
                    db.collection("eco-challenges").doc(id).get().then(function (doc) {
                        var name = doc.data().title;
                        var desc = doc.data().desc;
                        
                        document.getElementById("list").innerHTML += "<div class='accordion accordion-flush' id='accordionFlushExample'><div class='accordion-item' >" 
                        + " <h2 class='accordion-header' id='flush-headingOne'> <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapseOne' aria-expanded='false' aria-controls='flush-collapseOne'>" 
                        + name + "</button></h2><div id='flush-collapseOne' class='accordion-collapse collapse' aria-labelledby='flush-headingOne' data-bs-parent='#accordionFlushExample'>" 
                        + "<div class=' accordion-body'>" + desc + "<p>Date: "+cDate+"</p></div></div></div>"
                    });
                })
            });
            document.getElementById("list").innerHTML += "</div>";
    });
}

function DeleteChallenge(attr) {
    var challengeID = (attr.getAttribute("challengeID"));
    console.log(challengeID);
    if (challengeID == "Easter") {
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

async function CompleteChallenge(attr) {
    var challengeID = (attr.getAttribute("challengeID"));
    localStorage.setItem('challengeID', challengeID);
    console.log(challengeID);
    await db.collection("eco-challenges").doc(challengeID).get().then(function(doc){
        var challengeTitle = doc.data().title
        localStorage.setItem('challengeTitle', challengeTitle);
    })
    location.replace("/private/html/challenges/eco_challenge_add_post.html");
}