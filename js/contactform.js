document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const nameField = contactForm.querySelector('input[name="name"]');
  const emailField = contactForm.querySelector('input[name="email"]');
  const messageField = contactForm.querySelector('textarea[name="message"]');
  
  // Form validation and submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.field').forEach(field => {
      field.classList.remove('error');
    });
    
    let hasError = false;
    
    // Validate name
    if (nameField.value.trim() === '') {
      nameField.parentElement.classList.add('error');
      hasError = true;
    }
    
    // Validate email
    if (emailField.value.trim() === '' || !isValidEmail(emailField.value)) {
      emailField.parentElement.classList.add('error');
      hasError = true;
    }
    
    // Validate message
    if (messageField.value.trim() === '') {
      messageField.parentElement.classList.add('error');
      hasError = true;
    }
    
    // If no errors, send the message
    if (!hasError) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Prepare template parameters
      const templateParams = {
        from_name: nameField.value,
        reply_to: emailField.value,
        message: messageField.value
      };
      
      // Send the email using EmailJS
      emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Show success message
          showFormMessage('success', 'Your message has been sent successfully!');
          
          // Reset form
          contactForm.reset();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }, function(error) {
          console.log('FAILED...', error);
          
          // Show error message
          showFormMessage('error', 'Failed to send message. Please try again.');
          
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        });
    }
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Helper function to show success/error messages
  function showFormMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert after form
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageElement.classList.add('fade-out');
      setTimeout(() => {
        messageElement.remove();
      }, 500);
    }, 5000);
  }
});