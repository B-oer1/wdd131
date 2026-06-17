document.addEventListener("DOMContentLoaded", () => {
    setupGlobalFooterMetrics();
    setupMobileNavigation();
    
    if (document.getElementById("contentAccordion")) {
        initTrackingEngine();
    }
    if (document.getElementById("reviewForm")) {
        initReviewEngine();
    }
});

function setupGlobalFooterMetrics() {
    const yearEl = document.getElementById("currentyear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    
    const modifiedEl = document.getElementById("lastModified");
    if (modifiedEl) modifiedEl.textContent = document.lastModified;
}

function initReviewEngine() {
    const selectElement = document.getElementById("productName");
    const formElement = document.getElementById("reviewForm");
    
    if (selectElement) {
        productArray.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            selectElement.appendChild(option);
        });
    }

    if (formElement) {
        formElement.addEventListener("submit", (e) => {

            let historicalCount = parseInt(localStorage.getItem("dwc_review_submissions_counter"), 10) || 0;
            historicalCount++;
            localStorage.setItem("dwc_review_submissions_counter", historicalCount);
        });
    }

    renderSubmissionsBadgeCounter();
}

function renderSubmissionsBadgeCounter() {
    const element = document.getElementById("localReviewCount");
    if (element) {
        const count = localStorage.getItem("dwc_review_submissions_counter") || 0;
        element.textContent = count;
    }
}