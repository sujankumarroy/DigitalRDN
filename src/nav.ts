function renderNavBar() {
    const navContainer = document.createElement("div");
    navContainer.id = "nav-container";
    navContainer.innerHTML = `
        <div>Home</div>
        <div>Profile</div>
    `;
    document.body.append(navContainer);
    console.log("added");
    const style = document.createElement("style");
    style.textContent = `
        #nav-container {
            width: 100%;
            position:fixed;
            bottom:0;
            background-color: red;
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
    `

    document.head.append(style);
    console.log("style added");
}

export { renderNavBar };