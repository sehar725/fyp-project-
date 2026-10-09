document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('repoSearchInput');
    const repoTableBody = document.getElementById('repoTableBody');
    const uploadForm = document.getElementById('uploadModalForm');
    const btnLock = document.getElementById('btnLockSubmission');

    // 1. Live Table Search Filter
    if (searchInput && repoTableBody) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            const rows = repoTableBody.querySelectorAll('tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // 2. Upload Modal Form Submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fileType = document.getElementById('modalFileType').value;
            const fileInput = document.getElementById('modalFileInput');

            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                const newRowIndex = repoTableBody.children.length + 1;
                
                // Icon selection
                let iconClass = 'fa-file-lines text-primary';
                if (file.name.endsWith('.pdf')) iconClass = 'fa-file-pdf text-danger';
                else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) iconClass = 'fa-file-word text-primary';
                else if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) iconClass = 'fa-file-zipper text-warning';

                const newRowHtml = `
                    <tr>
                        <td>${newRowIndex}</td>
                        <td>
                            <i class="fa-solid ${iconClass} me-2"></i>
                            <span class="fw-medium text-dark">${file.name}</span>
                        </td>
                        <td><span class="badge bg-secondary-subtle text-secondary px-2 py-1">${fileType}</span></td>
                        <td class="text-secondary">${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-primary rounded-2 px-3 py-1 me-1 btn-download">
                                <i class="fa-solid fa-download me-1"></i> Download
                            </button>
                            <button class="btn btn-sm btn-light text-muted"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </td>
                    </tr>
                `;

                repoTableBody.insertAdjacentHTML('beforeend', newRowHtml);

                // Close modal
                const modalEl = document.getElementById('uploadFileModal');
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                modalInstance.hide();

                uploadForm.reset();
                alert('File uploaded successfully to project repository!');
            }
        });
    }

    // 3. Final Lock Submission Handler
    if (btnLock) {
        btnLock.addEventListener('click', function () {
            if (confirm('Are you sure you want to lock the final submission package? No further changes will be allowed.')) {
                this.classList.replace('btn-success', 'btn-secondary');
                this.disabled = true;
                this.innerHTML = `<i class="fa-solid fa-lock me-1"></i> Package Locked & Submitted`;
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const $ = id => document.getElementById(id);

    const notifBtn = $('notifDropdownBtn'), notifMenu = $('notifMenu');
    const profileBtn = $('profileDropdownBtn'), profileMenu = $('profileMenu');
    const btnEdit = $('btnToggleEdit'), btnLogout = $('btnLogout');
    const fields = ['editName','editEmail','editRollNo','editRole','editProgram','editBatch'].map($);
    const [fName, fEmail, fRoll, fRole, fProgram, fBatch] = fields;

    // Popups
    if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (profileMenu) profileMenu.classList.remove('show');
            notifMenu.classList.toggle('show');
        });
        notifMenu.addEventListener('click', e => e.stopPropagation());
    }
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (notifMenu) notifMenu.classList.remove('show');
            profileMenu.classList.toggle('show');
        });
        profileMenu.addEventListener('click', e => e.stopPropagation());
    }
    document.addEventListener('click', () => {
        if (notifMenu) notifMenu.classList.remove('show');
        if (profileMenu) profileMenu.classList.remove('show');
    });

    // Mark all as read
    const markRead = $('markReadBtn');
    if (markRead) markRead.addEventListener('click', () => {
        const b = $('notifBadge');
        if (b) b.style.display = 'none';
    });

    // Profile data
    function initials(name) {
        if (!name) return 'U';
        const p = name.trim().split(/\s+/);
        return (p.length >= 2 ? p[0][0] + p[1][0] : p[0].slice(0, 2)).toUpperCase();
    }

    function render(p) {
        const ini = initials(p.name);
        if (fName) fName.value = p.name;
        if (fEmail) fEmail.value = p.email;
        if (fRoll) fRoll.value = p.rollNo;
        if (fRole) fRole.value = p.role;
        if (fProgram) fProgram.value = p.program;
        if (fBatch) fBatch.value = p.batch;
        if ($('topbarUserName')) $('topbarUserName').innerText = p.name;
        if ($('topbarUserRole')) $('topbarUserRole').innerText = p.role;
        if ($('topbarAvatarBadge')) $('topbarAvatarBadge').innerText = ini;
        if ($('profileViewName')) $('profileViewName').innerText = p.name;
        if ($('profileViewSubtitle')) $('profileViewSubtitle').innerText = p.role + ' | ' + p.rollNo;
        if ($('popAvatarBadge')) $('popAvatarBadge').innerText = ini;
    }

    let saved = null, user = null;
    try { saved = JSON.parse(localStorage.getItem('userProfile')); } catch (e) {}
    try { user = JSON.parse(localStorage.getItem('user')); } catch (e) {}
    user = user || {};

    render(saved || {
        name: user.name || 'Sehar Babar',
        email: user.email || 'sehar@gmail.com',
        rollNo: user.regNo || user.rollNo || user.username || 'SE-01',
        role: user.role || 'Student',
        program: user.program || 'BS Software Engineering',
        batch: user.batch || '2026'
    });

    // Edit / Save
    if (btnEdit && fName) {
        btnEdit.addEventListener('click', function () {
            const editing = !fName.hasAttribute('readonly');
            if (!editing) {
                fields.forEach(f => f && f.removeAttribute('readonly'));
                fName.focus();
                btnEdit.innerText = 'Save Profile';
                btnEdit.classList.replace('btn-outline-primary', 'btn-success');
            } else {
                const updated = {
                    name: fName.value.trim() || 'User',
                    email: fEmail.value.trim(),
                    rollNo: fRoll.value.trim() || 'N/A',
                    role: fRole.value.trim() || 'Student',
                    program: fProgram.value.trim(),
                    batch: fBatch.value.trim()
                };
                fields.forEach(f => f && f.setAttribute('readonly', 'true'));
                localStorage.setItem('userProfile', JSON.stringify(updated));
                render(updated);
                btnEdit.innerText = 'Edit Profile';
                btnEdit.classList.replace('btn-success', 'btn-outline-primary');
            }
        });
    }

    // Logout
    if (btnLogout) btnLogout.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.clear();
            window.location.href = 'login.html';
        }
    });
});