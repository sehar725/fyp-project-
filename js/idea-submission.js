document.addEventListener('DOMContentLoaded', function () {
    const textareas = document.querySelectorAll('.idea-textarea');
    const form = document.getElementById('ideaSubmissionForm');

    // 1. Dynamic 0/500 Character Counters
    textareas.forEach(textarea => {
        const counter = textarea.nextElementSibling;

        textarea.addEventListener('input', function () {
            const currentLen = this.value.length;
            if (counter && counter.classList.contains('char-counter')) {
                counter.innerText = `${currentLen}/500`;
            }
        });
    });

    // 2. Submit Event Handler (Redirects & Alerts for Supervisor / PMO Review)
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const title1 = document.getElementById('ideaTitle1').value.trim();

            if (!title1) {
                alert('Please fill at least Idea 1 before submitting.');
                return;
            }

            // Simulate forward notification to Supervisor and PMO
            alert('Your FYP Initial Ideas have been submitted successfully!\n\nStatus: Sent to Supervisor and PMO Portal for initial review.');
            
            // Optional: reset or navigate to Dashboard
            // window.location.href = 'dashboard.html';
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