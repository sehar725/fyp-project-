document.addEventListener("DOMContentLoaded", function () {
    // Current Supervisor Details
    const supervisorName = "Dr. Ayesha Khan";

    // Initial Supervisor Slots Data
    let mySlots = [
        { id: 1, day: "Monday", timeSlot: "09:00 AM - 11:00 AM", venue: "Office #102", status: "Available" },
        { id: 2, day: "Wednesday", timeSlot: "02:00 PM - 04:00 PM", venue: "Office #102", status: "Busy" }
    ];

    const tbody = document.getElementById("supervisorTimetableBody");
    const form = document.getElementById("addSlotForm");

    // Render Slots in Table
    function renderSlots() {
        if (!tbody) return;
        tbody.innerHTML = "";

        if (mySlots.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No timetable slots uploaded yet.</td></tr>`;
            return;
        }

        mySlots.forEach(slot => {
            const badgeClass = slot.status === "Available" ? "badge-avail" : "badge-busy";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${slot.day}</strong></td>
                <td>${slot.timeSlot}</td>
                <td>${slot.venue}</td>
                <td><span class="${badgeClass}">${slot.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-danger py-0" style="font-size: 11px;" onclick="deleteSlot(${slot.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Time Formatting Helper Function
    function formatTime(timeStr) {
        if (!timeStr) return "";
        let parts = timeStr.split(":");
        let hours = parseInt(parts[0]);
        let minutes = parts[1];
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours < 10 ? '0' + hours : hours}:${minutes} ${ampm}`;
    }

    // Handle Slot Upload Submit
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const day = document.getElementById("slotDay").value;
            const startTime = document.getElementById("slotStartTime").value;
            const endTime = document.getElementById("slotEndTime").value;
            const venue = document.getElementById("slotVenue").value;

            const formattedTimeSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;

            const newSlot = {
                id: Date.now(),
                day: day,
                timeSlot: formattedTimeSlot,
                venue: venue,
                status: "Available"
            };

            mySlots.push(newSlot);
            renderSlots();

            alert(`Timetable slot successfully uploaded for PMO View!\nDay: ${day}\nSlot: ${formattedTimeSlot}`);
            form.reset();
        });
    }

    // Delete Slot Function
    window.deleteSlot = function (id) {
        if (confirm("Are you sure you want to remove this timetable slot?")) {
            mySlots = mySlots.filter(s => s.id !== id);
            renderSlots();
        }
    };

    // Initial Load
    renderSlots();
});