async function myFunction() {
    var group_name = document.getElementById("group_name").value;
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

    docRef.set({
        groupName: group_name,
        groupCode: groupCode,
        desc: group_description,
        leader: leader,
        members: [],
    });


    window.location.href= "/private/html/group/group_feed.html";

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