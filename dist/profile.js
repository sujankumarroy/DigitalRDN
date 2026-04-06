import { renderNavBar } from "./nav.js";
const btnSignUp = document.getElementById("btn-signup");
const btnSignIn = document.getElementById("btn-signin");
const btnSignOut = document.getElementById("btn-signout");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhoneN = document.getElementById("user-phone");
function initEvents() {
    btnSignUp.addEventListener("click", () => signUp());
    btnSignIn.addEventListener("click", () => signUp());
    btnSignOut.addEventListener("click", () => singOut());
}
function renderUserState() {
    let user = JSON.parse(localStorage.getItem("rdnUser") || "{}");
    if (Object.keys(user).length !== 0) {
        btnSignUp.style.display = "none";
        btnSignIn.style.display = "none";
        btnSignOut.style.display = "block";
        const user = getUser();
        userName.textContent = user.name;
        userEmail.textContent = user.email;
        userPhoneN.textContent = user.phoneN;
    }
    else {
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
function singOut() {
    localStorage.clear();
    renderUserState();
}
function setUser() {
    const user = {
        name: prompt("what is your name?") || "Unknown",
        email: prompt("what is your email address") || "name@example.com",
        phoneN: prompt("what is your Phone Number?") || "+91 0000000000"
    };
    localStorage.setItem("rdnUser", JSON.stringify(user));
    return user;
}
function getUser() {
    let user = JSON.parse(localStorage.getItem("rdnUser") || "{}");
    return user;
}
renderNavBar();
initEvents();
renderUserState();
//# sourceMappingURL=profile.js.map