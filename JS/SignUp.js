// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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
const db = getFirestore(app);

const btn = document.getElementById("btn")

btn.addEventListener('click', async () => {
    const name = document.getElementById("nam").value;
    const fName = document.getElementById("fName").value;
    const cName = document.getElementById("cName").value;
    const num = document.getElementById("num").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (name == "" && fName == "" && cName == "" && num == "" && email == "" && password == "") {
        Swal.fire({
            title: `Input`,
            text: `Please Filled Input First `,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    // FireStore
    else {
        try {
            const docRef = await addDoc(collection(db, "Users"), {
                Name: name,
                FatherName: fName,
                CountryName: cName,
                Phone: num,
                Email: email,
            });
            console.log("Users Collection ID: ", docRef.id);
        } catch (e) {
            console.error("Users Collection Error --> ", e);
        }

        const onSnapshot = await getDocs(collection(db, "Users"));
        onSnapshot.forEach((doc) => {
            console.log(`Users Collection --> ${doc.id} => ${JSON.stringify(doc.data())}`);
        });

        // Sign In
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Sign In User:", user);
                Swal.fire({
                    title: `Account`,
                    text: `Account Created Successfully`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                function time() {
                    window.location.href = "./LogIn.html"
                }
                setInterval(time, 3000);
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
                else if (errorCode == "auth/missing-email" && errorMessage == "Firebase: Error (auth/missing-email).") {
                    Swal.fire({
                        title: `Email`,
                        text: `Please Enter Email`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else if (errorCode == "auth/email-already-in-use" && errorMessage == "Firebase: Error (auth/email-already-in-use).") {
                    function any() {
                        Swal.fire({
                            title: `Email`,
                            text: `Email Already In Use And Redirect To LogIn Page`,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                    setInterval(any, 1000)
                    function anker() {
                        window.location.href = "./Login.html"
                    }
                    setInterval(anker, 5000)
                }
                else if (errorCode == "auth/missing-password" && errorMessage == "Firebase: Error (auth/missing-password).") {
                    Swal.fire({
                        title: `Password`,
                        text: `Please Enter Password`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else if (errorCode == "auth/weak-password" && errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                    Swal.fire({
                        title: `Password`,
                        text: ` Password Should Be At Least 6 Characters`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else {
                    console.log("Sign Up Page User ErrorCode: ", errorCode);
                    console.log("Sign Up Page User ErrorMessage: ", errorMessage);
                }
            });
    }
})