document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const registrationSection = document.getElementById('registrationSection');
    const createAccountLink = document.getElementById('createAccount');
    const registerGlobalSellerLink = document.getElementById('registerGlobalSeller');
    const resetPasswordLink = document.getElementById('resetPassword');
    const sendEmailCodeBtn = document.getElementById('sendEmailCode');
    const sendSmsCodeBtn = document.getElementById('sendSmsCode');
    
    // Show registration form when "Create new account" or "Register as Global Seller" is clicked
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.login-section').classList.add('hidden');
        registrationSection.classList.remove('hidden');
    });
    
    registerGlobalSellerLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.login-section').classList.add('hidden');
        registrationSection.classList.remove('hidden');
    });
    
    // Reset password link
    resetPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset functionality would be implemented here.');
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const loginId = document.getElementById('loginId').value;
        const password = document.getElementById('password').value;
        
        if (!loginId || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to the server
        alert('Login functionality would be implemented here.');
        console.log('Login attempt with:', { loginId, password });
    });
    
    // Registration form validation and submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        const chinaMainland = document.getElementById('chinaMainland').checked;
        const email = document.getElementById('email').value;
        const emailCode = document.getElementById('emailCode').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value;
        const smsCode = document.getElementById('smsCode').value;
        
        let isValid = true;
        
        // Country validation
        if (!chinaMainland) {
            document.getElementById('countryError').textContent = 'Please select at least one country/region';
            isValid = false;
        }
        
        // Email validation
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        if (!password) {
            document.getElementById('passwordError').textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 6 || password.length > 20) {
            document.getElementById('passwordError').textContent = 'Password must be 6-20 characters';
            isValid = false;
        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])/.test(password)) {
            document.getElementById('passwordError').textContent = 'Password must contain at least 2 different character types (letters, numbers, or symbols)';
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('passwordError').textContent = 'Passwords do not match';
            isValid = false;
        }
        
        // Phone validation
        if (!phone) {
            document.getElementById('phoneError').textContent = 'Phone number is required';
            isValid = false;
        } else if (!/^\d+$/.test(phone)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        if (isValid) {
            // Here you would typically send the data to the server
            alert('Registration successful! (This would submit to server in a real application)');
            console.log('Registration data:', {
                chinaMainland,
                email,
                emailCode,
                password,
                phone,
                smsCode
            });
        }
    });
    
    // Send email verification code
    sendEmailCodeBtn.addEventListener('click', function() {
        const email = document.getElementById('email').value;
        
        if (!email) {
            document.getElementById('emailError').textContent = 'Please enter your email first';
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            return;
        }
        
        // Simulate sending email code
        document.getElementById('emailError').textContent = '';
        document.getElementById('emailCode').classList.remove('hidden');
        sendEmailCodeBtn.disabled = true;
        sendEmailCodeBtn.textContent = 'Sent (60)';
        
        let countdown = 60;
        const timer = setInterval(() => {
            countdown--;
            sendEmailCodeBtn.textContent = `Sent (${countdown})`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                sendEmailCodeBtn.disabled = false;
                sendEmailCodeBtn.textContent = 'Send';
            }
        }, 1000);
        
        alert(`Verification code would be sent to ${email}`);
    });
    
    // Send SMS verification code
    sendSmsCodeBtn.addEventListener('click', function() {
        const phone = document.getElementById('phone').value;
        
        if (!phone) {
            document.getElementById('phoneError').textContent = 'Please enter your phone number first';
            return;
        }
        
        if (!/^\d+$/.test(phone)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            return;
        }
        
        // Simulate sending SMS code
        document.getElementById('phoneError').textContent = '';
        sendSmsCodeBtn.disabled = true;
        sendSmsCodeBtn.textContent = 'Sent (60)';
        
        let countdown = 60;
        const timer = setInterval(() => {
            countdown--;
            sendSmsCodeBtn.textContent = `Sent (${countdown})`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                sendSmsCodeBtn.disabled = false;
                sendSmsCodeBtn.textContent = 'Send';
            }
        }, 1000);
        
        alert(`SMS verification code would be sent to ${phone}`);
    });
});