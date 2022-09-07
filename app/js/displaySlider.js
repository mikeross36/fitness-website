"use strict"

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
        const containers = [...document.querySelectorAll(".slide")]
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
};

(async () => {
    const testimonials = new Testimonials()
    const slides = await testimonials.getSlides()
    testimonials.displaySlides(slides)
})();