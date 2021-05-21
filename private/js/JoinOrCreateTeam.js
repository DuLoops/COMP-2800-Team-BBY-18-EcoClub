function getCode() {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("working");
        document.getElementById("Joinbutton").addEventListener('click', async function () {
            console.log("working");
            var code = document.getElementById("code").value;
            console.log("working");
            console.log(code);
            var i = 0;
    
            //read cities collection from firestore, with query
             await db.collection("groups")
                .where("groupCode", "==", code)
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        console.log(doc.data());
                        console.log(doc.id);
                        i = 1;
                        //do something with the data
                        //go to challenge page
                        
                         const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    
                        // members : arrayUnion(user.uid)
                          db.collection("groups").doc(doc.id).update({
                             members: arrayUnion(user.uid)
                           }).then(function() {
                             console.log("Frank food updated");
                       });
                        db.collection("users").doc(user.uid).update({
                            "group" : doc.id
                        })
                        setTimeout(function() {
                            location.replace("/private/html/group/group_feed.html")},3000);
                    })
                })
    
            if (i == 0) {
                document.getElementById("wrong").innerHTML = "Invalid Code.Try Again"
            }
        })
    })
   
}
getCode();