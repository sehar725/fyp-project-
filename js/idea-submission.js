document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Dynamic Character Counter for Descriptions (0/500)
  const ideaCards = document.querySelectorAll(".idea-card");

  ideaCards.forEach((card) => {
    const textarea = card.querySelector(".textarea-field");
    const charCount = card.querySelector(".char-count");
    const maxLength = 500;

    if (textarea && charCount) {
      textarea.addEventListener("input", function () {
        const currentLength = textarea.value.length;
        
        // Truncate if exceeds limit
        if (currentLength > maxLength) {
          textarea.value = textarea.value.substring(0, maxLength);
        }

        charCount.textContent = `${textarea.value.length}/${maxLength}`;

        // Turn counter text red when reaching close to limit
        if (textarea.value.length >= 450) {
          charCount.style.color = "#ef4444";
        } else {
          charCount.style.color = "#64748b";
        }
      });
    }
  });

  // 2. Form Validation & Submission
  const submitBtn = document.getElementById("submit-ideas-btn");
  const ideaForm = document.getElementById("idea-form");

  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const idea1Title = document.getElementById("idea1-title").value.trim();
      const idea1Desc = document.getElementById("idea1-desc").value.trim();

      // Ensure at least Idea 1 is filled
      if (!idea1Title || !idea1Desc) {
        alert("At least Idea 1 Title and Description must be filled out!");
        document.getElementById("idea1-title").focus();
        return;
      }

      // Collect Data
      const submittedIdeas = [
        {
          title: idea1Title,
          desc: idea1Desc
        },
        {
          title: document.getElementById("idea2-title").value.trim(),
          desc: document.getElementById("idea2-desc").value.trim()
        },
        {
          title: document.getElementById("idea3-title").value.trim(),
          desc: document.getElementById("idea3-desc").value.trim()
        }
      ].filter(idea => idea.title !== ""); // Filter out empty submissions

      // UI Feedback Simulation
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;

      setTimeout(() => {
        alert("Success! Your initial project ideas have been submitted successfully.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Ideas`;
        
        // Optional: Redirect to Final Idea Submission page or Dashboard
        window.location.href = "final-idea.html";
      }, 1200);
    });
  }

});