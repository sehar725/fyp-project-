document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Dynamic Greeting based on time
  const welcomeHeading = document.querySelector(".welcome-header h2");
  if (welcomeHeading) {
    const hours = new Date().getHours();
    let greeting = "Good Morning";
    if (hours >= 12 && hours < 17) {
      greeting = "Good Afternoon";
    } else if (hours >= 17) {
      greeting = "Good Evening";
    }
    welcomeHeading.textContent = `${greeting}, Sehar Babar!`;
  }

  // 2. Sidebar Navigation Active Link Toggle
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".sidebar-nav ul li a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      // Remove active from all
      document.querySelectorAll(".sidebar-nav ul li").forEach(li => li.classList.remove("active"));
      // Add active to parent li
      link.parentElement.classList.add("active");
    }
  });

  // 3. Radial Progress Circle Animation
  function setRadialProgress(percent) {
    const radial = document.querySelector(".radial-progress");
    const percentVal = document.querySelector(".percent-val");
    if (radial && percentVal) {
      const degrees = (percent / 100) * 360;
      radial.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, var(--bg-color) ${degrees}deg)`;
      percentVal.textContent = `${percent}%`;
    }
  }

  // Set initial overall progress (e.g., 0% currently)
  setRadialProgress(0);

  // 4. Search Filter Functionality (Mock Example)
  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      const query = e.target.value.toLowerCase().trim();
      if (e.key === "Enter" && query !== "") {
        alert(`Searching for: "${query}" across the portal...`);
      }
    });
  }

  // 5. User Profile Dropdown Simulation
  const userChip = document.querySelector(".user-chip");
  if (userChip) {
    userChip.addEventListener("click", function () {
      alert("Profile menu clicked! Redirecting to settings page...");
      window.location.href = "settings.html";
    });
  }

});