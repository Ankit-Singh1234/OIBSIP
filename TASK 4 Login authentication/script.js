document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                alert('Registration successful!');
                window.location.href = 'login.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const loginUsername = document.getElementById('loginUsername').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (loginUsername === storedUsername && loginPassword === storedPassword) {
                alert('Login successful!');
                window.location.href = 'secure.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});

function logout() {
    window.location.href = 'login.html';
}
