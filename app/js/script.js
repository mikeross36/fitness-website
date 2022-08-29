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

    const changeSlide = (newSlide) => {
        if (newSlide >= slides.length) {
            newSlide = 0
        }
        else if (newSlide < 0) {
            newSlide = slides.length - 1
        }

        slides[currentSlide].classList.toggle("active-slide")
        slideLinks[currentSlide].classList.toggle("active-link")
        slides[newSlide].classList.toggle("active-slide")
        slideLinks[newSlide].classList.toggle("active-link")

        currentSlide = newSlide
    }

    slideLinks.forEach((link, linkIdx) => {
        link.addEventListener("click", () => {
            if (currentSlide !== linkIdx) {
                changeSlide(linkIdx)
            }
        })
    })
};

function testimonialSlider() {
    const revSlides = [...document.querySelectorAll(".slide")]
    const prevBtn = document.querySelector(".prev__btn")
    const nextBtn = document.querySelector(".next__btn")
    let index = 0

    const prevSlide = () => {
        revSlides[index].classList.remove("active-slide")
        index = (index - 1 + revSlides.length) % revSlides.length
        revSlides[index].classList.add("active-slide")
    }

    const nextSlide = () => {
        revSlides[index].classList.remove("active-slide")
        index = (index + 1) % revSlides.length
        revSlides[index].classList.add("active-slide")
    }

    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)
};

(function () {
    testimonialSlider()
    homeSlider()
    navbarCtrl()
})();
