"use strict"

class Plans {
    async getPlans() {
        try {
            const response = await fetch("/data/pricing-data/pricing-data.json")
            const plans = await response.json()
            return plans;
        }
        catch (error) {
            console.error(error)
        }
    }

    displayPlans = plans => {
        const includes = document.querySelectorAll(".plan__includes")
        let element = ""
        plans.forEach(plan => {
            element += `
            <p class="pricing__info-plan">
                <img src="${plan.icon}" alt="check-icon" class="pricing__info-icon" width="20px" height="20px">
                ${plan.title}
            </p>`
        })
        includes.forEach(div => {
            div.insertAdjacentHTML("beforeend", element)
        })
    }
};

(async () => {
    const plans = new Plans()
    const apiPlans = await plans.getPlans()
    plans.displayPlans(apiPlans)
})()