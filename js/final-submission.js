document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("finalSubmissionForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("🎉 Final project and source code submitted to AI Repository successfully!");
    });
  }
});