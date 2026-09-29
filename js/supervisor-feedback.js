document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("decisionForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const decision = document.querySelector('input[name="decision"]:checked');
      const comments = document.getElementById("feedbackComments").value;

      if (!decision) {
        alert("Please select a decision (Approve, Request Revisions, or Reject).");
        return;
      }

      alert(`Decision Submitted Successfully!\nDecision: ${decision.value}\nComments: ${comments || 'None'}`);
      
      // Redirect back to proposals list
      window.location.href = "supervisor-proposals.html";
    });
  }
});