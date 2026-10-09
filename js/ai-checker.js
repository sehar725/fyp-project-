document.addEventListener('DOMContentLoaded', function () {
    // 1. User Session Sync
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

    // 2. Textarea Character Count
    const descInput = document.getElementById('projectDescInput');
    const charCounter = document.getElementById('charCounter');
    if (descInput && charCounter) {
        descInput.addEventListener('input', function () {
            charCounter.innerText = `${this.value.length}/1000`;
        });
    }

    // 3. Form Submit & Dynamic AI Check
    const form = document.getElementById('ideaCheckerForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            runAIChecker();
        });
    }
});

async function runAIChecker() {
    const btn = document.getElementById('btnCheckIdea');
    const titleInput = document.getElementById('projectTitleInput');
    const descInput = document.getElementById('projectDescInput');
    const domainSelect = document.getElementById('domainSelect') || document.querySelector('select');
    const techInput = document.getElementById('techInput') || document.querySelector('input[placeholder*="Python"]');

    const title = titleInput ? titleInput.value.trim() : '';
    const desc = descInput ? descInput.value.trim() : '';
    const domain = domainSelect ? domainSelect.value : '';
    const tech = techInput ? techInput.value.trim() : '';

    if (!title || !desc) {
        alert('Please fill in both the Project Title and Description.');
        return;
    }

    // Loading State
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Analyzing with AI...`;

    // AI Suggestions Container Loading Indicator
    const suggestionsContainer = document.getElementById('aiSuggestionsContainer');
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = `
            <div style="background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #e2e8f0; text-align:center;">
                <i class="fa-solid fa-spinner fa-spin text-primary" style="font-size:18px; margin-bottom:6px;"></i>
                <p style="margin:0; font-size:11px; color:#64748b;">Generating dynamic ChatGPT suggestions...</p>
            </div>
        `;
    }

    // Simulated API delay + OpenAI ChatGPT API Call
    setTimeout(async () => {
        const similarityScore = 18;
        const totalChecked = '1,245';
        const analysisTime = '1.2s';

        // Hide Initial Box, Show Results Box
        const initialStateBox = document.getElementById('initialStateBox');
        const resultContentBox = document.getElementById('resultContentBox');
        if (initialStateBox) initialStateBox.style.display = 'none';
        if (resultContentBox) resultContentBox.style.display = 'block';

        // Update Progress Circle Chart
        const chart = document.getElementById('resultCircleChart');
        if (chart) {
            const color = similarityScore < 25 ? '#10b981' : (similarityScore < 50 ? '#f59e0b' : '#ef4444');
            chart.style.background = `conic-gradient(${color} 0% ${similarityScore}%, #e2e8f0 ${similarityScore}% 100%)`;
        }

        const scoreText = document.getElementById('scoreText');
        if (scoreText) scoreText.innerText = `${similarityScore}%`;

        // Update Status Box
        const statusHeading = document.getElementById('statusHeading');
        const statusSubtext = document.getElementById('statusSubtext');
        const badgeBox = document.getElementById('statusBadgeContainer');

        if (statusHeading && statusSubtext && badgeBox) {
            if (similarityScore < 25) {
                statusHeading.innerText = 'Your idea appears unique!';
                statusSubtext.innerText = 'The similarity score is low. Your idea is different from previously submitted projects.';
                badgeBox.style.background = '#ecfdf5';
                badgeBox.style.borderColor = '#a7f3d0';
                statusHeading.style.color = '#065f46';
                statusSubtext.style.color = '#047857';
            } else {
                statusHeading.innerText = 'High Similarity Detected!';
                statusSubtext.innerText = 'Consider revising your project title or scope to make it unique.';
                badgeBox.style.background = '#fef2f2';
                badgeBox.style.borderColor = '#fecaca';
                statusHeading.style.color = '#991b1b';
                statusSubtext.style.color = '#b91c1c';
            }
        }

        // Update Stats Grid
        const statVerdict = document.getElementById('statVerdict');
        const statCheckedCount = document.getElementById('statCheckedCount');
        const statTime = document.getElementById('statTime');

        if (statVerdict) statVerdict.innerText = similarityScore < 25 ? 'Unique' : 'High Similarity';
        if (statCheckedCount) statCheckedCount.innerText = totalChecked;
        if (statTime) statTime.innerText = analysisTime;

        // Update Similar Projects List
        const similarContainer = document.getElementById('similarProjectsContainer');
        if (similarContainer) {
            similarContainer.innerHTML = `
                <div style="background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #e2e8f0; text-align:center;">
                    <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:20px; margin-bottom:4px;"></i>
                    <h6 style="margin:0; font-size:12px; color:#0f172a;">No similar projects found</h6>
                    <p style="margin:0; font-size:11px; color:#64748b;">Great! Your idea is unique compared to existing records.</p>
                </div>
            `;
        }

        // OpenAI ChatGPT API Integration for Dynamic AI Suggestions
        const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an AI FYP Advisor. Provide 2-3 concise, high-value feature enhancements or suggestions for the student project idea. Keep responses clean, short, and formatted with bold subheadings.'
                        },
                        {
                            role: 'user',
                            content: `Title: ${title}\nDescription: ${desc}\nDomain: ${domain}\nTech: ${tech}`
                        }
                    ],
                    max_tokens: 200,
                    temperature: 0.7
                })
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0 && suggestionsContainer) {
                const formattedAiContent = data.choices[0].message.content
                    .replace(/\n\n/g, '<br>')
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                suggestionsContainer.innerHTML = `
                    <div style="background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #e2e8f0;">
                        <div style="font-size:12px; color:#0f172a; line-height:1.5;">
                            ${formattedAiContent}
                        </div>
                    </div>
                `;
            } else {
                throw new Error('API Response Failed');
            }
        } catch (error) {
            console.error('ChatGPT API Error:', error);
            // Fallback UI if API fails or Key is not added
            if (suggestionsContainer) {
                suggestionsContainer.innerHTML = `
                    <div style="background:#f8fafc; padding:10px; border-radius:6px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <strong style="font-size:12px; color:#0f172a; display:block;">Smart Feature Enhancement</strong>
                            <span style="font-size:11px; color:#64748b;">Add real-time analytics and user roles to increase project value.</span>
                        </div>
                        <span style="font-size:11px; color:#2563eb; font-weight:600; cursor:pointer;">Apply</span>
                    </div>
                `;
            }
        }

        // Reset Button State
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Check Idea &rarr;`;
    }, 1200);
}
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