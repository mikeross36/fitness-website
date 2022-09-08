"use strict"

const globals = () => {
    const containers = [...document.querySelectorAll(".slide")]
    const slides = [...document.querySelectorAll(".slide")]
    const prevBtn = document.querySelector(".prev__btn")
    const nextBtn = document.querySelector(".next__btn")
    let currSlide = 0;

    return {containers, slides, prevBtn, nextBtn, currSlide}
};
let {containers, slides, prevBtn, nextBtn, currSlide} = globals()

class Testimonials {
    getSlides = async () => {
        try {
            const response = await fetch("/data/slider-data/slider-data.json")
            const slides = await response.json()
            return slides;
        }
        catch (error) {
            console.error(error)
        }
    }

    displaySlides = slides => {
        if (containers) {
            containers.forEach((container, cIdx) => {
                slides.forEach((slide, sIdx) => {
                    if (cIdx === sIdx) {
                        container.innerHTML = `
                        <p class="slide__description">${slide.description}</p>
                        <div class="user">
                            <img src="${slide.image}" alt="user pic" class="user__img">
                            <div class="user__info">
                                <h3 class="user__name">${slide.name}</h3>
                                <span>${slide.title}</span>
                            </div>
                            <img src="${slide.quoteIcon}" alt="quote icon" class="quote__icon" width="20px" height="20px">
                        </div>`
                    }
                })
            })
        }
    }

    removeActive = (item, element) => {
        item[element].classList.remove("active-slide")
    }

    addActive = (item, element) => {
        item[element].classList.add("active-slide")
    }

    sliderFunctionality = () => {
        if (prevBtn) {
            prevBtn.onclick = () => {
                this.removeActive(slides, currSlide)
                currSlide = (currSlide - 1 + slides.length) % slides.length;
                this.addActive(slides, currSlide)
            }
        }
    
        if (nextBtn) {
            nextBtn.onclick = () => {
                this.removeActive(slides, currSlide)
                currSlide = (currSlide + 1) % slides.length;
                this.addActive(slides, currSlide)
            }
        }
    };
};

(async () => {
    const testimonials = new Testimonials()
    const slides = await testimonials.getSlides()
    testimonials.displaySlides(slides)
    testimonials.sliderFunctionality()
})();