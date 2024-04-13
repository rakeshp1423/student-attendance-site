document.getElementById('verificationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const verificationCode = document.getElementById('verificationCode').value;

    // Simulate verification process (replace with actual verification logic)
    const expectedCode = '123456'; // This should be the code sent to the user's email
    if (verificationCode === expectedCode) {
        alert('Verification successful!');
        window.location.href = 'home.html'; // Redirect to home page after successful verification
    } else {
        alert('Invalid verification code. Please try again.');
    }
});

document.getElementById('resendCode').addEventListener('click', function () {
    // Simulate sending of verification code (replace with actual logic)
    alert('Resending verification code...');
    // You would send a new verification code to the user's email here
});
