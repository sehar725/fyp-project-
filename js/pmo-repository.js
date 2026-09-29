document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("uploadModal");
  const openBtn = document.getElementById("openUploadModalBtn");
  const closeBtn = document.getElementById("closeUploadModalBtn");
  const form = document.getElementById("uploadForm");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Document Uploaded to Repository Successfully!");
      modal.classList.remove("active");
    });
  }
});