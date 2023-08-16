// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3ZvtJgykA5zlFpKuhnsSq_Ay6HKZlNec",
    authDomain: "task-e2185.firebaseapp.com",
    projectId: "task-e2185",
    storageBucket: "task-e2185.appspot.com",
    messagingSenderId: "447773639548",
    appId: "1:447773639548:web:c917761b6d901682781af9",
    measurementId: "G-0D3K0WGC3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btn = document.getElementById("btn")

btn.addEventListener('click', () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Sign In Existing User
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User Log In:", user);
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    onAuthStateChanged(auth, (user) => {
                        if (user.emailVerified === true) {
                            const uid = user.uid;
                            console.log("Log In Page User UID: ", uid)
                            Swal.fire({
                                title: `Email`,
                                text: `Email Verified Successfully `,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                            function time() {
                                window.location.href = "./Web.html"
                            }
                            setInterval(time, 3000);
                        } else {
                            Swal.fire({
                                title: `Verify Account!`,
                                text: `Verification Email Sent to ${user.email}`,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    }
                    );
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/invalid-email" && errorMessage == "Firebase: Error (auth/invalid-email).") {
                Swal.fire({
                    title: `Email`,
                    text: `Please Enter Email `,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            else if (errorCode == "auth/user-not-found" && errorMessage == "Firebase: Error (auth/user-not-found).") {
                Swal.fire({
                    title: `User`,
                    text: `User Not Found `,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            else if (errorCode == "auth/missing-password" && errorMessage == "Firebase: Error (auth/missing-password).") {
                Swal.fire({
                    title: `Password`,
                    text: `Please Enter Password`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            else if (errorCode == "auth/wrong-password" && errorMessage == "Firebase: Error (auth/wrong-password).") {
                Swal.fire({
                    title: `Password`,
                    text: `Please Enter Right Password`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            else if (errorCode == "auth/network-request-failed" && errorMessage == "Firebase: Error (auth/network-request-failed).") {
                Swal.fire({
                    title: `Network Error`,
                    text: `Please Connect Network!`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            else {
                console.log("Log In Page User ErrorCode: ", errorCode);
                console.log("Log In Page User ErrorMessage: ", errorMessage);
            }
        });

})

const btns = document.getElementById("btns")

btns.addEventListener('click', () => {

    // Sign In Existing User
    Swal.fire({
        title: 'Enter Key To Access Admin Pannel',
        input: 'password',
        showCancelButton: true,
        confirmButtonText: 'Login!',
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value == "Online.JS" || result.value == "ONLINE.JS" || result.value == "online.js" || result.value == "Online.js") {

                Swal.fire({
                    icon: "success",
                    title: `Successfully Log In To Admin Pannel`,
                    text: "Admin Approved",
                    ConfirmButton: "Ok"
                }).then(
                    setTimeout(() => {
                        location.replace('./Admin.html')
                    }, 2000)
                )

            }
        }
        else {
            Swal.fire({
                icon: "error",
                title: `Wrong Key Entered`,
                text: "Admin Dis-Approved"
            }).then(()=>{
                location.reload()
            })
        }
    }).then(() => {
        const email = document.getElementById("email").value = "online.js@gmail.com";
        const password = document.getElementById("password").value = "123456";

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Log In Admin:", user);


                const uid = user.uid;
                console.log("Log In Page Admin UID: ", uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/invalid-email" && errorMessage == "Firebase: Error (auth/invalid-email).") {
                    Swal.fire({
                        title: `Email`,
                        text: `Please Enter Email `,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else if (errorCode == "auth/user-not-found" && errorMessage == "Firebase: Error (auth/user-not-found).") {
                    Swal.fire({
                        title: `Admin`,
                        text: `Admin Not Found `,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else if (errorCode == "auth/missing-password" && errorMessage == "Firebase: Error (auth/missing-password).") {
                    Swal.fire({
                        title: `Password`,
                        text: `Please Enter Password`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else if (errorCode == "auth/wrong-password" && errorMessage == "Firebase: Error (auth/wrong-password).") {
                    Swal.fire({
                        title: `Password`,
                        text: `Please Enter Right Password`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else if (errorCode == "auth/network-request-failed" && errorMessage == "Firebase: Error (auth/network-request-failed).") {
                    Swal.fire({
                        title: `Network Error`,
                        text: `Please Connect Network!`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else {
                    console.log("Log In Page Admin ErrorCode: ", errorCode);
                    console.log("Log In Page Admin ErrorMessage: ", errorMessage);
                }
            })
    })

})