async function myFunction() {
    var group_name = document.getElementById("group_name").value;
    var i = 0;
    await db.collection("groups")
        .where("groupName", "==", group_name)
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                document.getElementById("error").innerHTML = "Club name already exists!"
                i = 1;
            })
        })
    console.log(i);
    if (i == 0) {
        var group_description = document.getElementById("group_description").value;
        var leader;
        await returnID().then(function (result) {
            leader = result;
        });

        const docRef = db.collection("groups").doc();

        var docID = docRef.id;
        var str1 = docID.substr(0, 5);
        var length;
        await db.collection("groups").get().then(function (querySnapshot) {
            length = querySnapshot.size;
        });
        var groupCode = str1.concat(length.toString());

        await docRef.set({
            groupName: group_name,
            groupCode: groupCode,
            desc: group_description,
            leader: leader,
            members: [],
        });

        firebase.auth().onAuthStateChanged(async function (user) {
            await db.collection("users").doc(user.uid).update({
                group: docID
            })
        })


        window.location.href = "/private/html/challenges/eco_challenge.html";

    }

    // firebase.auth().onAuthStateChanged(function (user) {
    //     db.collection("groups").doc(docRef.id).add();
    // });
}

// function createCollection() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         db.collection("groups").doc(user.uid).collection("posts").add({
//             "comment": user.uid,
//         });
//     });
// }

async function returnID() {
    var leader;
    await firebase.auth().onAuthStateChanged(function (user) {
        leader = (user.uid);
    });
    return leader;
}