
function getCode() {
    console.log("working");
    document.getElementById("Joinbutton").addEventListener('click', function () {
        console.log("working");
        var code = document.getElementById("code").value;
        console.log("working");
        console.log(code);

				//read cities collection from firestore, with query
        db.collection("groups")
            .where("groupCode", "==", code)
            .get()
            .then(function (snap) {
                snap.forEach(function(doc) {
                    console.log(doc.data());
                    //do something with the data
                })
            })
    })
}
getCode();

