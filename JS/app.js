// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

// Initialize Firebase
const db = getFirestore(app);

const onSnapshot = await getDocs(collection(db, "Users"));
onSnapshot.forEach((doc) => {
    console.log(`Users Collection--> ${doc.id} => ${JSON.stringify(doc.data())}`);
    document.getElementById('userName').value = `${doc.data().Name}`.toUpperCase()
})

const logout = document.getElementById("logout")

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: `Log Out`,
            text: `Log Out Successfully `,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        function wrongs() {
            window.location.href = "./SignUp.html";
        }
        setInterval(wrongs, 3000);
    }).catch((error) => {
        console.log("LogOut Error -->",error)
    });
});

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
        setInterval(wrong, 2000);
    }
});

// Card Code

fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then(function (data) {
        for (var i = 0; i < data.products.length; i++) {
            document.getElementById("show").innerHTML += `<div id="card" class="cards col-md-3 mb-2">
                        <img src=${data.products[i].images[0]} alt="Products" id="image">
                            <h3 id="title">${data.products[i].title}</h3>
                            <p id="category">${data.products[i].category}</p>
                            <p id="des">${data.products[i].description} </p>
                            <h5 id="price"><i class="fa-solid fa-dollar-sign" id="dollar"></i> ${data.products[i].price}</h5>
                            <span id="rating">${data.products[i].rating} <i class="fa-solid fa-star" id="star"></i></span>
                            <button id="butn" onclick='apiDetails("${data.products[i].images[0]}" , "${data.products[i].title}"
                             , "${data.products[i].category}" , "${data.products[i].description}" , "${data.products[i].price}"
                             , "${data.products[i].rating}")'>Add To <i class="fa-solid fa-cart-shopping" id="cart"></i></button>
                    </div><br>`
        }
    })

function apiDetails(images, title, category, description, price, rating) {
    var apiDetail = {
        Image: images,
        Title: title,
        Category: category,
        Description: description,
        Price: price,
        Rating: rating,
        Quantity: "1",
    }

    localStorage.setItem("apiDetail", JSON.stringify(apiDetail))
    window.location.href = './Detail.html'
}
window.apiDetails = apiDetails


function searching() {
    let products = JSON.parse(localStorage.getItem("products"))
    var inp = document.getElementById('inp').value.toLowerCase();
    var cards = document.getElementsByClassName('cards');
    for (var i = 0; i < cards.length; i++) {
        var title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        var price = cards[i].getElementsByTagName('h5')[0].innerText.toLowerCase();
        var titles = products[0].Title;
        var prices = products[0].Price;
        if (title.includes(inp) || price.includes(inp) || titles.includes(inp) || prices.includes(inp)) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}
document.getElementById('inp').addEventListener('input', searching);

var product = JSON.parse(localStorage.getItem("products"))

product.map((math, index) => {
    document.getElementById("display").innerHTML += `    
        
        <div id="card" class="cards col-md-3 mb-2">
                        <img src=${math.Image} alt="Products" id="image">
                            <h3 id="title">${math.Title}</h3>
                            <p id="category">${math.Category}</p>
                            <p id="des">${math.Description} </p>
                            <h5 id="price"><i class="fa-solid fa-dollar-sign" id="dollar"></i> ${math.Price}</h5>
                            <span id="rating">${math.Rating} <i class="fa-solid fa-star" id="star"></i></span><br />
                            <button id="butn" onclick="detail(${index})">Add To <i class="fa-solid fa-cart-shopping" id="cart"></i></button>
                    </div><br>
            `
})

function detail(math) {
    localStorage.setItem("cartImage", product[math].Image)
    localStorage.setItem("cartTitle", product[math].Title)
    localStorage.setItem("cartCategory", product[math].Category)
    localStorage.setItem("cartDescription", product[math].Description)
    localStorage.setItem("cartPrice", product[math].Price)
    localStorage.setItem("cartRating", product[math].Rating)
    window.location.href = "./Details.html"
}

window.detail = detail