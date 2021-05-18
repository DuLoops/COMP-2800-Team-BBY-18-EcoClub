
function getCode() {
    console.log("working");
    document.getElementById("Joinbutton").addEventListener('click', function () {
        console.log("working");
        var code = document.getElementById("code").value;
        console.log("working");
        console.log(code);
        var i = 0;

				//read cities collection from firestore, with query
        db.collection("groups")
            .where("groupCode", "==", code)
            .get()
            .then(function (snap) {
                snap.forEach(function(doc) {
                    console.log(doc.data());
                    i = 1;
                    //do something with the data
                    //go to challenge page
                    location.replace("/private/html/group/group_feed.html");
                })
            })

        if (i == 0) {
            document.getElementById("wrong").innerHTML = "Invalid Code.Try Again"
        }
    })
}
getCode();

