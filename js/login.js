document.addEventListener('DOMContentLoaded', () => {
    // Elements Selectors
    const roleBoxes = document.querySelectorAll('.role-box');
    const selectedRoleInput = document.getElementById('selectedRoleInput');
    const identityLabel = document.getElementById('identityLabel');
    const userIdentityInput = document.getElementById('userIdentity');
    const identityIcon = document.getElementById('identityIcon');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');
    const loginForm = document.getElementById('loginForm');
    const btnLogin = document.getElementById('btnLogin');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    // 1. ROLE SELECTION TOGGLE LOGIC & DYNAMIC FIELD UPDATES
    roleBoxes.forEach(box => {
        box.addEventListener('click', () => {
            roleBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');

            const role = box.getAttribute('data-role');
            if (selectedRoleInput) {
                selectedRoleInput.value = role;
            }

            // Role ke mutabiq Label, Placeholder aur Icon change karna
            if (role === 'student') {
                if (identityLabel) identityLabel.textContent = 'Registration No.';
                if (userIdentityInput) userIdentityInput.placeholder = 'Enter your reg number (e.g., 23-arid-3134)';
                if (identityIcon) identityIcon.className = 'bi bi-card-heading input-icon';
            } else {
                if (identityLabel) identityLabel.textContent = 'Email Address';
                if (userIdentityInput) userIdentityInput.placeholder = 'Enter your email address';
                if (identityIcon) identityIcon.className = 'bi bi-envelope input-icon';
            }
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

    // 3. FORM SUBMISSION & ROLE-BASED REDIRECTION LOGIC
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentRole = selectedRoleInput ? selectedRoleInput.value : 'student';
            const userEmail = userIdentityInput ? userIdentityInput.value : 'User';

            // Loading state show karein
            if (btnText) btnText.classList.add('d-none');
            if (btnSpinner) btnSpinner.classList.remove('d-none');
            if (btnLogin) btnLogin.disabled = true;

            // User session save karein
            const userSession = {
                id: 1,
                name: userEmail,
                role: currentRole
            };
            localStorage.setItem('user', JSON.stringify(userSession));

            // Role wise dynamic redirect (1 sec delay ke baad)
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
            }, 1000);
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordLink = document.querySelector('.forgot-link');
    const modal = document.getElementById("forgotPasswordModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const cancelModalBtn = document.getElementById("cancelModalBtn");
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    // Modal Open karna
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function (e) {
            e.preventDefault();
            modal.classList.add("active");
        });
    }

    // Modal Close Functions
    function closeModal() {
        modal.classList.remove("active");
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

    // Overlay click hone par close hona
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form Submit handling
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const role = document.getElementById("resetRole").value;
            const inputVal = document.getElementById("resetInput").value;

            alert(`Password reset instructions sent to ${inputVal} (${role})`);
            closeModal();
            forgotPasswordForm.reset();
        });
    }
});