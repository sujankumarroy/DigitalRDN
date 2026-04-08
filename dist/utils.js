function getId(name) {
    const firstName = name.split(' ')[0] || "";
    if (!firstName)
        return "";
    const specialChar = "@";
    const randomNumber = Math.floor(Math.random() * 9000 + 1000);
    const id = firstName + specialChar + randomNumber;
    return id;
}
export { getId };
//# sourceMappingURL=utils.js.map