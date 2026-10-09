document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Schedules Data Array
    let schedulesData = [
        {
            id: 1,
            date: "22 Aug 2026",
            time: "09:00 AM",
            projectTitle: "AI-Powered Smart Attendance",
            group: "Group 1",
            venue: "Room 101",
            status: "Scheduled"
        },
        {
            id: 2,
            date: "23 Aug 2026",
            time: "11:00 AM",
            projectTitle: "E-Learning Platform",
            group: "Group 2",
            venue: "Room 102",
            status: "Scheduled"
        },
        {
            id: 3,
            date: "25 Aug 2026",
            time: "01:00 PM",
            projectTitle: "Smart Energy System",
            group: "Group 3",
            venue: "Room 201",
            status: "Scheduled"
        },
        {
            id: 4,
            date: "27 Aug 2026",
            time: "02:30 PM",
            projectTitle: "Travel Booking App",
            group: "Group 4",
            venue: "Room 103",
            status: "Scheduled"
        },
        {
            id: 5,
            date: "29 Aug 2026",
            time: "09:00 AM",
            projectTitle: "Health Monitoring App",
            group: "Group 5",
            venue: "Room 202",
            status: "Scheduled"
        }
    ];

    // DOM Elements Reference
    const modal = document.getElementById("scheduleModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("scheduleForm");
    const tbody = document.querySelector(".data-table tbody");

    const filterSelect = document.querySelector(".filter-select");
    const searchInput = document.querySelector(".search-box input");

    // Render Table Function
    function renderTable(data) {
        if (!tbody) return;
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: #888;">No schedule records found.</td></tr>`;
            return;
        }

        data.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td><strong>${item.projectTitle}</strong></td>
                <td>${item.group}</td>
                <td>${item.venue}</td>
                <td><span class="status-badge badge-scheduled">${item.status}</span></td>
                <td><button class="action-btn" data-id="${item.id}">View</button></td>
            `;
            tbody.appendChild(tr);
        });

        attachActionEvents();
    }

    // Attach View Button Click Handlers
    function attachActionEvents() {
        document.querySelectorAll(".action-btn").forEach(btn => {
            btn.onclick = function () {
                const id = parseInt(this.getAttribute("data-id"));
                const schedule = schedulesData.find(s => s.id === id);
                if (schedule) {
                    alert(
                        `Evaluation Schedule Details:\n\n` +
                        `Project: ${schedule.projectTitle}\n` +
                        `Group: ${schedule.group}\n` +
                        `Date: ${schedule.date}\n` +
                        `Time: ${schedule.time}\n` +
                        `Venue: ${schedule.venue}\n` +
                        `Status: ${schedule.status}`
                    );
                }
            };
        });
    }

    // Filter and Search Logic
    function applyFilters() {
        let filtered = [...schedulesData];

        const searchKeyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

        if (searchKeyword) {
            filtered = filtered.filter(item =>
                item.projectTitle.toLowerCase().includes(searchKeyword) ||
                item.group.toLowerCase().includes(searchKeyword) ||
                item.venue.toLowerCase().includes(searchKeyword)
            );
        }

        renderTable(filtered);
    }

    // Event Listeners for Filters
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
    if (filterSelect) {
        filterSelect.addEventListener("change", applyFilters);
    }

    // Modal Control Handlers
    if (openBtn && modal) {
        openBtn.addEventListener("click", () => modal.classList.add("active"));
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    // Create Schedule Form Submit Handler
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const projectSelect = form.querySelector("select");
            const dateInput = form.querySelector('input[type="date"]');
            const timeInput = form.querySelector('input[type="time"]');
            const venueInput = form.querySelector('input[type="text"]');

            if (projectSelect && dateInput && timeInput && venueInput) {
                // Date formatting for UI (e.g. 2026-09-10 -> 10 Sep 2026)
                const rawDate = new Date(dateInput.value);
                const formattedDate = isNaN(rawDate) ? dateInput.value : rawDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });

                // Time formatting for UI (24hr to 12hr AM/PM)
                let formattedTime = timeInput.value;
                if (formattedTime) {
                    const timeParts = formattedTime.split(":");
                    let hours = parseInt(timeParts[0]);
                    const minutes = timeParts[1];
                    const ampm = hours >= 12 ? "PM" : "AM";
                    hours = hours % 12 || 12;
                    formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes} ${ampm}`;
                }

                const newSchedule = {
                    id: Date.now(),
                    date: formattedDate,
                    time: formattedTime,
                    projectTitle: projectSelect.value,
                    group: "Group " + (schedulesData.length + 1),
                    venue: venueInput.value,
                    status: "Scheduled"
                };

                schedulesData.unshift(newSchedule);
                applyFilters();

                alert("Evaluation Timetable Schedule Created Successfully!");
                form.reset();
                if (modal) modal.classList.remove("active");
            }
        });
    }

    // Initial Load
    renderTable(schedulesData);
});