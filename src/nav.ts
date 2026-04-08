function renderNavBar() {
    const { role } = JSON.parse(localStorage.getItem("rdnUser") || "{}");
    const homeUrl = role === "admin" ? "/admin.html" : "/";
    const viewAsTab = role === "admin" ? `<a id="view-as-tab" class="nav-item" href="/">View As</a>` : "";

    const navContainer = document.createElement("div");
    const style = document.createElement("style");

    navContainer.id = "nav-container";
    navContainer.innerHTML = `
        <a id="home-tab" class="nav-item" href="${homeUrl}">Home</a>
        ${viewAsTab}
        <a id="profile-tab" class="nav-item" href="/profile.html">Profile</a>
    `;

    style.textContent = `
        #nav-container {
            width: 100%;
            position:fixed;
            bottom:0;
            background-color: #2d6a4f;
            border-radius: 10px 10px 0 0;
            display: flex;
            justify-content: space-around;
        }
        .nav-item {
            text-decoration: none;
            color: inherit;
            padding: 10px;
            margin: 10px;
            font-size: 1.5rem;
            background-color: green;
            border-radius: 20px;
        }
        #nav-container a:hover {
            background-color: blue;
            transform: scale(1.1);
        }
        .active-nav-item {
            background-color: yellow;
        }
    `;

    document.body.append(navContainer);
    document.head.append(style);
    setActiveNav();
}

function setActiveNav() {
    const navItems = document.querySelectorAll(".nav-item");
    let currentPagePath = window.location.pathname; //.replace('.html', '') + '.html';
    currentPagePath = (currentPagePath === '/index.html' || currentPagePath === "") ? '/' : currentPagePath;

    navItems.forEach(item => {
        const linkPath = item.getAttribute('href');

        if (currentPagePath === linkPath) {
            item.classList.add('active-nav-item');
        } else {
            item.classList.remove('active-nav-item');
        }
    });
}

export { renderNavBar };