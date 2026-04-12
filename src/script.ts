import { renderNavBar } from "./nav.js";

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const whatsappShare = document.getElementById("whatsapp-share") as HTMLButtonElement;
const btnPay = document.getElementById("btn-pay") as HTMLButtonElement;
const clear = document.getElementById("clear") as HTMLButtonElement;
const btnUIP = document.getElementById("btn-upi") as HTMLButtonElement;
const btnQRD = document.getElementById("btn-qr-d") as HTMLButtonElement;
const btnSend = document.getElementById("btn-send-utr") as HTMLButtonElement;
const btnPurchase = document.getElementById("btn-purchase") as HTMLButtonElement;
const closeBtns = document.querySelectorAll(".close");

const root_path = "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";

// if ('serviceWorker' in navigator) {
//     const registration = await navigator.serviceWorker.register('/serviceworker.js');

//     const permission = await Notification.requestPermission();

//     if (permission === 'granted') {
//         console.log("Permission granted");

//         const subscription = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: urlBase64ToUint8Array("YOUR_PUBLIC_VAPID_KEY")
//         });

//         console.log("Subscription:", subscription);

//         // 🔥 send to your backend (Netlify function)
//         await fetch("https://digitalrdn.netlify.app/.netlify/functions/save-subscription", {
//             method: "POST",
//             body: JSON.stringify(subscription),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     }
// }

searchInput.addEventListener("keyup", () => filterProducts());
whatsappShare.addEventListener("click", () => shareWhatsAppList());
btnPay.addEventListener("click", () => openPopup());
clear.addEventListener("click", () => clearBuyList());
btnUIP.addEventListener("click", () => payNow());
btnQRD.addEventListener("click", () => downloadQR());
btnSend.addEventListener("click", () => sendTID());
btnPurchase.addEventListener("click", () => {
    scrollToProducts();
    closePopup();
});
document.getElementById("products")?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest(".book-button") as HTMLButtonElement;
    const name = button?.dataset.name;
    const price = parseInt(button?.dataset.price || "0");
    const type = button?.dataset.type;
    if (!name || !price || !type) return;
    toggleProduct(button, name, price, type);
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => closePopup());
});

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.id !== "purchasemodel" && target.id !== "upiModal") return;
    if (
        (document.getElementById("upiModal") as HTMLElement).style.display === "block" ||
        (document.getElementById("purchasemodel") as HTMLElement).style.display === "block"
    ) closePopup();
});

async function initPush() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/serviceworker.js');

        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BMU0gAB4vbMYuRBRSxQ_V7efI0sSuhjL5VkJE9jvCw7HQvc6-jjKeOQaIF07DvWV9luSJfiogHrTmOSscao4rA4")
            });

            await fetch("http://localhost:8888/.netlify/functions/save-subscription", {
                method: "POST",
                body: JSON.stringify(subscription),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }
}

initPush();

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

