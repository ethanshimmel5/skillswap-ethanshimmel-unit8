
document.addEventListener("DOMContentLoaded", () => {
    // Get the reusable functions
    const functions = window.SkillSwapFunctions;

    // More information buttons
    document.querySelectorAll(".details-button").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const detailsId = button.getAttribute("aria-controls");
            const details = document.getElementById(detailsId);

            if (!details) {
                console.error("Could not find details element:", detailsId);
                return;
            }

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            details.hidden = isExpanded;
            button.setAttribute("aria-expanded", String(!isExpanded));

            button.textContent = isExpanded
                ? "More Information"
                : "Show Less";
        });
    });

    // Read skill information from the existing cards
    const cards = Array.from(document.querySelectorAll(".skill-card"));

    const skills = cards.map(card => ({
        name: card.querySelector("h3")?.textContent.trim() || "Unnamed Skill",
        category: card.dataset.category,
        price: Number(card.dataset.price)
    }));

    // Category filter buttons
    document.querySelectorAll(".filter-button").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const category = button.dataset.category;

            const filtered = category === "All"
                ? skills
                : skills.filter(skill => skill.category === category);

            cards.forEach(card => {
                const name = card.querySelector("h3")?.textContent.trim();
                card.hidden = !filtered.some(skill => skill.name === name);
            });

            document.querySelectorAll(".filter-button").forEach(item => {
                item.classList.toggle("active", item === button);
            });

            const status = document.getElementById("filter-status");

            if (status) {
                status.textContent = category === "All"
                    ? `Showing all ${filtered.length} skills.`
                    : `Showing ${filtered.length} skill(s) in ${category}.`;
            }
        });
    });

    // Cost Calculator
    const costForm = document.getElementById("cost-form");

    if (costForm) {
        costForm.addEventListener("submit", event => {
            event.preventDefault();

            const rateInput = document.getElementById("hourly-rate");
            const hoursInput = document.getElementById("session-hours");
            const result = document.getElementById("cost-result");

            if (!rateInput || !hoursInput || !result) {
                console.error("Cost calculator HTML elements are missing.");
                return;
            }

            const rate = Number(rateInput.value);
            const hours = Number(hoursInput.value);

            if (
                rateInput.value.trim() === "" ||
                hoursInput.value.trim() === "" ||
                !Number.isFinite(rate) ||
                !Number.isFinite(hours) ||
                rate < 0 ||
                hours < 0
            ) {
                result.textContent = "Enter valid non-negative numbers.";
                return;
            }

            const total = functions
                ? functions.calculateTotalCost(rate, hours)
                : rate * hours;

            result.textContent = `Total cost: $${total.toFixed(2)}`;
        });
    }

    // Find my match
    const matchForm = document.getElementById("match-form");

    if (matchForm) {
        matchForm.addEventListener("submit", event => {
            event.preventDefault();

            const category = document.getElementById("needed-category");
            const budget = document.getElementById("max-price");
            const results = document.getElementById("match-results");

            if (!category || !budget || !results) {
                console.error("Skill matching HTML elements are missing.");
                return;
            }

            const maxPrice = Number(budget.value);

            if (budget.value.trim() === "" ||
                !Number.isFinite(maxPrice) || maxPrice < 0) {
                results.textContent = "Enter a valid non-negative budget.";
                return;
            }

            const matches = functions
                ? functions.matchSkillsToUser(
                    { category: category.value, maxPrice },
                    skills
                )
                : skills.filter(skill =>
                    skill.category === category.value &&
                    skill.price <= maxPrice
                );

            results.replaceChildren();

            if (matches.length === 0) {
                results.textContent =
                    "No skills match your category and budget.";
                return;
            }

            matches.forEach(skill => {
                const item = document.createElement("p");
                item.textContent =
                    `${skill.name} — $${skill.price.toFixed(2)} per session`;
                results.appendChild(item);
            });
        });
    }
});
