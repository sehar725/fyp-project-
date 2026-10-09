document.addEventListener('DOMContentLoaded', function () {
    const dashboardSearch = document.getElementById('dashboardSearch');
    const notificationList = document.getElementById('notificationList');
    const btnEvaluationDetails = document.getElementById('btnEvaluationDetails');

    // Filter Notifications via Dashboard Topbar Search
    if (dashboardSearch && notificationList) {
        dashboardSearch.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            const items = notificationList.querySelectorAll('li');

            items.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
    const bellIcon = document.querySelector('.topbar-user .fa-bell');
    const profileSection = document.querySelector('.topbar-user .avatar-badge')?.parentElement;

    // Bell Icon Click Event
    if (bellIcon) {
        bellIcon.addEventListener('click', function (e) {
            window.location.href = 'notifications.html';
        });
    }

    // Profile Click Event
    if (profileSection) {
        profileSection.style.cursor = 'pointer';
        profileSection.addEventListener('click', function (e) {
            window.location.href = 'profile.html';
        });
    }
});

    // Evaluation Button Click Notice
    if (btnEvaluationDetails) {
        btnEvaluationDetails.addEventListener('click', function () {
            alert('Evaluation Venue: Lab 2\nTime Slot: 10:00 AM - 12:00 PM\nDate: 15 Dec 2026\nStatus: Confirmed by PMO');
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {

    // Popover Controls & Toggle Logic
    const notifBtn = document.getElementById('notifDropdownBtn');
    const notifMenu = document.getElementById('notifMenu');
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (profileMenu) profileMenu.classList.remove('show');
            notifMenu.classList.toggle('show');
        });
    }

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (notifMenu) notifMenu.classList.remove('show');
            profileMenu.classList.toggle('show');
        });
    }

    // Outside Click to Hide Menus
    document.addEventListener('click', function (e) {
        if (notifMenu && !notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
            notifMenu.classList.remove('show');
        }
        if (profileMenu && !profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
            profileMenu.classList.remove('show');
        }
    });

    // Clear Notification Badge
    const markReadBtn = document.getElementById('markReadBtn');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function () {
            const badge = document.getElementById('notifBadge');
            if (badge) badge.style.display = 'none';
        });
    }

    // Dynamic Elements Reference
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

    // Initials Generator Function
    function getInitials(name) {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0].slice(0, 2).toUpperCase();
    }

    // Sync UI Function
    function updateProfileUI(profileData) {
        const initials = getInitials(profileData.name);

        if (editName) editName.value = profileData.name;
        if (editEmail) editEmail.value = profileData.email;
        if (editRollNo) editRollNo.value = profileData.rollNo;
        if (editRole) editRole.value = profileData.role;
        if (editProgram) editProgram.value = profileData.program;
        if (editBatch) editBatch.value = profileData.batch;

        if (topbarUserName) topbarUserName.innerText = profileData.name;
        if (topbarUserRole) topbarUserRole.innerText = profileData.role;
        if (topbarAvatarBadge) topbarAvatarBadge.innerText = initials;

        if (profileViewName) profileViewName.innerText = profileData.name;
        if (profileViewSubtitle) profileViewSubtitle.innerText = `${profileData.role} | ${profileData.rollNo}`;
        if (popAvatarBadge) popAvatarBadge.innerText = initials;
    }

    // Load Saved Data
    const savedData = JSON.parse(localStorage.getItem('userProfile')) || {
        name: 'Sehar Babar',
        email: 'sehar@gmail.com',
        rollNo: 'SE-01',
        role: 'Student',
        program: 'BS Software Engineering',
        batch: '2026'
    };

    updateProfileUI(savedData);

    // Edit/Save Profile Functionality
    if (btnToggleEdit) {
        btnToggleEdit.addEventListener('click', function () {
            const inputs = [editName, editEmail, editRollNo, editRole, editProgram, editBatch];
            const isEditing = !editName.hasAttribute('readonly');

            if (!isEditing) {
                inputs.forEach(input => input && input.removeAttribute('readonly'));
                editName.focus();
                btnToggleEdit.innerText = 'Save Profile';
                btnToggleEdit.classList.replace('btn-outline-primary', 'btn-success');
            } else {
                const updatedProfile = {
                    name: editName.value.trim() || 'User',
                    email: editEmail.value.trim(),
                    rollNo: editRollNo.value.trim() || 'N/A',
                    role: editRole.value.trim() || 'Student',
                    program: editProgram ? editProgram.value.trim() : '',
                    batch: editBatch ? editBatch.value.trim() : ''
                };

                inputs.forEach(input => input && input.setAttribute('readonly', 'true'));

                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                updateProfileUI(updatedProfile);

                btnToggleEdit.innerText = 'Edit Profile';
                btnToggleEdit.classList.replace('btn-success', 'btn-outline-primary');
            }
        });
    }

    // Logout Functionality
    if (btnLogout) {
        btnLogout.addEventListener('click', function () {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
});