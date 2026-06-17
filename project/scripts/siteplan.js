"use strict";

const productArray = [
    { id: "hi-60", name: "High Intensity Track (60 Days)" },
    { id: "std-90", name: "Standard Core Track (90 Days)" },
    { id: "bg-180", name: "Balanced Growth Track (180 Days)" }
];

const baseReadingsMatrix = [
    ["Genesis 1–8", "Psalms 1–4", "Matthew 1–3"],
    ["Genesis 9–16", "Psalms 5–8", "Matthew 4–6"],
    ["Genesis 17–24", "Psalms 9–12", "Matthew 7–9"],
    ["Genesis 25–32", "Psalms 13–16", "Matthew 10–12"],
    ["Genesis 33–40", "Psalms 17–20", "Matthew 13–15"],
    ["Genesis 41–50", "Psalms 21–24", "Matthew 16–18"],
    ["Exodus 1–10", "Psalms 25–28", "Matthew 19–21"],
    ["Exodus 11–20", "Psalms 29–32", "Matthew 22–24"],
    ["Exodus 21–30", "Psalms 33–36", "Matthew 25–28"],
    ["Exodus 31–40", "Psalms 37–40", "Mark 1–4"]
];

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

function setupMobileNavigation() {
    const hamBtn = document.getElementById("hambutton");
    const navMenu = document.getElementById("navmenu");
    
    if (hamBtn && navMenu) {
        hamBtn.addEventListener("click", (e) => {
            e.preventDefault();
            hamBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }
}

let activeHorizonDays = 60;
let progressState = {};

function initTrackingEngine() {
    const planSelect = document.getElementById("planSelect");
    const nameBtn = document.getElementById("btnSaveName");
    const resetBtn = document.getElementById("btnResetProgress");

    loadUserProfile();
    
    if (planSelect) {
        activeHorizonDays = parseInt(planSelect.value, 10);
        planSelect.addEventListener("change", (e) => {
            activeHorizonDays = parseInt(e.target.value, 10);
            renderTrackerAccordion();
            updateCalculatedMetrics();
        });
    }

    if (nameBtn) {
        nameBtn.addEventListener("click", saveUserProfile);
    }
    if (resetBtn) {
        resetBtn.addEventListener("click", resetProgressState);
    }

    loadProgressState();
    renderTrackerAccordion();
    updateCalculatedMetrics();
}

function loadUserProfile() {
    const savedName = localStorage.getItem("dwc_user_profile");
    const section = document.getElementById("nameSection");
    const welcome = document.getElementById("welcomeText");
    
    if (savedName && section && welcome) {
        section.style.display = "none";
        welcome.style.display = "block";
        welcome.innerHTML = `Welcome back, <strong>${savedName}</strong>!`;
    }
}

function saveUserProfile() {
    const input = document.getElementById("nameInput");
    if (input && input.value.trim() !== "") {
        const username = input.value.trim();
        localStorage.setItem("dwc_user_profile", username);
        loadUserProfile();
    }
}

function loadProgressState() {
    const state = localStorage.getItem("dwc_progress_matrix");
    progressState = state ? JSON.parse(state) : {};
}

function toggleAccordionBlock(index) {
    const target = document.getElementById(`sec-${index}`);
    if (target) {
        const isCurrentlyActive = target.classList.contains("active");
        document.querySelectorAll(".week-content").forEach(el => el.classList.remove("active"));
        if (!isCurrentlyActive) target.classList.add("active");
    }
}

function renderTrackerAccordion() {
    const target = document.getElementById("contentAccordion");
    if (!target) return;
    
    target.innerHTML = "";
    const groupSize = 5;
    const structuresCount = Math.ceil(activeHorizonDays / groupSize);

    for (let i = 0; i < structuresCount; i++) {
        const startDay = i * groupSize + 1;
        const endDay = Math.min((i + 1) * groupSize, activeHorizonDays);
        
        const wrapper = document.createElement("div");
        wrapper.className = "week-section";
        
        const header = document.createElement("div");
        header.className = "week-header";
        header.innerHTML = `<span>Days ${startDay}–${endDay} Blueprint</span><span>▼</span>`;
        header.addEventListener("click", () => toggleAccordionBlock(i));
        
        const contentBlock = document.createElement("div");
        contentBlock.className = "week-content";
        contentBlock.id = `sec-${i}`;
        
        for (let day = startDay; day <= endDay; day++) {
            const indexPointer = (day - 1) % baseReadingsMatrix.length;
            const coreReadings = baseReadingsMatrix[indexPointer];
            const checkboxUid = `chk-plan-${activeHorizonDays}-d-${day}`;
            const isChecked = progressState[checkboxUid] ? "checked" : "";
            
            const row = document.createElement("div");
            row.className = "day-item";
            row.innerHTML = `
                <div class="checkbox-container">
                    <input type="checkbox" id="${checkboxUid}" ${isChecked}>
                </div>
                <div class="day-info">
                    <div class="day-date">Day ${day}</div>
                    <div class="reading"><span class="reading-label">☀️ Morning:</span> ${coreReadings[0]}</div>
                    <div class="reading"><span class="reading-label">⏳ Afternoon:</span> ${coreReadings[1]}</div>
                    <div class="reading"><span class="reading-label">🌙 Night:</span> ${coreReadings[2]}</div>
                </div>
            `;
            
            row.querySelector('input[type="checkbox"]').addEventListener("change", (e) => {
                progressState[checkboxUid] = e.target.checked;
                localStorage.setItem("dwc_progress_matrix", JSON.stringify(progressState));
                updateCalculatedMetrics();
            });
            
            contentBlock.appendChild(row);
        }
        
        wrapper.appendChild(header);
        wrapper.appendChild(contentBlock);
        target.appendChild(wrapper);
    }
}

function updateCalculatedMetrics() {
    let completedCount = 0;
    for (let day = 1; day <= activeHorizonDays; day++) {
        if (progressState[`chk-plan-${activeHorizonDays}-d-${day}`]) {
            completedCount++;
        }
    }

    const calculatedPercentage = Math.round((completedCount / activeHorizonDays) * 100) || 0;
    
    const bar = document.getElementById("progressBar");
    const loggedEl = document.getElementById("completedDays");
    const completeEl = document.getElementById("totalReadings");
    const remainingEl = document.getElementById("remainingDays");

    if (bar) {
        bar.style.width = `${calculatedPercentage}%`;
        bar.textContent = `${calculatedPercentage}%`;
    }
    if (loggedEl) loggedEl.textContent = completedCount;
    if (completeEl) completeEl.textContent = completedCount * 3; // Exclusive template logic transformation
    if (remainingEl) remainingEl.textContent = activeHorizonDays - completedCount;
}

function resetProgressState() {
    if (confirm("Execute hard reset context on all active application telemetry database logs?")) {
        localStorage.removeItem("dwc_progress_matrix");
        localStorage.removeItem("dwc_user_profile");
        location.reload();
    }
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