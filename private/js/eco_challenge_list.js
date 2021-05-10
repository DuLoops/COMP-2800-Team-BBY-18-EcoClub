function createGrid(restaurant) {
    db.collection("eco-challenges").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
        });
    });
}
createGrid("Whitespot");