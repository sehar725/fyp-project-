document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("scheduleModal");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("scheduleForm");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Evaluation Timetable Schedule Created Successfully!");
      modal.classList.remove("active");
    });
  }
});