document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("slotModal");
  const openBtn = document.getElementById("openSlotModalBtn");
  const closeBtn = document.getElementById("closeSlotModalBtn");
  const form = document.getElementById("slotForm");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Time Slot & Venue Allocated Successfully!");
      modal.classList.remove("active");
    });
  }
});