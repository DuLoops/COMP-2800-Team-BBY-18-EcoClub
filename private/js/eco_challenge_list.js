function createGrid() {
    db.collection("eco-challenges").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
            console.log(doc.data().desc);
            var div = $("<div class='jumbotron'>" + doc.data().desc + "</div>");
            var b1 = $("<a id='slot' type='button'></a><br>");

            var head = $("<div class='form-group'><p class='chalange_name'>" + doc.id + "</p><img src=" + '../img/star.png' + " class='img'><p class='eco_points'>Eco points</p></div>");
            b1.append(head);
            b1.append(div);
            b1.attr("href", "challenge_details.html").click(function () {
                localStorage.setItem("id", doc.id);
                localStorage.setItem("desc", doc.data().desc);
            });

            $("#list").append(b1);
        });
    });
}
createGrid();