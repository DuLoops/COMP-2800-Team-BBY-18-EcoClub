async function myFunction() {
    var group_name = document.getElementById("group_name").value;
    var group_description = document.getElementById("group_description").value;
    var res;
    await returnID().then(function (result) {
        res = result;
    });

    const docRef = db.collection("groups").doc();
    console.log(docRef.id);
    docRef.set({
        groupName: group_name,
        desc: group_description,
        leader: res,
        members: [],
    });

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