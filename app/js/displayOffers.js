"use strict"

class Offers {
  async getOffers() {
    try {
      const response = await fetch("/data/offers-data/offers-data.json");
      const offers = await response.json();
      return offers;
    } catch (error) {
      console.error(error);
    }
  }

  displayOffers = (offers) => {
    const container = document.querySelector(".offers__container");
    offers.forEach((offer) => {
      if (container) {
        container.insertAdjacentHTML(
          "beforeend",
          `
                <article class="offers__box">
                    <div class="offers__box-image">
                        <img src="${offer.image}" class="offers__box-img" alt="offer pic">
                    </div>
                    <div class="offers__box-content">
                        <img src="${offer.icon}" class="box__icon" alt="">
                        <h3 class="box__title">${offer.title}</h3>
                        <p class="box__description">${offer.description}</p>
                        <a href="#home" class="btn">read more</a>
                    </div>
                </article>
            `
        );
      }
    });
  };
};

(async () => {
    const offers = new Offers()
    const apiOffers = await offers.getOffers()
    offers.displayOffers(apiOffers)
})();