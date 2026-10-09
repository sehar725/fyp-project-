document.addEventListener('DOMContentLoaded', function () {
    const filterDomain = document.getElementById('filterDomain');
    const filterTech = document.getElementById('filterTech');
    const filterYear = document.getElementById('filterYear');
    const filterKeyword = document.getElementById('filterKeyword');
    const tableBody = document.getElementById('approvedProjectsTableBody');
    const noMatchAlert = document.getElementById('noMatchAlert');

    // Filter Logic for Approved Projects Table
    function filterTable() {
        if (!tableBody) return;

        const domainVal = filterDomain ? filterDomain.value.toLowerCase() : 'all';
        const techVal = filterTech ? filterTech.value.toLowerCase() : 'all';
        const yearVal = filterYear ? filterYear.value.toLowerCase() : 'all';
        const keywordVal = filterKeyword ? filterKeyword.value.toLowerCase().trim() : '';

        const rows = tableBody.querySelectorAll('tr');
        let visibleCount = 0;

        rows.forEach(row => {
            const rowDomain = (row.getAttribute('data-domain') || '').toLowerCase();
            const rowTech = (row.getAttribute('data-tech') || '').toLowerCase();
            const rowYear = (row.getAttribute('data-year') || '').toLowerCase();
            const rowText = row.innerText.toLowerCase();

            const matchesDomain = (domainVal === 'all' || rowDomain === domainVal);
            const matchesTech = (techVal === 'all' || rowTech === techVal);
            const matchesYear = (yearVal === 'all' || rowYear === yearVal);
            const matchesKeyword = (keywordVal === '' || rowText.includes(keywordVal));

            if (matchesDomain && matchesTech && matchesYear && matchesKeyword) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        if (noMatchAlert) {
            if (visibleCount === 0) {
                noMatchAlert.classList.remove('d-none');
            } else {
                noMatchAlert.classList.add('d-none');
            }
        }
    }

    // Attach Event Listeners to Controls
    if (filterDomain) filterDomain.addEventListener('change', filterTable);
    if (filterTech) filterTech.addEventListener('change', filterTable);
    if (filterYear) filterYear.addEventListener('change', filterTable);
    if (filterKeyword) filterKeyword.addEventListener('input', filterTable);

    // Modal View Details Trigger Logic
    const viewButtons = document.querySelectorAll('.btn-view-details');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            const domain = this.getAttribute('data-domain');
            const supervisor = this.getAttribute('data-supervisor');
            const year = this.getAttribute('data-year');
            const desc = this.getAttribute('data-desc');

            document.getElementById('modalProjectTitle').innerText = title;
            document.getElementById('modalProjectDomain').innerText = domain;
            document.getElementById('modalProjectSupervisor').innerText = supervisor;
            document.getElementById('modalProjectYear').innerText = year;
            document.getElementById('modalProjectDesc').innerText = desc;

            const modalEl = document.getElementById('projectDetailsModal');
            const modalInstance = new bootstrap.Modal(modalEl);
            modalInstance.show();
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {

    // ---------- Elements (sab ids se, dashboard jaisa) ----------
    const notifBtn = document.getElementById('notifDropdownBtn');
    const notifMenu = document.getElementById('notifMenu');
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileMenu = document.getElementById('profileMenu');
    const markReadBtn = document.getElementById('markReadBtn');
    const btnToggleEdit = document.getElementById('btnToggleEdit');
    const btnLogout = document.getElementById('btnLogout');

    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editRollNo = document.getElementById('editRollNo');
    const editRole = document.getElementById('editRole');
    const editProgram = document.getElementById('editProgram');
    const editBatch = document.getElementById('editBatch');

    const topbarUserName = document.getElementById('topbarUserName');
    const topbarUserRole = document.getElementById('topbarUserRole');
    const topbarAvatarBadge = document.getElementById('topbarAvatarBadge');
    const profileViewName = document.getElementById('profileViewName');
    const profileViewSubtitle = document.getElementById('profileViewSubtitle');
    const popAvatarBadge = document.getElementById('popAvatarBadge');

    // ---------- Popup open / close ----------
    if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (profileMenu) profileMenu.classList.remove('show');
            notifMenu.classList.toggle('show');
        });
        notifMenu.addEventListener('click', e => e.stopPropagation());
    }

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (notifMenu) notifMenu.classList.remove('show');
            profileMenu.classList.toggle('show');
        });
        profileMenu.addEventListener('click', e => e.stopPropagation());
    }

    document.addEventListener('click', function () {
        if (notifMenu) notifMenu.classList.remove('show');
        if (profileMenu) profileMenu.classList.remove('show');
    });

    // ---------- Mark all as read ----------
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function () {
            const badge = document.getElementById('notifBadge');
            if (badge) badge.style.display = 'none';
        });
    }

    // ---------- Helpers ----------
    function getInitials(name) {
        if (!name) return 'U';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return parts[0].slice(0, 2).toUpperCase();
    }

    function updateProfileUI(p) {
        const initials = getInitials(p.name);

        if (editName) editName.value = p.name;
        if (editEmail) editEmail.value = p.email;
        if (editRollNo) editRollNo.value = p.rollNo;
        if (editRole) editRole.value = p.role;
        if (editProgram) editProgram.value = p.program;
        if (editBatch) editBatch.value = p.batch;

        if (topbarUserName) topbarUserName.innerText = p.name;
        if (topbarUserRole) topbarUserRole.innerText = p.role;
        if (topbarAvatarBadge) topbarAvatarBadge.innerText = initials;

        if (profileViewName) profileViewName.innerText = p.name;
        if (profileViewSubtitle) profileViewSubtitle.innerText = p.role + ' | ' + p.rollNo;
        if (popAvatarBadge) popAvatarBadge.innerText = initials;
    }

    // ---------- Load data: pehle Edit se save kiya hua, warna login wala user ----------
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem('userProfile')); } catch (e) {}

    let user = null;
    try { user = JSON.parse(localStorage.getItem('user')); } catch (e) {}
    user = user || {};

    const profile = saved || {
        name: user.name || 'Student',
        email: user.email || '',
        rollNo: user.regNo || user.rollNo || user.registrationNumber || user.username || 'N/A',
        role: user.role || 'Student',
        program: user.program || 'BS Software Engineering',
        batch: user.batch || '2026'
    };

    updateProfileUI(profile);

    // ---------- Edit / Save profile ----------
    if (btnToggleEdit) {
        btnToggleEdit.addEventListener('click', function () {
            const inputs = [editName, editEmail, editRollNo, editRole, editProgram, editBatch];
            const isEditing = !editName.hasAttribute('readonly');

            if (!isEditing) {
                inputs.forEach(i => i && i.removeAttribute('readonly'));
                editName.focus();
                btnToggleEdit.innerText = 'Save Profile';
                btnToggleEdit.classList.replace('btn-outline-primary', 'btn-success');
            } else {
                const updated = {
                    name: editName.value.trim() || 'User',
                    email: editEmail.value.trim(),
                    rollNo: editRollNo.value.trim() || 'N/A',
                    role: editRole.value.trim() || 'Student',
                    program: editProgram.value.trim(),
                    batch: editBatch.value.trim()
                };

                inputs.forEach(i => i && i.setAttribute('readonly', 'true'));
                localStorage.setItem('userProfile', JSON.stringify(updated));
                updateProfileUI(updated);

                btnToggleEdit.innerText = 'Edit Profile';
                btnToggleEdit.classList.replace('btn-success', 'btn-outline-primary');
            }
        });
    }

    // ---------- Logout ----------
    if (btnLogout) {
        btnLogout.addEventListener('click', function () {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }

    // ---------- Textarea counter ----------
    const descInput = document.getElementById('projectDescInput');
    const charCounter = document.getElementById('charCounter');
    if (descInput && charCounter) {
        descInput.addEventListener('input', function () {
            charCounter.innerText = this.value.length + '/1000';
        });
    }

    // ---------- Form submit ----------
    const form = document.getElementById('ideaCheckerForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            runAIChecker();
        });
    }
});