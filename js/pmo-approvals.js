document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("approvalModal");
  const closeBtn = document.getElementById("closeApprovalModalBtn");
  const viewBtns = document.querySelectorAll(".action-btn");
  const approveBtn = document.getElementById("approveProjectBtn");
  const rejectBtn = document.getElementById("rejectProjectBtn");

  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (modal) modal.classList.add("active");
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (approveBtn) {
    approveBtn.addEventListener("click", () => {
      alert("Project Final Approval Granted Successfully!");
      modal.classList.remove("active");
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      alert("Project Revision Request Sent!");
      modal.classList.remove("active");
    });
  }
});