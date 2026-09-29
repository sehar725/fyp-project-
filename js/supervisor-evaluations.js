document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".marks-input");
  const totalDisplay = document.getElementById("totalScore");
  const gradeDisplay = document.getElementById("finalGrade");
  const form = document.getElementById("evaluationForm");

  function calculateTotal() {
    let total = 0;
    inputs.forEach((input) => {
      const val = parseFloat(input.value) || 0;
      total += val;
    });

    totalDisplay.textContent = `${total} / 100`;

    // Grade calculation logic
    if (total >= 85) {
      gradeDisplay.textContent = "Grade: A";
    } else if (total >= 70) {
      gradeDisplay.textContent = "Grade: B";
    } else if (total >= 50) {
      gradeDisplay.textContent = "Grade: C";
    } else {
      gradeDisplay.textContent = "Grade: F";
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", calculateTotal);
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Final Evaluation Submitted Successfully!");
    });
  }
});