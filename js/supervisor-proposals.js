document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-btn");
  const rows = document.querySelectorAll(".proposal-row");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      rows.forEach((row) => {
        if (filter === "all" || row.getAttribute("data-status") === filter) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});