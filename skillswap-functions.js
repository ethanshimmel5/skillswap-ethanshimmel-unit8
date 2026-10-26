const SkillSwapFunctions = {


    filterSkillsByCategory(skills, category) {
        if (category === 'All') {
            return skills;
        }

        return skills.filter(skill => skill.category === category);
    },

    calculateTotalCost(hourlyRate, hours) {
        return hourlyRate * hours;
    },

    matchSkillsToUser(userNeeds, skills) {
        return skills.filter(skill =>
            skill.category === userNeeds.category &&
            skill.price <= userNeeds.maxPrice
        );
    }

}

// Make functions available to the browser
if (typeof window !== "undefined") {
    window.SkillSwapFunctions = SkillSwapFunctions;
}

// Keep functions available to Jest
if (typeof module !== "undefined" && module.exports) {
    module.exports = SkillSwapFunctions;
}