document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-btn");
  const rows = document.querySelectorAll(".proposal-row");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      rows.forEach((row) => {
        if (filter === "all" || row.getAttribute("data-status") === filter) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});
// PMO TIME SLOT REVIEW LOGIC
document.addEventListener("DOMContentLoaded", function () {
    
    // PMO Set Slot Configuration (Example: 08:00 AM to 08:30 AM)

    const pmoSlotConfig = {
        startTime: "08:00", // 24-Hour Format (HH:MM)
        endTime: "20:30",   // e.g. 20:30 means 08:30 PM
        displayTime: "08:00 AM - 08:30 AM"
    };

    function checkPMOTimeSlot() {
        const pmoDisplay = document.getElementById("pmoTimeDisplay");
        const slotBadge = document.getElementById("pmoSlotBadge");
        const reviewBtns = document.querySelectorAll(".btn-review-action"); // Assumes Review Buttons have this class or target primary buttons

        if(pmoDisplay) pmoDisplay.innerText = pmoSlotConfig.displayTime;

        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeStr = `${currentHours}:${currentMinutes}`;

        // Check if Current Time is inside PMO Window
        const isWithinSlot = (currentTimeStr >= pmoSlotConfig.startTime && currentTimeStr <= pmoSlotConfig.endTime);

        if (isWithinSlot) {
            // SLOT IS ACTIVE
            if(slotBadge) {
                slotBadge.className = "badge px-3 py-2 rounded-pill fw-semibold slot-active-badge";
                slotBadge.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i> Slot Active (Review Allowed)`;
            }

            // Enable All Review Buttons
            document.querySelectorAll("button").forEach(btn => {
                if(btn.innerText.trim() === "Review") {
                    btn.disabled = false;
                    btn.classList.remove("disabled-review-btn");
                    btn.title = "Click to review proposal";
                }
            });

        } else {
            // SLOT IS CLOSED
            if(slotBadge) {
                slotBadge.className = "badge px-3 py-2 rounded-pill fw-semibold slot-closed-badge";
                slotBadge.innerHTML = `<i class="fa-solid fa-circle-xmark me-1"></i> Slot Closed (PMO Timings Only)`;
            }

            // Disable All Review Buttons
            document.querySelectorAll("button").forEach(btn => {
                if(btn.innerText.trim() === "Review") {
                    btn.disabled = true;
                    btn.classList.add("disabled-review-btn");
                    btn.title = "Review is only allowed during PMO time slot (08:00 AM - 08:30 AM)";
                }
            });
        }
    }

    // Run immediately & check every 10 seconds
    checkPMOTimeSlot();
    setInterval(checkPMOTimeSlot, 10000);
});