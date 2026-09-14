document.addEventListener('DOMContentLoaded', function () {
    // 1. Role Box Selection
    const roleBoxes = document.querySelectorAll('.role-box');
    let currentSelectedRole = 'student';

    roleBoxes.forEach(box => {
        box.addEventListener('click', function () {
            roleBoxes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSelectedRole = this.getAttribute('data-role');
        });
    });

    // 2. Toggle Password Eye Icon
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const currentType = passwordInput.getAttribute('type');
            if (currentType === 'password') {
                passwordInput.setAttribute('type', 'text');
                this.classList.remove('bi-eye-slash');
                this.classList.add('bi-eye');
            } else {
                passwordInput.setAttribute('type', 'password');
                this.classList.remove('bi-eye');
                this.classList.add('bi-eye-slash');
            }
        });
    }
});