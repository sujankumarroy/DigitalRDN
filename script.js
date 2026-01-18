const SUPABASE_URL = "https://kcksejyyjfgpcdmgtzrc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja3Nlanl5amZncGNkbWd0enJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTQ3MTgsImV4cCI6MjA3OTA3MDcxOH0.SvZExIYgEJvj63CqLyTxyeLfLoXuhRsf4LHC6N4V_oQ";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const root_path = "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";

async function loadProducts() {
    
    loader.style.display = "flex";
    
    const res = await fetch("https://digitalrdn.netlify.app/.netlify/functions/get-data")
    
    loader.style.display = "none";

    if (!res.ok) {
        console.log(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (!result.success) {
        console.log(result.error || "Unknown error occurred");
    }
    
    const data = result.data;
    
    if (!data) {
    	alert("Data not found");
    	return;
    }
    
    console.log(data);
    
    let buyList = JSON.parse(localStorage.getItem("buyList")) || [];
    
    for (let i in data) {
        const item = data[i];
        let isAdded = false;
        
        buyList.forEach(p => {
        	if (p.name === item.name) {
        		isAdded = true;
        	} else {
        		isAdded - false;
        	}
        	
        });
        
        const pcont = document.createElement("div");
        pcont.className = "product";
        pcont.id = item.id;
        pcont.innerHTML = `
            <img src="${root_path + item.file_name}" alt="${item.name}">
            <div class="product-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}/${item.unit}</p>
                <p>${item.stock_quantity} ${item.unit}s are available.</p>
                <input type="${item.type}" min="1" value="1" class="quantity-input"/>
            </div>
            <button class="book-button ${isAdded ? 'added' : ''}" onclick="toggleProduct(this, '${item.name}', ${item.price}, '${item.type}')">${isAdded ? 'Remove' : 'Add'}</button>
        `
        document.getElementById("products").appendChild(pcont);
    }
}

function openPopup() {
    let total = document.getElementById("amountDisplay").textContent;
    if (total >= 10) {
        document.getElementById("upiModal").style.display = "block";
    } else {
        document.getElementById("purchasemodel").style.display = "block";
    }
}

function closePopup() {
    document.getElementById("upiModal").style.display = "none";
    document.getElementById("purchasemodel").style.display = "none";
}

function scrollToProducts() {
    const target = document.querySelector('#products');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function sendTID() {
    const utr = document.getElementById('utrInput').value.trim();
    if (utr === "") {
        alert("Please enter Your Transaction ID.");
    } else {
        const phoneNumber = "916003375755";
        const message = `My Transection ID is: ${utr}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
}

function filterProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const products = document.getElementsByClassName("product");
    for (let i = 0; i < products.length; i++) {
        const productName = products[i].getElementsByTagName("h3")[0].textContent.toLowerCase();
        products[i].style.display = productName.includes(query) ? "flex" : "none";
    }
}
        
function toggleProduct(button, name, price, type) {
    const quantityInput = button.parentNode.querySelector("input");
    let quantity = parseFloat(quantityInput.value) || 1;
    
    if (type === "packaged") {
        quantity = parseInt(quantity);
    } else if (type === "loose") {
        quantity = parseFloat(quantity).toFixed(3);
    }
    
    let buyList = JSON.parse(localStorage.getItem("buyList")) || [];
    const index = buyList.findIndex(p => p.name === name);
    
    if (index !== -1) {
        buyList.splice(index, 1);
        button.classList.remove("added");
        button.textContent = "Add";
    } else {
        buyList.push({ name, price, quantity });
        button.classList.add("added");
        button.textContent = "Remove";
    }
    
    localStorage.setItem("buyList", JSON.stringify(buyList));
    updateBuyListDisplay();
}

function payNow() {
    const total = document.getElementById("amountDisplay").textContent
    const upiID = "Q060474773@ybl"; // Replace with your PhonePe UPI ID
    const name = "Rongpur Daily Needs";
    const upiURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;
    if (total >= 10) {
        window.location.href = upiURL;
    } else {

    }
}

function downloadQR() {
    const image = document.getElementById("qrImage");
    const link = document.createElement("a");
    link.href = image.src;
    link.download = "Images/Q060474773.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateBuyListDisplay() {
    const list = JSON.parse(localStorage.getItem("buyList")) || [];
    console.log(list)
    const container = document.getElementById("buyListDisplay");
    container.innerHTML = "<h2>🛒 Your Buy List</h2>";
    
    if (list.length === 0) {
        container.innerHTML += "<p>No items added yet.</p>";
        return;
    }
    
    let total = 0;
    container.innerHTML += "<ul>" + list.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        document.getElementById("amountDisplay").textContent = total;
        

        return `<li>${item.name} : ₹${item.price} × ${item.quantity} = ₹${subtotal}</li>`;
    }).join("") + `</ul><strong>Total: ₹${total}</strong>`;
}

function clearBuyList() {
    localStorage.removeItem("buyList");
    updateBuyListDisplay();
    document.getElementById("amountDisplay").textContent = 0
    const buttons = document.getElementsByClassName("book-button");
    for (let btn of buttons) {
        btn.classList.remove("added");
        btn.textContent = "Buy Now";
    }
}

function shareWhatsAppList() {
    const list = JSON.parse(localStorage.getItem("buyList")) || [];
    if (list.length === 0) return alert("Your Buy List is empty!");
    
    let total = 0;
    let message = "🛒 *Buy List*:\n";
    list.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.name} : ₹${item.price} × ${item.quantity} = ₹${subtotal}\n`;
    });
    message += `\n*Total = ₹${total}*`;
    
    const whatsappUrl = `https://wa.me/916003375755?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}

window.onload = updateBuyListDisplay;
loadProducts();