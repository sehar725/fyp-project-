document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("userModal");
  const openBtn = document.getElementById("openUserModalBtn");
  const closeBtn = document.getElementById("closeUserModalBtn");
  const form = document.getElementById("userForm");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("New User Added Successfully!");
      modal.classList.remove("active");
    });
  }
});