async function loadProducts() {
    const loader = document.getElementById("loader") as HTMLElement;
    
    loader.style.display = "flex";
    
    const res = await fetch("https://digitalrdn.netlify.app/.netlify/functions/get-products")
    
    loader.style.display = "none";

    if (!res.ok) {
        console.error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (!result.success) {
        console.error(result.error || "Unknown error occurred");
    }
    
    const data = result.data;
    
    if (!data) {
        alert("Data not found");
        return;
    }

    let buyList = JSON.parse(localStorage.getItem("buyList") || "[]");
    
    for (let i in data) {
        const item = data[i];
        let isAdded = false;
        
        buyList.forEach((p: { name: string; }) => {
            if (p.name === item.name) {
                isAdded = true;
            } else {
                isAdded = false;
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
                <input name="quantity" type="${item.type}" min="1" value="1" class="quantity-input"/>
            </div>
            <button class="book-button ${isAdded ? 'added' : ''}" data-name="${item.name}" data-price="${item.price}" data-type="${item.type}">
                ${isAdded ? 'Remove' : 'Add'}
            </button>
        `
        document.getElementById("products")?.appendChild(pcont);
    }
}

function openPopup() {
    let total = parseInt(document.getElementById("amountDisplay")?.textContent || "0");
    if (total >= 10) {
        (document.getElementById("upiModal") as HTMLElement).style.display = "block";
    } else {
        (document.getElementById("purchasemodel") as HTMLElement).style.display = "block";
    }
}

function closePopup() {
    (document.getElementById("upiModal") as HTMLElement).style.display = "none";
    (document.getElementById("purchasemodel") as HTMLElement).style.display = "none";
}

function scrollToProducts() {
    const target = document.querySelector('#products');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function sendTID() {
    const utr = (document.getElementById('utrInput') as HTMLInputElement).value.trim();
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
    const query = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
    const products = document.getElementsByClassName("product");
    for (let i = 0; i < products.length; i++) {
        const productName = products[i]?.getElementsByTagName("h3")[0]?.textContent.toLowerCase();
        (products[i] as HTMLElement).style.display = productName?.includes(query) ? "flex" : "none";
    }
}
        
function toggleProduct(button: HTMLElement, name: string, price: number, type: string) {
    const quantityInput = button.parentNode?.querySelector("input") as HTMLInputElement;
    let quantity: string | number = 0;
    if (type === "packaged") {
        quantity = parseInt(quantityInput.value || "0");
    } else if (type === "loose") {
        quantity = parseFloat(quantityInput.value || "0").toFixed(3);
    }
    
    let buyList = JSON.parse(localStorage.getItem("buyList") || "[]");
    const index = buyList.findIndex((p: { name: string }) => p.name === name);
    
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
    const total = parseInt(document.getElementById("amountDisplay")?.textContent || "0");
    const upiID = "Q060474773@ybl"; // Replace with your PhonePe UPI ID
    const name = "Rongpur Daily Needs";
    const upiURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;
    if (total >= 10) {
        window.location.href = upiURL;
    } else {

    }
}

function downloadQR() {
    const image = document.getElementById("qrImage") as HTMLImageElement | null;
    const link = document.createElement("a") as HTMLAnchorElement | null;
    if (!image || !link) return;
    link.href = image?.src;
    link.download = "/assets/images/Q060474773.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateBuyListDisplay() {
    const list = JSON.parse(localStorage.getItem("buyList") || "[]");
    const container = document.getElementById("buyListDisplay") as HTMLElement;
    container.innerHTML = "<h2>🛒 Your Buy List</h2>";
    
    if (list.length === 0) {
        container.innerHTML += "<p>No items added yet.</p>";
        return;
    }
    
    let total = 0;
    container.innerHTML += "<ul>" + list.map((item: { price: number; quantity: number; name: string }): string => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        document.getElementById("amountDisplay")!.textContent = total.toString();
        

        return `<li>${item.name} : ₹${item.price} × ${item.quantity} = ₹${subtotal}</li>`;
    }).join("") + `</ul><strong>Total: ₹${total}</strong>`;
}

function clearBuyList() {
    localStorage.removeItem("buyList");
    updateBuyListDisplay();
    document.getElementById("amountDisplay")!.textContent = "0";
    const buttons = document.getElementsByClassName("book-button");
    for (let btn of buttons) {
        btn.classList.remove("added");
        btn.textContent = "Buy Now";
    }
}

function shareWhatsAppList() {
    const list = JSON.parse(localStorage.getItem("buyList") || "[]");
    if (list.length === 0) return alert("Your Buy List is empty!");
    
    let total = 0;
    let message = "🛒 *Buy List*:\n";
    list.forEach((item: { price: number; quantity: number; name: string }) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.name} : ₹${item.price} × ${item.quantity} = ₹${subtotal}\n`;
    });
    message += `\n*Total = ₹${total}*`;
    
    const whatsappUrl = `https://wa.me/916003375755?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}

window.onload = updateBuyListDisplay;
renderNavBar();
loadProducts();
