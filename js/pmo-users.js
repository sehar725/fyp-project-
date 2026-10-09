// Initial User Data
let users = [
    { id: 1, name: "Dr. Ayesha Khan", email: "ayesha.khan@gims.edu.pk", role: "PMO Admin", dept: "Computer Science", status: "Active" },
    { id: 2, name: "Dr. Usman Tariq", email: "usman.tariq@gims.edu.pk", role: "Faculty / Teacher", dept: "Software Engineering", status: "Active" },
    { id: 3, name: "Ali Raza", email: "ali.raza@student.gims.edu.pk", role: "Student", dept: "Computer Science", status: "Active" },
    { id: 4, name: "Dr. Imran Malik", email: "imran.malik@gims.edu.pk", role: "Faculty / Teacher", dept: "Information Technology", status: "Active" }
];

let userModal = null;

document.addEventListener("DOMContentLoaded", function() {
    const modalElement = document.getElementById('userModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        userModal = new bootstrap.Modal(modalElement);
    }

    // Attach Event Listeners to Dropdowns and Search
    const roleSelect = document.getElementById('roleFilter') || document.querySelectorAll('select')[0];
    const statusSelect = document.getElementById('statusFilter') || document.querySelectorAll('select')[1];
    const searchInput = document.getElementById('searchInput') || document.querySelector('input[type="text"]');

    if (roleSelect) roleSelect.addEventListener('change', filterUsers);
    if (statusSelect) statusSelect.addEventListener('change', filterUsers);
    if (searchInput) searchInput.addEventListener('input', filterUsers);

    renderUsers(users);
});

// Render Table Function
function renderUsers(data) {
    const tbody = document.getElementById('userTableBody') || document.querySelector('tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No users found.</td></tr>`;
        return;
    }

    data.forEach(user => {
        let roleBadge = '';
        const roleClean = user.role.toLowerCase();

        if (roleClean.includes('pmo')) {
            roleBadge = `<span class="badge bg-primary-subtle text-primary fw-semibold px-2 py-1 rounded">PMO Head</span>`;
        } else if (roleClean.includes('faculty') || roleClean.includes('teacher')) {
            roleBadge = `<span class="badge bg-success-subtle text-success fw-semibold px-2 py-1 rounded">Faculty</span>`;
        } else if (roleClean.includes('student')) {
            roleBadge = `<span class="badge bg-danger-subtle text-danger fw-semibold px-2 py-1 rounded">Student</span>`;
        } else {
            roleBadge = `<span class="badge bg-secondary-subtle text-secondary fw-semibold px-2 py-1 rounded">${user.role}</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="ps-3 py-3 fw-bold text-dark">${user.name}</td>
            <td class="py-3 text-secondary">${user.email}</td>
            <td class="py-3">${roleBadge}</td>
            <td class="py-3 text-secondary">${user.dept}</td>
            <td class="text-end pe-4 py-3">
                <button class="action-btn-edit btn btn-link p-0 text-primary text-decoration-none me-3 fw-semibold" onclick="editUser(${user.id})">Edit</button>
                <button class="action-btn-delete btn btn-link p-0 text-danger text-decoration-none fw-semibold" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Role and Status Filter Logic
function filterUsers() {
    const roleSelect = document.getElementById('roleFilter') || document.querySelectorAll('select')[0];
    const statusSelect = document.getElementById('statusFilter') || document.querySelectorAll('select')[1];
    const searchInput = document.getElementById('searchInput') || document.querySelector('input[type="text"]');

    const roleVal = roleSelect ? roleSelect.value.trim() : 'All Roles';
    const statusVal = statusSelect ? statusSelect.value.trim() : 'All Statuses';
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchVal) || u.email.toLowerCase().includes(searchVal);
        
        let matchesRole = true;
        if (roleVal !== '' && !roleVal.includes('All')) {
            if (roleVal === 'Student') matchesRole = u.role.includes('Student');
            else if (roleVal.includes('Faculty') || roleVal.includes('Teacher')) matchesRole = u.role.includes('Faculty') || u.role.includes('Teacher');
            else if (roleVal.includes('PMO')) matchesRole = u.role.includes('PMO');
        }

        let matchesStatus = true;
        if (statusVal !== '' && !statusVal.includes('All')) {
            matchesStatus = (u.status === statusVal);
        }

        return matchesSearch && matchesRole && matchesStatus;
    });

    renderUsers(filtered);
}

// Open Modal for Editing User
function editUser(id) {
    const user = users.find(u => u.id == id);
    if (!user) return;

    const modalTitle = document.getElementById('modalTitle');
    const userId = document.getElementById('userId');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userRole = document.getElementById('userRole');

    if (modalTitle) modalTitle.innerText = "Edit User Account";
    if (userId) userId.value = user.id;
    if (userName) userName.value = user.name;
    if (userEmail) userEmail.value = user.email;
    if (userRole) userRole.value = user.role;

    if (userModal) {
        userModal.show();
    } else {
        const modalElement = document.getElementById('userModal');
        if (modalElement) {
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
        }
    }
}

// Delete User Row
function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        users = users.filter(u => u.id != id);
        filterUsers();
    }
}

// Open Add User Modal Simple Trigger
function openAddModal() {
    const form = document.getElementById('userForm');
    if (form) form.reset();

    if (userModal) {
        userModal.show();
    } else {
        const modalElement = document.getElementById('userModal');
        if (modalElement) {
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
        }
    }
}