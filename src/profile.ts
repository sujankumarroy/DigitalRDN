import { renderNavBar } from "./nav.js";

const btnSignUp = document.getElementById("btn-signup") as HTMLButtonElement;
const btnSignIn = document.getElementById("btn-signin") as HTMLButtonElement;
const btnSignOut = document.getElementById("btn-signout") as HTMLButtonElement;

const userName = document.getElementById("user-name") as HTMLParagraphElement;
const userEmail = document.getElementById("user-email") as HTMLParagraphElement;
const userPhoneN = document.getElementById("user-phone") as HTMLParagraphElement;

type user = {
    name: string,
    email: string,
    phoneN: string
}

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

        const user: user = getUser();
        userName.textContent = user.name;
        userEmail.textContent = user.email;
        userPhoneN.textContent = user.phoneN;
    } else {
        btnSignUp.style.display = "block";
        btnSignIn.style.display = "block";
        btnSignOut.style.display = "none";

        userName.textContent = "Unknown";
        userEmail.textContent = "name@example.com";
        userPhoneN.textContent = "+91 0000000000";
    }
}

function signUp() {
    setUser();
    renderUserState();
}

async function singIn() {
    try {
        const user = askCredential();
        if (!user.email || !user.password) alert("Failed to login!\nEnter Email and Password properly.")

        let res: Response = await fetch("http://localhost:8888/.netlify/functions/get-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (!res.ok) console.error(`Failed to Fetch. error: ${res.status}`);
        const { data, error } = await res.json();
        if (error) console.error("error");
        if (!data) console.log("No credential found with your email and password");
        localStorage.setItem("rdnUser", JSON.stringify(data[0]));
        renderUserState();
    } catch(err) {
        console.error(err);
    }
}

function singOut() {
    localStorage.clear();
    renderUserState()
}

function askCredential() {
    const credential = {
        email: prompt("Enter your email address"),
        password: prompt("Enter your Password")
    }
    return credential;
}

function setUser(): user {
    const user: user = {
        name: prompt("what is your name?") || "Unknown",
        email: prompt("what is your email address") || "name@example.com",
        phoneN: prompt("what is your Phone Number?") || "+91 0000000000"
    }
    localStorage.setItem("rdnUser", JSON.stringify(user));
    return user;
}

function getUser(): user {
    let user = JSON.parse(localStorage.getItem("rdnUser") || "{}");
    return user;
}

renderNavBar();
initEvents();
renderUserState();
