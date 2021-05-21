function displayDetails() {
    var docID = localStorage.getItem("docID");

    db.collection("eco-challenges").doc(docID).get().then((doc) => {
        var title = doc.data().title;
        console.log(title);
        var desc = doc.data().desc;
        var ecopoint = doc.data().ecopoint;
        document.getElementById("chalange_name_feild").innerHTML = title;
        document.getElementById("comment").innerHTML = desc;
        document.getElementById("eco_point_p").innerHTML = ecopoint + " eco-point";
    });
}
displayDetails();

async function take_challenge() {
    var docID = localStorage.getItem("docID");
    var title;
    var desc;
    var ecopoint;
    var leader;
    await firebase.auth().onAuthStateChanged(
        function (user) {
            console.log(user.uid);
            leader = user.uid;

        });
    await db.collection("eco-challenges").doc(docID).get().then((doc) => {
        title = doc.data().title;
        desc = doc.data().desc;
        ecopoint = doc.data().ecopoint;
    });
    await db.collection("users").doc(leader).collection("user_challenges").doc().set({
        Title: title,
        Desc: desc,
        Ecopoints: ecopoint
    });







    window.location.href = "/private/html/challenges/eco_challenge.html";
}