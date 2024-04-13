// Function to check password strength
function checkPasswordStrength(password) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const weakRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (strongRegex.test(password)) {
        return 'strong';
    } else if (mediumRegex.test(password)) {
        return 'medium';
    } else if (weakRegex.test(password)) {
        return 'weak';
    } else {
        return 'very weak';
    }
}

// Function to show password strength suggestion
function showPasswordStrength(password) {
    const strength = checkPasswordStrength(password);
    let suggestion = '';

    switch (strength) {
        case 'strong':
            suggestion = 'Strong password!';
            break;
        case 'medium':
            suggestion = 'Medium strength. Consider adding special characters for better security.';
            break;
        case 'weak':
            suggestion = 'Weak password. Add uppercase letters and special characters.';
            break;
        default:
            suggestion = 'Very weak password. Please choose a stronger password.';
    }

    document.getElementById('passwordStrength').textContent = suggestion;
}

// Show/hide password
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Event listener for password input to check strength and show suggestion
document.getElementById('newPassword').addEventListener('input', function() {
    const password = this.value;
    showPasswordStrength(password);
});

// Event listener for signup form submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please re-enter.');
        return;
    }

    // Make a POST request to the backend
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newEmail }) // Send email to the backend
    })
    .then(response => {
        if (response.ok) {
            alert('Verification email sent! Please check your email inbox.');
            window.location.href = 'verification.html'; // Redirect to verification page
        } else {
            throw new Error('Failed to send verification email');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send verification email. Please try again later.');
    });
});
