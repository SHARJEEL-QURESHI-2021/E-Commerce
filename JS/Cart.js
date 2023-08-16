import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, query, collection, deleteDoc, onSnapshot,doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

// document.getElementById("see").innerHTML += `<h1 id="nothing">No Items Here!</h1>`
const q = query(collection(db, "CartProducts"));
onSnapshot(q, (onSnapshot) => {
    onSnapshot.forEach((doc) => {
        document.getElementById("nothing").style.display = "none"
        console.log(`CartProducts Collection-->${doc.id} => ${JSON.stringify(doc.data())}`);
        document.getElementById("see").innerHTML += `
        <li>
        <div class="aaa">
    <div>
    <img src="${doc.data().Imageurl}">
    <p>${doc.data().Title.length > 30 ? `${doc.data().Title.slice(0, 30)}...` : doc.data().Title} </p>
    </div>
    <div class="aa">
    <p class="p">$${doc.data().Price}</p>
    <i class="fa fa-trash" onclick="delet('${doc.id}')" id="del"></i>
    </div>
    </div>
    <p class="q">${doc.data().Quantity}</p>
    </li>
    `
    document.getElementById('checkOut').style.display = "flex"
    })
})

async function delet(id) {
    await deleteDoc(doc(db, "CartProducts", id));
    window.location.reload()
}
window.delet = delet 

document.getElementById('checkOut').addEventListener('click', ()=>{
    window.location.href = "./Checkout.html"
})

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

