document.addEventListener('DOMContentLoaded', function () {
    // 1. Sync User Data with LocalStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        let displayName = user.name || 'Student';
        if (displayName.includes('@')) displayName = displayName.split('@')[0];
        if (displayName.toLowerCase() === '23-arid-3134') displayName = 'Sehar Babar';

        const nameParts = displayName.trim().split(' ');
        let initials = nameParts[0][0].toUpperCase();
        if (nameParts.length > 1) initials += nameParts[nameParts.length - 1][0].toUpperCase();

        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.innerText = displayName;

        const avatarEl = document.getElementById('userAvatar');
        if (avatarEl) avatarEl.innerText = initials;
    }

    // 2. Drag and Drop + File Upload Logic
    const pdfInput = document.getElementById('proposalPdfInput');
    const fileDisplay = document.getElementById('fileDisplay');
    const dropZone = document.getElementById('dropZone');

    if (pdfInput) {
        pdfInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                if (file.type !== 'application/pdf') {
                    alert('Please upload a PDF file only.');
                    this.value = '';
                    fileDisplay.innerText = '';
                    return;
                }
                if (file.size > 10 * 1024 * 1024) {
                    alert('File size exceeds 10MB limit.');
                    this.value = '';
                    fileDisplay.innerText = '';
                    return;
                }
                fileDisplay.innerText = `Selected File: ${file.name}`;
            }
        });
    }

    if (dropZone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            }, false);
        });
    }

    // 3. Form Submit Action
    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        proposalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const title = document.getElementById('projectTitle').value;
            const domain = document.getElementById('projectDomain').value;
            const description = document.getElementById('projectDescription').value;

            if (!domain) {
                alert('Please select a project domain.');
                return;
            }

            if (!description.trim()) {
                alert('Please provide a project description.');
                return;
            }

            alert(`Proposal "${title}" submitted successfully!`);
            window.location.href = 'dashboard.html';
        });
    }
});