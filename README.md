# Josh Robertson's Portfolio

A modern, dark-themed portfolio website showcasing projects, skills, and experience.

## Contact Form Setup

The contact form is powered by EmailJS which allows sending emails directly from JavaScript. To make it functional:

1. **Create an EmailJS Account**:
   - Go to [EmailJS.com](https://www.emailjs.com/) and create a free account

2. **Set Up an Email Service**:
   - Add an email service (like Gmail, Outlook, etc.)
   - Note down the Service ID

3. **Create an Email Template**:
   - Create a new template with the following variables:
     - `from_name`: Sender's name
     - `reply_to`: Sender's email
     - `message`: Message content
   - Note down the Template ID

4. **Update Configuration**:
   - Open `index.html` and replace `YOUR_USER_ID` with your EmailJS User ID (found in Account > API Keys)
   - Open `js/contactform.js` and replace:
     - `SERVICE_ID` with your EmailJS service ID
     - `TEMPLATE_ID` with your template ID

After these steps, the contact form will be fully functional and will send emails to your configured service when visitors submit the form.

## Features

- Modern dark theme with light mode toggle
- Responsive design for all devices
- Interactive UI with animations and hover effects
- Particle effects and background animations
- Fully functional contact form
- Showcase of projects with GitHub links

## License

This project is licensed under the MIT License. 