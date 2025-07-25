// Seller Registration Form Validation
document.getElementById('sellerRegistrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate all fields
  if (!validateForm()) {
    return;
  }
  
  // If all validations pass
  alert('Registration successful! We will review your application shortly.');
  document.getElementById('sellerModal').style.display = 'none';
  this.reset();
});

// Form validation function
function validateForm() {
  const country = document.getElementById('country').value;
  const email = document.getElementById('email').value;
  const emailCode = document.getElementById('emailCode').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const phone = document.getElementById('phone').value;
  const smsCode = document.getElementById('smsCode').value;
  
  // Validate country
  if (!country) {
    alert('Please select your country/region');
    return false;
  }
  
  // Validate email
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  // Validate email verification code
  if (!emailCode) {
    alert('Please enter the email verification code');
    return false;
  }
  
  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    alert(passwordValidation.message);
    return false;
  }
  
  // Validate password match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return false;
  }
  
  // Validate phone number
  if (!validatePhoneNumber(phone)) {
    alert('Please enter a valid phone number');
    return false;
  }
  
  // Validate SMS code
  if (!smsCode) {
    alert('Please enter the SMS verification code');
    return false;
  }
  
  return true;
}

// Email verification code send
document.getElementById('sendEmailCode').addEventListener('click', function() {
  const email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    alert('Please enter a valid email first');
    return;
  }
  
  // Disable button for 60 seconds
  this.disabled = true;
  let seconds = 60;
  const originalText = this.textContent;
  
  const timer = setInterval(() => {
    this.textContent = `Resend (${seconds}s)`;
    seconds--;
    
    if (seconds < 0) {
      clearInterval(timer);
      this.textContent = originalText;
      this.disabled = false;
    }
  }, 1000);
  
  // Simulate sending verification code
  console.log(`Verification code sent to ${email}`);
  alert(`Verification code sent to ${email}`);
});

// SMS verification code send
document.getElementById('sendSmsCode').addEventListener('click', function() {
  const phone = document.getElementById('phone').value;
  if (!validatePhoneNumber(phone)) {
    alert('Please enter a valid phone number first');
    return;
  }
  
  // Disable button for 60 seconds
  this.disabled = true;
  let seconds = 60;
  const originalText = this.textContent;
  
  const timer = setInterval(() => {
    this.textContent = `Resend (${seconds}s)`;
    seconds--;
    
    if (seconds < 0) {
      clearInterval(timer);
      this.textContent = originalText;
      this.disabled = false;
    }
  }, 1000);
  
  // Simulate sending SMS code
  console.log(`SMS code sent to ${phone}`);
  alert(`SMS verification code sent to your phone`);
});

// Password strength indicator
document.getElementById('password').addEventListener('input', function() {
  const strengthBar = document.querySelector('.strength-bar');
  const validation = validatePassword(this.value);
  
  if (!validation.valid) {
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#ff0000';
  } else {
    // Calculate strength (simple example)
    const strength = Math.min(this.value.length / 20 * 100, 100);
    strengthBar.style.width = `${strength}%`;
    strengthBar.style.backgroundColor = strength > 70 ? '#4CAF50' : strength > 40 ? '#FFC107' : '#F44336';
  }
});

// Toggle password visibility
document.querySelectorAll('.password-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const input = this.parentElement.querySelector('input');
    if (input.type === 'password') {
      input.type = 'text';
      this.textContent = '👁️';
    } else {
      input.type = 'password';
      this.textContent = '🔍';
    }
  });
});

// Helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  
  if (password.length > 20) {
    return { valid: false, message: 'Password cannot exceed 20 characters' };
  }
  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const typesCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
  
  if (typesCount < 2) {
    return { valid: false, message: 'Password must contain at least 2 character types (letters, numbers, symbols)' };
  }
  
  return { valid: true };
}

function validatePhoneNumber(phone) {
  return /^\d{8,15}$/.test(phone);
}