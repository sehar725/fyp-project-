document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("panelModal");
  const openBtn = document.getElementById("openPanelModalBtn");
  const closeBtn = document.getElementById("closePanelModalBtn");
  const form = document.getElementById("panelForm");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Evaluation Panel Assigned Successfully!");
      modal.classList.remove("active");
    });
  }
});