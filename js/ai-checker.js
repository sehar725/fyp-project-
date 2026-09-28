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

function runAIChecker() {
    const btn = document.getElementById('btnCheckIdea');
    const title = document.getElementById('projectTitleInput').value.trim();
    const desc = document.getElementById('projectDescInput').value.trim();

    if (!title || !desc) {
        alert('Please fill in both the Project Title and Description.');
        return;
    }

    // Loading State
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Analyzing with AI...`;

    // Simulated API Call
    setTimeout(() => {
        const similarityScore = 18;
        const totalChecked = '1,245';
        const analysisTime = '1.2s';

        // Hide Initial Box, Show Results Box
        document.getElementById('initialStateBox').style.display = 'none';
        document.getElementById('resultContentBox').style.display = 'block';

        // Update Progress Circle
        const chart = document.getElementById('resultCircleChart');
        if (chart) {
            const color = similarityScore < 25 ? '#10b981' : (similarityScore < 50 ? '#f59e0b' : '#ef4444');
            chart.style.background = `conic-gradient(${color} 0% ${similarityScore}%, #e2e8f0 ${similarityScore}% 100%)`;
        }

        document.getElementById('scoreText').innerText = `${similarityScore}%`;

        // Update Status Box
        const statusHeading = document.getElementById('statusHeading');
        const statusSubtext = document.getElementById('statusSubtext');
        const badgeBox = document.getElementById('statusBadgeContainer');

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

        // Update Stats Grid
        document.getElementById('statVerdict').innerText = similarityScore < 25 ? 'Unique' : 'High Similarity';
        document.getElementById('statCheckedCount').innerText = totalChecked;
        document.getElementById('statTime').innerText = analysisTime;

        // Update Similar Projects List
        const similarContainer = document.getElementById('similarProjectsContainer');
        similarContainer.innerHTML = `
            <div style="background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #e2e8f0; text-align:center;">
                <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:20px; margin-bottom:4px;"></i>
                <h6 style="margin:0; font-size:12px; color:#0f172a;">No similar projects found</h6>
                <p style="margin:0; font-size:11px; color:#64748b;">Great! Your idea is unique compared to existing records.</p>
            </div>
        `;

        // Update AI Suggestions
        const suggestionsContainer = document.getElementById('aiSuggestionsContainer');
        suggestionsContainer.innerHTML = `
            <div style="background:#f8fafc; padding:10px; border-radius:6px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong style="font-size:12px; color:#0f172a; display:block;">Smart Feature Enhancement</strong>
                    <span style="font-size:11px; color:#64748b;">Add real-time notifications to increase project value.</span>
                </div>
                <span style="font-size:11px; color:#2563eb; font-weight:600; cursor:pointer;">Apply</span>
            </div>
        `;

        // Reset Button
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Check Idea &rarr;`;
    }, 1200);
}