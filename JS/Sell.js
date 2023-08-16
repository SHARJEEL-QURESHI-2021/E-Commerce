document.getElementById('postBtn').addEventListener('click', () => {
    let image = document.getElementById('img1').value;
    let title = document.getElementById('productTitle').value;
    let category = document.getElementById('productCategory').value;
    let description = document.getElementById('productDes').value;
    let price = document.getElementById('productPrice').value;
    let rating = document.getElementById('productRating').value;
    if (image == "" && title == "" && category == "" && description == "" && price == "" && rating == "") {
        Swal.fire({
            title: `Input`,
            text: `Please Filled Input First `,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {

        var products = [];

        let obj = {
            Image: image,
            Title: title,
            Category: category,
            Price: price,
            Rating: rating,
            Description: description,
        };

        products = JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : []
        products.push(obj)
        localStorage.setItem("products", JSON.stringify(products))
        window.location.href = "./Web.html";
    }
});

// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log("User Checking UID: ", uid);
    }
    else {
        Swal.fire({
            title: `Account`,
            text: `First Create An Account`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        function wrong() {
            window.location.href = "./SignUp.html"
        }
        setInterval(wrong, 3000);
    }
});