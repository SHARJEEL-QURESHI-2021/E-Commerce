import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, query, collection, deleteDoc, onSnapshot, doc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3ZvtJgykA5zlFpKuhnsSq_Ay6HKZlNec",
    authDomain: "task-e2185.firebaseapp.com",
    projectId: "task-e2185",
    storageBucket: "task-e2185.appspot.com",
    messagingSenderId: "447773639548",
    appId: "1:447773639548:web:c917761b6d901682781af9",
    measurementId: "G-0D3K0WGC3G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

var totalBill;

// ... (Your calculateTotalBill function)
function calculateTotalBill(itemPrice, itemQuantity) {
    if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return itemPrice * itemQuantity;
    }
    return 0;
}

// Initialize listeners once
function initializeListeners() {
    const q = query(collection(db, "CartProducts"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
        // Clear previous cart items
        // document.getElementById("see").innerHTML = "";

        totalBill = 0; // Reset total bill

        snapshot.forEach(async (doc) => {
            
            // Update cart display
            document.getElementById("nothing").style.display = "none";
            
            // Display individual cart item
            document.getElementById("see").innerHTML += `
            <li>
            <div class="aaa">
            <div>
            <img src="${doc.data().Imageurl}">
            <p>${doc.data().Title.length > 30 ? `${doc.data().Title.slice(0, 30)}...` : doc.data().Title} </p>
            </div>
            <div class="aa">
            <p class="p">$${doc.data().Price}</p>
            </div>
            </div>
            <p class="q">X ${doc.data().Quantity}</p>
            </li>
            `;

            // ... (Your cart item display and calculations)
            const itemPrice = parseFloat(doc.data().Price);
            const itemQuantity = parseFloat(doc.data().Quantity);

            const itemTotal = calculateTotalBill(itemPrice, itemQuantity);
            totalBill += itemTotal;

            // ... (Add item to "AddToCart" collection)
            try {
                const addToCartDocRef = await addDoc(collection(db, "AddToCart"), {
                    ProductUrl: doc.data().Imageurl,
                    ProductTitle: doc.data().Title,
                    ProductPrice: itemPrice,
                    ProductQuantity: itemQuantity,
                    ProductTotalBill: itemTotal,
                });
                console.log("Item Added To AddToCart Collection With ID: ", addToCartDocRef.id);
            } catch (e) {
                console.error("AddToCart Collection Error: ", e);
            }

            // ... (Updating user information)
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                document.getElementById('nam').innerHTML = `${doc.data().Name}`
                document.getElementById('fName').innerHTML = `${doc.data().FatherName}`
                document.getElementById('cName').innerHTML = `${doc.data().CountryName}`
                document.getElementById('num').innerHTML = `${doc.data().Phone}`
                document.getElementById('email').innerHTML = `${doc.data().Email}`
                // ...
            });

            updateTotalBillDisplay();
        });
    });

    // Optional: Unsubscribe from the snapshot listener if needed
    // unsubscribe();
}

// Call the initializeListeners function to start listening for changes
initializeListeners();

async function updateTotalBillDisplay() {
    // ... (Your total bill display and updating logic)
    if (!isNaN(totalBill)) {
        try {
            // Update the total bill display on the webpage
            document.getElementById("bill").innerHTML = `$ ${totalBill.toFixed(2)}`;
        } catch (e) {
            console.error("Total Bill Display Error: ", e);
        }
    } else {
        console.log("Calculating Total Bill Error");
        document.getElementById("bill").innerHTML = " Calculating Total Bill Error";
    }
}

// Handle the "Buy" button click event
document.getElementById('btn').addEventListener('click', async () => {
    // Display success message
    Swal.fire({
        title: `Purchased !`,
        text: `Order Sent To Admin, Wait for its approval | Transaction Amount Deducted ${document.getElementById("bill").innerHTML}`,
        icon: 'success',
        confirmButtonText: 'OK'
    });

    // Wait for a while and then redirect
    setTimeout(() => {
        location.replace('./Web.html');
        localStorage.removeItem('products');
        localStorage.removeItem('apiDetail');
        localStorage.removeItem('cartImage');
        localStorage.removeItem('cartTitle');
        localStorage.removeItem('cartCategory');
        localStorage.removeItem('cartDescription');
        localStorage.removeItem('cartPrice');
        localStorage.removeItem('cartRating');
    }, 2000);

    // Function to delete all documents in a collection
    async function deleteAllDocumentsInCollection(collectionName) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        console.log("All Documents In CartProducts Collection Deleted.");
    }

    // Call the function to update total bill display on the webpage
    updateTotalBillDisplay();

    // Call the function to add UserTotalProductBill to "AddToCart" collection
    await addTotalBillToCollection();

    // Call the function to delete all documents in the "CartProducts" collection
    deleteAllDocumentsInCollection("CartProducts");
});

// Function to add UserTotalProductBill to "AddToCart" collection
async function addTotalBillToCollection() {
    if (!isNaN(totalBill)) {
        try {
            const addToCartDocRef = await addDoc(collection(db, "AddToCart"), {
                UserTotalProductBill: totalBill,
            });
            console.log("Total Bill Added To AddToCart Collection With ID: ", addToCartDocRef.id);
        } catch (e) {
            console.error("Total Bill Update Error: ", e);
        }
    } else {
        console.log("Calculating Total Bill Error");
    }
}

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



