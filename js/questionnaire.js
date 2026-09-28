document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feasibilityForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("🎉 Feasibility Questionnaire submitted successfully!");
    });
  }
});