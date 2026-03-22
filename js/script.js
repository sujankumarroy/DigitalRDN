const dialogue = document.getElementById("addDialogue");
const dialogueTitle = document.getElementById("dialogueTitle");
const psave = document.getElementById("psave");
const ploader = document.getElementById("p-loader");
const productContainer = document.getElementById("products");
const closePopup = document.getElementById("close-popup");

const passwordInput = document.getElementById('passwordInput');
const loginContainer = document.getElementById('login-container');
const btnLogin = document.getElementById('btn-login');
const adminContent = document.getElementById('adminContent');

const pimg = document.getElementById("pimg");
const pname = document.getElementById("pname");
const pprice = document.getElementById("pprice");
const punit = document.getElementById("punit");
const ptype = document.getElementById("ptype");
const pstock = document.getElementById("pstock");
const pminstock = document.getElementById("pminstock");
const imgInput = document.getElementById("input-image");

const editBtn = document.getElementById("edit");
const saveBtn = document.getElementById("save");
const cancleBtn = document.getElementById("cancel");
const imgPreview = document.getElementById("img-preview");
const editPopup = document.getElementById("edit-popup");
const loader = document.getElementById("loader");

let currentId = null;
let currentData = null;
let key;

const root_path = "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";

pimg.addEventListener("click", () => {
    editPopup.style.display = "flex";
    imgPreview.src = pimg.src;
});

editBtn.addEventListener("click", () => {
    imgInput.click()
});

imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (!file) return;

    imgPreview.src = URL.createObjectURL(file);
    imgPreview.style.display = "";
});

saveBtn.addEventListener("click", () => {
    uploadAvatar();
});

cancleBtn.addEventListener("click", () => {
    editPopup.style.display = "none";
});

closePopup.addEventListener("click", () => {
    dialogue.style.display = "none";
});

psave.addEventListener("click", () => {
    save(psave);
});
btnLogin.addEventListener("click", () => { checkPassword() });

// Load products
async function loadProducts() {

    const res = await fetch("http://localhost:8888/.netlify/functions/get-products");

    if (!res.ok) {
        console.log(`HTTP error! status: ${res.status}`);
    }

    const { data, error } = await res.json();
    
    if (error) {
        console.error(error.message);
        return;
    }
    
    if (!data) {
        alert("No Product Found In The Database");
        return;
    }
    
    ploader.style.display = "none";
    currentData = data;
    productContainer.innerHTML = "";
    
    for (let i in data) {
        const item = data[i];
        const pcont = document.createElement("div");
        
        pcont.className = "product";
        pcont.id = i;
        pcont.innerHTML = `
            <img src="${root_path + item.file_name}" alt="${item.name}">
            <div class="product-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}/${item.unit}</p>
            </div>
            <div>
                <button class="book-button" onclick="openPopup(this, ${i})">Update</button>
                <br>
                <button class="delete-btn book-button" onclick="deleteData('${item.id}')">Delete</button>
            </div>
        `;
        productContainer.appendChild(pcont);
    }
}

// Save or Update product
async function save(btn) {
    const name = pname.value.trim();
    const price = parseInt(pprice.value.trim());
    const unit = punit.value.trim();
    const type = ptype.value.trim();
    const stock_quantity = pstock.value.trim();
    const min_stock = pminstock.value.trim();
    
    const pimgurl = pimg.src;
    const pimgurlparts = pimgurl.split("?")[0].split("/");
    const pimgname = pimgurlparts[pimgurlparts.length - 1];
    
    if (!name || isNaN(price) || !unit || !type || isNaN(stock_quantity) || isNaN(min_stock) || !pimgname) {
        alert("Please fill all fields correctly.");
        return;
    }
    
    const product = {
        name: name,
        price: price,
        unit: unit,
        type: type,
        file_name: pimgname,
        stock_quantity: stock_quantity,
        min_stock: min_stock
    }

    if (btn.innerText === "Add") {
        const res = await fetch("http://localhost:8888/.netlify/functions/update-product", {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, ...product })
        });

        if (!res.ok) {
            console.error(`Error code ${res.status}`);
            if (res.status === 401) alert("Wrong Password.")
            return;
        }

        const { error } = await res.json();
        
        if (error) {
            console.log(error.message);
            alert(error.message);
            return;
        }
        
        alert("Product added!");
        dialogue.style.display = "none";
        loadProducts();
        
    } else if (btn.innerText === "Update" && currentId) {
        
        const date = new Date();
        const isoString = date.toISOString();
        
        const res = await fetch("http://localhost:8888/.netlify/functions/update-product", {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentId, key, updated_at: isoString, ...product })
        });

        if (!res.ok) {
            console.error(`Error code ${res.status}`);
            if (res.status === 401) alert("Wrong Password.")
            return;
        }

        const { error } = await res.json();

        if (error) {
            console.log(error.message);
            alert(error.message);
            return;
        }
        
        alert("Product updated!");
        dialogue.style.display = "none";
        loadProducts();
        
    }
}

