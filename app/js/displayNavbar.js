"use strict"

class Navbar {
    async getNavLinks() {
        try {
            const response = await fetch("/data/nav-data/navlinks.json")
            const links = await response.json()
            return links;
        }
        catch (error) {
            console.log(error)
        }
    }

    displayNavLinks(links) {
        const nav = document.querySelector(".navbar")
        links.forEach(link => {
            if (nav) nav.insertAdjacentHTML("beforeend", `<a href="${link.url}" class="navbar__link">${link.title}</a>`)
        })
    }
};

(async function () {
    const navbar = new Navbar()
    const links = await navbar.getNavLinks()
    navbar.displayNavLinks(links)
})();