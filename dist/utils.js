export default function getId(name) {
    const firstName = name.split(' ')[0] || "";
    if (!firstName)
        return "";
    const specialChar = "@";
    const randomNumber = (Math.random() * 9000 + 1000);
    const id = firstName + specialChar + randomNumber;
    return id;
}
//# sourceMappingURL=utils.js.map