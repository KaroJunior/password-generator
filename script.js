//Password Generator
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const resultInput = document.getElementById('result');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const copyMessage = document.getElementById('copyMessage');

const checkPasswordInput = document.getElementById('checkPassword');
const strengthOutput = document.getElementById('strengthOutput').querySelector('strong');
const checkBtn = document.getElementById('checkBtn');
const checkMessage = document.getElementById('checkMessage');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+=<>?/{}[]~';

generateBtn.addEventListener('click', () => {
  const length = +lengthInput.value;
  let chars = '';

  if (uppercaseCheckbox.checked) chars += uppercaseChars;
  if (lowercaseCheckbox.checked) chars += lowercaseChars;
  if (numbersCheckbox.checked) chars += numberChars;
  if (symbolsCheckbox.checked) chars += symbolChars;

  if (chars === '') {
    resultInput.value = '';
    copyMessage.textContent = 'Please select at least one option!';
    copyMessage.style.color = 'red';
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  resultInput.value = password;
  copyMessage.textContent = 'Password generated successfully!';
  copyMessage.style.color = 'green';
});

copyBtn.addEventListener('click', () => {
  const password = resultInput.value;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    copyMessage.textContent = 'Password copied to clipboard!';
    copyMessage.style.color = 'green';
    setTimeout(() => {
      copyMessage.textContent = '';
    }, 2000);
  });
});



//Password Strength Checker
checkBtn.addEventListener('click', () => {
  const password = checkPasswordInput.value;
  if (!password) {
    checkMessage.textContent = 'Please enter a password first.';
    checkMessage.style.color = 'red';
    strengthOutput.textContent = 'None';
    return;
  }
  const strength = getPasswordStrength(password);
  strengthOutput.textContent = strength;
  strengthOutput.style.color = getStrengthColor(strength);
  checkMessage.textContent = 'Password analyzed successfully!';
  checkMessage.style.color = 'green';
  setTimeout(() => {
    checkMessage.textContent = '';
  }, 2000);
});

function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  switch (score) {
    case 5: return 'Very Strong';
    case 4: return 'Strong';
    case 3: return 'Medium';
    case 2: return 'Weak';
    default: return 'Very Weak';
  }
}

function getStrengthColor(strength) {
  switch (strength) {
    case 'Very Strong': return 'green';
    case 'Strong': return 'limegreen';
    case 'Medium': return 'orange';
    case 'Weak': return 'orangered';
    case 'Very Weak': return 'red';
    default: return '#007bff';
  }
}
