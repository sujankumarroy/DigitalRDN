// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAGyAfLysP8z_CZmNcpAyiarS00Kaw3Kzs",
  authDomain: "first-portfolio-project-c6586.firebaseapp.com",
  databaseURL: "https://first-portfolio-project-c6586-default-rtdb.firebaseio.com",
  projectId: "first-portfolio-project-c6586",
  storageBucket: "first-portfolio-project-c6586.firebasestorage.app",
  messagingSenderId: "1025895322934",
  appId: "1:1025895322934:web:be8a41ba687bce470a8f97"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentId = null; // store current product ID for update
let loader = document.getElementById("loader");

// Save or Update product
function save(btn) {
  const name = document.getElementById("pname").value.trim();
  const price = parseInt(document.getElementById("pprice").value.trim());
  const unit = document.getElementById("punit").value.trim();
  const type = document.getElementById("ptype").value.trim();
  const imgUrl = document.getElementById("pimgurl").value.trim();

  if (!name || isNaN(price) || !unit || !type || !imgUrl) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (btn.innerText === "Add") {
    const newId = Date.now(); // unique ID
    db.ref("products/" + newId).set({ name, price, unit, type, imgUrl })
      .then(() => {
        alert("Product added!");
        closePopup();
        loadProducts();
      })
      .catch(err => alert("Error: " + err.message));
  } else if (btn.innerText === "Update" && currentId) {
    db.ref("products/" + currentId).update({ name, price, unit, type, imgUrl })
      .then(() => {
        alert("Product updated!");
        closePopup();
        loadProducts();
      })
      .catch(err => alert("Error: " + err.message));
  }
}

// Load products
function loadProducts() {
  db.ref("products").once("value", snapshot => {
    const data = snapshot.val();
    const container = document.getElementById("products");
    container.innerHTML = "";
    
    if (!data) return;
    loader.style.display = "none";
    for (let id in data) {
      const item = data[id];
      const pcont = document.createElement("div");
      pcont.className = "product";
      pcont.id = id;
      pcont.innerHTML = `
        <img src="${item.imgUrl}" alt="${item.name}">
        <div class="product-details">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}/${item.unit}</p>
        </div>
        <div>
          <button class="book-button" onclick="openPopup(this)">Update</button>
          <br>
          <button class="book-button" onclick="deleteData('${id}')">Delete</button>
        </div>
      `;
      container.appendChild(pcont);
    }
  });
}

// Delete product
function deleteData(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    db.ref("products/" + id).remove()
      .then(() => {
        alert("Product deleted!");
        loadProducts();
      })
      .catch(err => alert("Error: " + err.message));
  }
}

// Open popup
function openPopup(btn) {
  const dialogue = document.getElementById("addDialogue");
  const dialogueTitle = document.getElementById("dialogueTitle");
  const psave = document.getElementById("psave");

  if (btn.innerText === "➕ Add") {
    dialogueTitle.innerText = "Add Product";
    psave.innerText = "Add";
    currentId = null;
    clearForm();
  } else if (btn.innerText === "Update") {
    const container = btn.closest(".product");
    const id = container.id;
    currentId = id;

    // Fetch product from DB to fill form
    db.ref("products/" + id).once("value", snapshot => {
      const item = snapshot.val();
      if (item) {
        document.getElementById("pname").value = item.name;
        document.getElementById("pprice").value = item.price;
        document.getElementById("punit").value = item.unit;
        document.getElementById("ptype").value = item.type;
        document.getElementById("pimgurl").value = item.imgUrl;
      }
    });

    dialogueTitle.innerText = "Update Product";
    psave.innerText = "Update";
  }

  dialogue.classList.add("active");
}

// Clear form fields
function clearForm() {
  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
  document.getElementById("punit").value = "";
  document.getElementById("ptype").value = "";
  document.getElementById("pimgurl").value = "";
}

// Close popup
function closePopup() {
  document.getElementById('addDialogue').classList.remove('active');
}

const password = "2025"; // Change this to your password
          
function checkPassword() {
  let input = document.getElementById("passwordInput").value;
  if (input === password) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminContent").style.display = "block";
  } else {
    alert("Wrong password!");
  }
}

// Load products on page load
window.onload = loadProducts;