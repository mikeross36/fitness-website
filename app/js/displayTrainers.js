"use strict"

class Trainers {
    getTrainers = async () => {
        try {
            const response = await fetch("/data/trainers-data/trainers-data.json")
            const trainers = await response.json()
            return trainers;
        }
        catch (error) {
            console.error(error)
        }
    }

    displayTrainers = trainers => {
        const container = document.querySelector(".trainers__container")
        if (trainers) {
            trainers.forEach(trainer => {
                container.insertAdjacentHTML("beforeend", `
                    <article class="trainers__info">
                        <img src="${trainer.image}" alt="trainer1" class="trainers__img">
                        <div class="trainers__info-content">
                            <span>${trainer.title}</span>
                            <h3 class="trainers__name">${trainer.name}</h3>
                            <div class="trainers__socials">
                                <a href="${trainer.faceUrl}">
                                    <img src="${trainer.faceIcon}" alt="" width="20px" height="20px">
                                </a>
                                <a href="${trainer.twitterUrl}">
                                    <img src="${trainer.twitterIcon}" alt="" width="20px" height="20px">
                                </a>
                                <a href="${trainer.pinteresUrl}">
                                    <img src="${trainer.pinteresIcon}" alt="" width="20px" height="20px">
                                </a>
                                <a href="${trainer.instagramUrl}">
                                    <img src="${trainer.instagramIcon}" alt="" width="20px" height="20px">
                                </a>
                            </div>
                        </div>
                    </article>
                `)
            })
        }
    };
};

(async () => {
    const trainers = new Trainers()
    const apiTrainers = await trainers.getTrainers()
    trainers.displayTrainers(apiTrainers)
})();