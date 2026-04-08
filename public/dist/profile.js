import { renderNavBar } from "./nav.js";
const btnSignUp = document.getElementById("btn-signup");
const btnSignIn = document.getElementById("btn-signin");
const btnSignOut = document.getElementById("btn-signout");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhoneN = document.getElementById("user-phone");
function initEvents() {
    btnSignUp.addEventListener("click", () => signUp());
    btnSignIn.addEventListener("click", async () => singIn());
    btnSignOut.addEventListener("click", () => singOut());
}
function renderUserState() {
    let user = JSON.parse(localStorage.getItem("rdnUser") || "{}");
    if (Object.keys(user).length !== 0) {
        btnSignUp.style.display = "none";
        btnSignIn.style.display = "none";
        btnSignOut.style.display = "block";
        const user = JSON.parse(localStorage.getItem("rdnUser") || "{}");
        userName.textContent = user.name;
        userEmail.textContent = user.email;
    }
    else {
        btnSignUp.style.display = "block";
        btnSignIn.style.display = "block";
        btnSignOut.style.display = "none";
        userName.textContent = "Unknown";
        userEmail.textContent = "name@example.com";
    }
}
async function signUp() {
    try {
        const user = {
            name: prompt("what is your name?"),
            email: prompt("what is your email address"),
            password: prompt("Create your Password")
        };
        if (!user.name || !user.email) {
            alert("Must enter Name and Email");
            return;
        }
        let res = await fetch("https://digitalrdn.netlify.app/.netlify/functions/set-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!res.ok)
            console.error(`Failed to Fetch. error: ${res.status}`);
        const { success, error } = await res.json();
        if (error) {
            console.error(error);
            return;
        }
        localStorage.setItem("rdnUser", JSON.stringify(user));
        renderUserState();
    }
    catch (err) {
        console.error(err);
    }
}
async function singIn() {
    try {
        const credential = {
            email: prompt("Enter your email address"),
            password: prompt("Enter your Password")
        };
        if (!credential.email || !credential.password) {
            alert("Failed to login!\nEnter Email and Password properly.");
            return;
        }
        let res = await fetch("https://digitalrdn.netlify.app/.netlify/functions/get-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credential)
        });
        if (!res.ok)
            console.error(`Failed to Fetch. error: ${res.status}`);
        const { data, error } = await res.json();
        if (error) {
            console.error(error);
            return;
        }
        if (!data[0]) {
            console.log("No credential found with your email and password");
            return;
        }
        localStorage.setItem("rdnUser", JSON.stringify(data[0]));
        renderUserState();
    }
    catch (err) {
        console.error(err);
    }
}
function singOut() {
    localStorage.clear();
    renderUserState();
}
renderNavBar();
initEvents();
renderUserState();
//# sourceMappingURL=profile.js.map