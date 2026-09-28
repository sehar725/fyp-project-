document.addEventListener('DOMContentLoaded', () => {
    // Elements Selectors
    const roleBoxes = document.querySelectorAll('.role-box');
    const selectedRoleInput = document.getElementById('selectedRoleInput');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');
    const loginForm = document.getElementById('loginForm');
    const btnLogin = document.getElementById('btnLogin');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    // 1. ROLE SELECTION TOGGLE LOGIC
    roleBoxes.forEach(box => {
        box.addEventListener('click', () => {
            roleBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');

            const role = box.getAttribute('data-role');
            if (selectedRoleInput) {
                selectedRoleInput.value = role;
            }
            console.log("Selected Role:", role);
        });
    });

    // 2. PASSWORD VISIBILITY TOGGLE
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            togglePassword.classList.toggle('bi-eye');
            togglePassword.classList.toggle('bi-eye-slash');
        });
    }

    // 3. FORM SUBMISSION & REDIRECTION LOGIC
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentRole = selectedRoleInput ? selectedRoleInput.value : 'student';
            const userIdentityInput = document.getElementById('userIdentity');
            const userEmail = userIdentityInput ? userIdentityInput.value : 'Student';

            // Loading state show karein
            if (btnText) btnText.classList.add('d-none');
            if (btnSpinner) btnSpinner.classList.remove('d-none');
            if (btnLogin) btnLogin.disabled = true;

            // IMPORTANT FIX: User session save karein taaki dashboard bounce-back na kare
            const userSession = {
                id: 1,
                name: userEmail,
                role: currentRole
            };
            localStorage.setItem('user', JSON.stringify(userSession));

            // Simulation Delay (1.5 seconds) ke baad redirect karein
            setTimeout(() => {
                if (currentRole === 'student') {
                    window.location.href = 'dashboard.html';
                } else if (currentRole === 'supervisor') {
                    window.location.href = 'supervisor-dashboard.html';
                } else if (currentRole === 'pmo') {
                    window.location.href = 'pmo-dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }, 1500);
        });
    }
});