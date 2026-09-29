document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("settingsForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Portal Settings Updated Successfully!");
    });
  }
});