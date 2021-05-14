
function myFunction() {
    var group_name = document.getElementById("group_name").value;
    var group_description = document.getElementById("group_description").value;
    db.collection("groups").doc(group_name).set({
        desc: group_description
    })
}