function createGrid() {

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            .collection("user_challenges").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id);
                    // console.log(doc.data().isCompleted);
                    // var div = $("<div class='jumbotron'>" + doc.data().desc + "</div>");
                    // var b1 = $("<a id='slot' type='button'></a><br>");


                    var div = $("<div class='form-group'></div><br>");
                    var title = $("<p class='chalange_name'>" + doc.data().Title + "></p>");
                    var complete = $("<button class='button button5'>Complete</button>");
                    var Delete = $("<button class='button button5'>Delete</button>");

                    complete.click(async function () {
                        console.log(doc.id);
                        await db.collection("users").doc(user.uid).collection("user_challenges").doc(doc.id).update({
                            isCompleted: true
                        });

                        localStorage.setItem("challenge_title", doc.id);
                        window.location.href = "/private/html/challenges/eco_challenge_add_post.html";

                    });
                    Delete.click(async function () {
                        await db.collection("users").doc(user.uid)
                            .collection("user_challenges").doc(doc.id).delete().then(() => {
                                console.log("Document successfully deleted!");
                            }).catch((error) => {
                                console.error("Error removing document: ", error);
                            });
                        window.location.reload();

                    });
                    div.append(title);
                    div.append(complete);
                    div.append(Delete);
                    $("#list").append(div);
                });
            });

    });
    // I should change the example with leader


}
createGrid();