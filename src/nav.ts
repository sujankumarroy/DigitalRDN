function renderNavBar() {
    const navContainer = document.createElement("div");
    const style = document.createElement("style");

    navContainer.id = "nav-container";
    navContainer.innerHTML = `
        <div id="home-tab">Home</div>
        <div id="account-tab">Account</div>
    `;

    style.textContent = `
        #nav-container {
            width: 100%;
            position:fixed;
            bottom:0;
            background-color: red;
            border-radius: 10px 10px 0 0;
            display: flex;
            justify-content: space-around;
        }
        #nav-container div {
            padding: 10px;
            margin: 10px;
            font-size: 1.5rem;
            background-color: green;
            border-radius: 20px;
        }
        #nav-container div:hover {
            background-color: blue;
            transform: scale(1.1);
        }
    `;

    document.body.append(navContainer);
    document.head.append(style);
    initEvents();
}

function initEvents() {
    const home = document.getElementById("home-tab") as HTMLDivElement;
    const account = document.getElementById("account-tab") as HTMLDivElement;

    home.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    account.addEventListener("click", () => {
        window.location.href = "profile.html";
    });
}

export { renderNavBar };