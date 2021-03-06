/**************** Initialize the FirebaseUI Widget using Firebase. ****************/
var ui = new firebaseui.auth.AuthUI(firebase.auth());


// $("#googleSignIn").click(function () {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth()
//         .signInWithPopup(provider)
//         .then((result) => {
//             /** @type {firebase.auth.OAuthCredential} */
//             var credential = result.credential;

//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             db.collection("users").doc(user.uid).set({ //write to firestore
//                     name: user.displayName, //"users" collection
//                     email: user.email, //with authenticated user's ID (user.uid)
//                     ecopoint: 0,
//                     profilePic: null,
//                     bio: null,
//                     group: null


//                 })
//                 .then(function () {
//                     console.log("New user added to firestore");
//                     window.location.assign(
//                         "/private/html/main.html"); //re-direct to main.html after signup
//                 })
//                 .catch(function (error) {
//                     console.log("Error adding new user: " + error);
//                 });
//             // ...
//         }).catch((error) => {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // The email of the user's account used.
//             var email = error.email;
//             // The firebase.auth.AuthCredential type that was used.
//             var credential = error.credential;
//             // ...
//         });
// });

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write. 
            //------------------------------------------------------------------------------------------
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) { //if new user
                db.collection("users").doc(user.uid).set({ //write to firestore
                        name: user.displayName, //"users" collection
                        email: user.email, //with authenticated user's ID (user.uid)
                        ecopoint: 0,
                        profilePic: null,
                        bio: null,
                        group: null
                    })
                    .then(function () {
                        console.log("New user added to firestore");
                        window.location.assign(
                            "/private/html/main.html"); //re-direct to main.html after signup
                    })
                    .catch(function (error) {
                        console.log("Error adding new user: " + error);
                    });


            } else {
                return true;
            }
            return false;
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/private/html/main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);