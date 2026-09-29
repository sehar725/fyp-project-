document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("groupModal");
  const openBtn = document.getElementById("openGroupModalBtn");
  const closeBtn = document.getElementById("closeGroupModalBtn");
  const form = document.getElementById("groupForm");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("New FYP Group Created Successfully!");
      modal.classList.remove("active");
    });
  }
});