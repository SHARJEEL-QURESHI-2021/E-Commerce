import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, deleteDoc, getDocs, collection, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

const onSnapshot = await getDocs(collection(db, "Users"));
    onSnapshot.forEach((doc) => {
        console.log(`Users Collection --> ${doc.id} => ${JSON.stringify(doc.data())}`);
        document.getElementById('showName').innerHTML = doc.data().Name.toUpperCase()
        document.getElementById('showFatherName').innerHTML = doc.data().FatherName.toUpperCase()
        document.getElementById('showNumber').innerHTML = 
        `<i class="fa-solid fa-mobile" id="mobile"></i>${doc.data().Phone}`
    })

// window.del=async(id)=> {
//     console.log(id);
//     await deleteDoc(doc(db, "Users", id));
//     Swal.fire({
//         title: `Delete User`,
//         text: `Delete User Successfully `,
//         icon: 'success',
//         confirmButtonText: 'OK'
//     });     
// }

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User Checking UID: ",uid);
    } 
    else {
        Swal.fire({
            title: `Account`,
            text: `First Create An Account`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        function wrong(){
            window.location.href = "./SignUp.html"
        }
        setInterval(wrong, 3000);
    }
  });

const cut = document.getElementById("cut")
cut.addEventListener('click', () => {
    window.location.href = "./Web.html";
})