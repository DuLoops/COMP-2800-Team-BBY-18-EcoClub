function createGrid() {
    db.collection("eco-challenges").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var title = doc.data().title;
            var desc = doc.data().desc;
            desc = desc.substring(0, 40) + "... ";
            var ecopoint = doc.data().ecopoint;
            
            var item = $("<a><div class='item'><h4 class='title'>" + title + "</h4><p class='desc'>" + desc + "</p><p class='ecopoint'>EcoPoint: " + ecopoint + "</p><button class='btn btn-success'>See Details</button></div></a>");
            item.attr("href", "challenge_details.html").click(function () {
                localStorage.setItem("docID", doc.id);
                // console.log(title + " clicked");
            }); 

            $("#challenge_list").append(item);
        });
    });
}
createGrid();

// function createGrid() {
//     db.collection("eco-challenges").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // console.log(doc.id);
//             // console.log(doc.data().desc);
//             var title = doc.data().title;
//             var desc = doc.data().desc;
//             var ecopoint = doc.data().point;
//             var div = $("<div class=>" + doc.data().desc + "</div>");
//             var b1 = $("<a id='slot' type='button'></a><br>");

//             var head = $("<div class='form-group'><p class='chalange_name'>" + doc.data().title + "</p></div>");
//             b1.append(head);
//             b1.append(div);
//             b1.attr("href", "challenge_details.html").click(function () {
//                 localStorage.setItem("docID", doc.id);
//                 localStorage.setItem("desc", doc.data().desc);
//             });

//             $("#list").append(b1);
//         });
//     });
// }
// createGrid();