// Delete product
async function deleteData(id) {
    if (confirm("Delete This Product")) {
        const res = await fetch("http://localhost:8888/.netlify/functions/update-product", {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, key, is_active: false })
        });

        if (!res.ok) {
            console.error(`Error code ${res.status}`);
            if (res.status === 401) alert("Wrong Password.")
            return;
        }

        const { error } = await res.json();
        
        if (error) {
            console.log(eror.message);
            alert(error.message);
            return;
        }
        
        alert("Product deleted!");
        loadProducts();
    }
}

// upload product image
async function uploadAvatar() {
    const originalFile = imgInput.files[0];

    if (!originalFile) {
        alert("Select an image first");
        return;
    }
    
    if (!originalFile.type.startsWith("image/jpeg")) {
        alert("Only jpg allowed");
        return;
    }
    
    if (originalFile.size > 5 * 1024 * 1024) {
        alert("Image too large");
        return;
    }
    
    ploader.style.display = "flex";
    
    const compressedFile = await compressWithCanvas(
        originalFile,
        0.7,   // quality
        512    // max width/height
    );
    
    const fileExt = "jpg" // compressedFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const formData = new FormData();
    formData.append("image", compressedFile);
    formData.append("filePath", filePath);
    formData.append("key", key);

    const res = await fetch("http://localhost:8888/.netlify/functions/upload-image", {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        ploader.style.display = "none";
        console.error(`Error code ${res.status}`);
        if (res.status === 401) alert("Wrong Password.")
        return;
    }

    const { success, error, publicUrl } = await res.json();

    if (error || !success) {
        ploader.style.display = "none";
        console.error(error);
        alert(error.message);
        return;
    }

    loader.style.display = "none";
    editPopup.style.display = "none";
    pimg.src = publicUrl + "?t=" + Date.now();
}

// Open popup
function openPopup(btn, index) {

    if (btn.innerText === "➕ Add") {
        dialogueTitle.innerText = "Add Product";
        psave.innerText = "Add";
        currentId = null;
        
        pname.value = "";
        pprice.value = "";
        punit.value = "";
        ptype.value = "";
        pstock.value = "";
        pminstock.value = "";
        
    } else if (btn.innerText === "Update") {
        const container = btn.closest(".product");
        const item = currentData[index];
        currentId = item.id;
        
        pname.value = item.name;
        pprice.value = item.price;
        punit.value = item.unit;
        ptype.value = item.type;
        pstock.value = item.stock_quantity;
        pminstock.value = item.min_stock;
        pimg.src = root_path + item.file_name;
        
        dialogueTitle.innerText = "Update Product";
        psave.innerText = "Update";
    }
    
    dialogue.style.display = "flex";
}

// compress image
function compressWithCanvas(file, quality = 0.7, maxSize = 512) {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = e => {
            img.src = e.target.result;
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
            }, "image/jpeg", quality);
        };

        reader.readAsDataURL(file);
    });
}

// Encreption
async function checkPassword() {
    try {
        key = passwordInput.value;
        const res = await fetch('http://localhost:8888/.netlify/functions/verify-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key })
        });

        if (!res.ok) throw new Error(`Error code ${res.status}`);
        const { success, authorised, error } = await res.json();
        if (!success || error) throw new Error(error);

        if (authorised) {
            loadProducts();
            loginContainer.style.display = "none";
            adminContent.style.display = "block";
        } else {
            alert("Wrong password!");
        }
    } catch(err) {
        console.error(err);
    }
}
