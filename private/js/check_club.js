firebase.auth().onAuthStateChanged(function (user) {
  db.collection("users")
  .doc(user.uid).get().then(function (doc) {
    if (doc.data().group == null) {
      alert("You are no longer a valid member of your club");
      location.replace("/private/html/main.html");
    }
  })
})