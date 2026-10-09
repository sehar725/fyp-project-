document.addEventListener("DOMContentLoaded", function () {
    // Dummy Data for Meetings Logs
    let meetingLogs = [
        { id: 1, date: "05 Sep 2026", time: "10:00 AM", supervisor: "Dr. Ayesha Khan", project: "AI-Powered Smart Attendance (Group 1)", mode: "In-Person", status: "Completed" },
        { id: 2, date: "07 Sep 2026", time: "11:30 AM", supervisor: "Prof. Usman Ali", project: "E-Learning Platform (Group 2)", mode: "Online", status: "Completed" },
        { id: 3, date: "12 Sep 2026", time: "02:00 PM", supervisor: "Dr. Tariq Mehmood", project: "Smart Energy System (Group 3)", mode: "In-Person", status: "Scheduled" },
        { id: 4, date: "15 Sep 2026", time: "09:30 AM", supervisor: "Dr. Ayesha Khan", project: "Health Monitoring App (Group 5)", mode: "Online", status: "Scheduled" }
    ];

    //  Data for Supervisor Timetable
    let timetableData = [
        { supervisor: "Dr. Ayesha Khan", day: "Monday", slot: "09:00 AM - 11:00 AM", venue: "Office #102", status: "Available" },
        { supervisor: "Dr. Ayesha Khan", day: "Wednesday", slot: "02:00 PM - 04:00 PM", venue: "Office #102", status: "Busy" },
        { supervisor: "Prof. Usman Ali", day: "Tuesday", slot: "10:00 AM - 12:00 PM", venue: "Lab 3", status: "Available" },
        { supervisor: "Prof. Usman Ali", day: "Thursday", slot: "11:00 AM - 01:00 PM", venue: "Lab 3", status: "Available" },
        { supervisor: "Dr. Tariq Mehmood", day: "Friday", slot: "09:00 AM - 11:30 AM", venue: "Office #204", status: "Available" }
    ];

    // DOM Elements
    const meetingsTbody = document.getElementById("meetingsTbody");
    const timetableTbody = document.getElementById("timetableTbody");
    const supervisorFilter = document.getElementById("supervisorFilter");
    const statusFilter = document.getElementById("statusFilter");
    const searchInput = document.getElementById("searchInput");

    const modal = document.getElementById("logModal");
    const openBtn = document.getElementById("openLogModalBtn");
    const closeBtn = document.getElementById("closeLogModalBtn");
    const form = document.getElementById("logMeetingForm");

    // Render Meetings Table
    function renderMeetings(data) {
        if (!meetingsTbody) return;
        meetingsTbody.innerHTML = "";

        if (data.length === 0) {
            meetingsTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: #888;">No meeting logs found.</td></tr>`;
            return;
        }

        data.forEach(item => {
            const statusClass = item.status === "Completed" ? "badge-completed" : "badge-scheduled";
            const modeClass = item.mode === "Online" ? "badge-online" : "badge-inperson";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td><strong>${item.supervisor}</strong></td>
                <td>${item.project}</td>
                <td><span class="badge ${modeClass}">${item.mode}</span></td>
                <td><span class="badge ${statusClass}">${item.status}</span></td>
                <td><button style="border:none; background:none; color:#2563eb; cursor:pointer;" onclick="viewDetails(${item.id})">View Log</button></td>
            `;
            meetingsTbody.appendChild(tr);
        });
    }

    // Render Timetable Table
    function renderTimetable(data) {
        if (!timetableTbody) return;
        timetableTbody.innerHTML = "";

        data.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${item.supervisor}</strong></td>
                <td>${item.day}</td>
                <td>${item.slot}</td>
                <td>${item.venue}</td>
                <td><span class="badge ${item.status === 'Available' ? 'badge-completed' : 'badge-pending'}">${item.status}</span></td>
            `;
            timetableTbody.appendChild(tr);
        });
    }

    // Filters Application Logic
    function applyFilters() {
        let filteredMeetings = [...meetingLogs];
        let filteredTimetable = [...timetableData];

        const supVal = supervisorFilter.value;
        const statusVal = statusFilter.value;
        const searchVal = searchInput.value.toLowerCase().trim();

        if (supVal !== "All") {
            filteredMeetings = filteredMeetings.filter(m => m.supervisor === supVal);
            filteredTimetable = filteredTimetable.filter(t => t.supervisor === supVal);
        }

        if (statusVal !== "All") {
            filteredMeetings = filteredMeetings.filter(m => m.status === statusVal);
        }

        if (searchVal) {
            filteredMeetings = filteredMeetings.filter(m => 
                m.project.toLowerCase().includes(searchVal) || 
                m.supervisor.toLowerCase().includes(searchVal)
            );
        }

        renderMeetings(filteredMeetings);
        renderTimetable(filteredTimetable);
    }

    // Tab Switcher Function
    window.switchTab = function (tab) {
        const meetingsView = document.getElementById("meetingsView");
        const timetableView = document.getElementById("timetableView");
        const tabMeetingsBtn = document.getElementById("tabMeetingsBtn");
        const tabTimetableBtn = document.getElementById("tabTimetableBtn");

        if (tab === 'meetings') {
            meetingsView.style.display = "block";
            timetableView.style.display = "none";
            tabMeetingsBtn.classList.add("active");
            tabTimetableBtn.classList.remove("active");
            statusFilter.style.display = "inline-block";
        } else {
            meetingsView.style.display = "none";
            timetableView.style.display = "block";
            tabMeetingsBtn.classList.remove("active");
            tabTimetableBtn.classList.add("active");
            statusFilter.style.display = "none";
        }
    };

    // Modal Operations
    if (openBtn && modal) openBtn.onclick = () => modal.classList.add("active");
    if (closeBtn && modal) closeBtn.onclick = () => modal.classList.remove("active");

    // Add New Meeting Form Handler
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const sup = document.getElementById("modalSupervisor").value;
            const project = document.getElementById("modalProject").value;
            const rawDate = new Date(document.getElementById("modalDate").value);
            const rawTime = document.getElementById("modalTime").value;
            const mode = document.getElementById("modalMode").value;
            const status = document.getElementById("modalStatus").value;

            const formattedDate = rawDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            
            // Format time 12hr AM/PM
            let timeParts = rawTime.split(":");
            let hours = parseInt(timeParts[0]);
            let ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            let formattedTime = `${hours < 10 ? '0' + hours : hours}:${timeParts[1]} ${ampm}`;

            const newLog = {
                id: Date.now(),
                date: formattedDate,
                time: formattedTime,
                supervisor: sup,
                project: project,
                mode: mode,
                status: status
            };

            meetingLogs.unshift(newLog);
            applyFilters();

            alert("Meeting Log Saved Successfully!");
            form.reset();
            modal.classList.remove("active");
        });
    }

    // View Log Alert Details
    window.viewDetails = function (id) {
        const item = meetingLogs.find(m => m.id === id);
        if (item) {
            alert(`Meeting Details Log:\n\nSupervisor: ${item.supervisor}\nGroup/Project: ${item.project}\nDate & Time: ${item.date} at ${item.time}\nMode: ${item.mode}\nStatus: ${item.status}`);
        }
    };

    // Filter Listeners
    supervisorFilter.addEventListener("change", applyFilters);
    statusFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    // Initial Load
    renderMeetings(meetingLogs);
    renderTimetable(timetableData);
});