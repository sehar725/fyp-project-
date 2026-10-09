let activeSelectedFile = null;

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const btnChooseFile = document.getElementById('btnChooseFile');
    const dropZone = document.getElementById('dropZone');
    const filePreviewCard = document.getElementById('filePreviewCard');
    const btnRemoveFile = document.getElementById('btnRemoveFile');
    const form = document.getElementById('proposalSubmitForm');
    const btnSubmitProposal = document.getElementById('btnSubmitProposal');
    const reportContainer = document.getElementById('plagiarismReportContainer');

    // Choose File trigger
    btnChooseFile.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            attachFile(this.files[0]);
        }
    });

    // Drag & drop handlers
    dropZone.addEventListener('dragover', (e) => e.preventDefault());
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            attachFile(e.dataTransfer.files[0]);
        }
    });

    // Remove selected file
    btnRemoveFile.addEventListener('click', function () {
        activeSelectedFile = null;
        fileInput.value = '';
        filePreviewCard.classList.add('d-none');
        reportContainer.innerHTML = '';
    });

    // Form Submission Logic
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!activeSelectedFile) {
            alert('Pehle proposal ki PDF file select ya drag karke upload karein.');
            return;
        }

        // Loading state
        btnSubmitProposal.disabled = true;
        btnSubmitProposal.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i> Analyzing File & Plagiarism...`;

        setTimeout(() => {
            // Generate score (Random calculation simulation)
            const score = Math.floor(Math.random() * (22 - 6 + 1)) + 6;
            const isPassed = score < 20;

            // Save status in LocalStorage for Supervisor/PMO view
            const proposalData = {
                studentName: 'Sehar Babar',
                studentId: '23-arid-3134',
                fileName: activeSelectedFile.name,
                fileSize: (activeSelectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
                plagiarismScore: score,
                status: isPassed ? 'Accepted' : 'High Plagiarism',
                submittedAt: new Date().toLocaleDateString()
            };

            localStorage.setItem('studentProposalRecord', JSON.stringify(proposalData));

            // Display UI Report Box
            reportContainer.innerHTML = `
                <div style="background: ${isPassed ? '#ecfdf5' : '#fef2f2'}; border: 1px solid ${isPassed ? '#a7f3d0' : '#fecaca'}; border-radius: 10px; padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h6 style="margin: 0; color: ${isPassed ? '#065f46' : '#991b1b'}; font-weight: bold; font-size: 13px;">
                                <i class="fa-solid ${isPassed ? 'fa-circle-check' : 'fa-triangle-exclamation'} me-2"></i>
                                Plagiarism Check Complete (${activeSelectedFile.name})
                            </h6>
                            <p style="margin: 4px 0 0 0; font-size: 11px; color: ${isPassed ? '#047857' : '#b91c1c'};">
                                Status: <strong>${proposalData.status}</strong> | Saved to Portal
                            </p>
                        </div>
                        <div style="font-size: 22px; font-weight: bold; color: ${isPassed ? '#059669' : '#dc2626'};">
                            ${score}%
                        </div>
                    </div>
                </div>
            `;

            btnSubmitProposal.disabled = false;
            btnSubmitProposal.innerHTML = `Submit Proposal`;
        }, 1200);
    });

    function attachFile(file) {
        if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
            alert('Sirf PDF files hi allowed hain.');
            return;
        }
        activeSelectedFile = file;
        document.getElementById('lblFileName').innerText = file.name;
        document.getElementById('lblFileSize').innerText = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
        filePreviewCard.classList.remove('d-none');
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