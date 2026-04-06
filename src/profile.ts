import { renderNavBar } from "./nav.js";

const btnSignUp = document.getElementById("btn-signup") as HTMLParagraphElement;
const btnSignIn = document.getElementById("btn-signin") as HTMLParagraphElement;
const btnSignOut = document.getElementById("btn-signout") as HTMLParagraphElement;

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
    btnSignIn.addEventListener("click", () => signUp());
    btnSignOut.addEventListener("click", () => singOut());
}

function renderUserData() {
    const user: user = getUser();

    userName.textContent = user.name;
    userEmail.textContent = user.email;
    userPhoneN.textContent = user.phoneN
}

function signUp() {
    setUser();
    btnSignUp.style.display = "block";
    btnSignIn.style.display = "block";
    btnSignOut.style.display = "none";
}

function singOut() {
    localStorage.clear();
    btnSignUp.style.display = "none";
    btnSignIn.style.display = "none";
    btnSignOut.style.display = "block";
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
    if (Object.keys(user).length === 0) user = setUser();
    return user;
}

renderNavBar();
initEvents();
renderUserData();