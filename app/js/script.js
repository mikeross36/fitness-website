"use strict"

function navbarCtrl() {
    const menuBtn = document.getElementById("menu-btn")
    const navbar = document.querySelector(".navbar")
    const burger = document.querySelector(".burger__btn")

    menuBtn.onclick = () => {
        burger.classList.toggle("active")
        navbar.classList.toggle("active")
    }

    window.onscroll = () => {
        navbar.classList.remove("active")
    }
}

function homeSlider() {
    const slides = [...document.querySelectorAll(".home__slide")]
    const slideLinks = [...document.querySelectorAll(".slider__nav-link")]
    let currentSlide = 0

    function changeSlide(newSlide) {
        if (newSlide >= slides.length) {
            newSlide = 0
        }
        else if (newSlide < 0) {
            newSlide = slides.length - 1
        }

        toggleActive(newSlide)

        currentSlide = newSlide
    }

    function toggleActive(newSlide) {
        slides[currentSlide].classList.toggle("active-slide")
        slideLinks[currentSlide].classList.toggle("active-link")
        slides[newSlide].classList.toggle("active-slide")
        slideLinks[newSlide].classList.toggle("active-link")
    }

    slideLinks.forEach((link, linkIdx) => {
        link.addEventListener("click", () => {
            if (currentSlide !== linkIdx) {
                changeSlide(linkIdx)
            }
        })
    })
};


(function () {
    homeSlider()
    navbarCtrl()
})();
