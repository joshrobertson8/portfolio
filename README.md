# Josh Robertson's Portfolio

A modern, interactive portfolio website showcasing my skills, projects, experience, and professional information with a sleek dark theme and engaging animations.

![Portfolio Preview](assets/img/port.png)

## 🔗 Live Demo

Visit the live portfolio: [https://joshrobertson8.github.io/portfolio/](https://joshrobertson8.github.io/portfolio/)

## ✨ Features

- **Responsive Design** - Optimized for all screen sizes from mobile to large desktop
- **Dark Theme** with custom UI elements and glow effects
- **Interactive Elements** including:
  - Particle effects and splash animations
  - Hover interactions with color transitions
  - Scroll-triggered animations
  - Smooth section transitions
- **Accessible Navigation** with keyboard shortcuts
- **Google Maps Integration** with toggle for satellite/map view
- **Fully Functional Contact Form** powered by EmailJS
- **Project Showcase** with GitHub repository links
- **Modern CSS Techniques** including CSS variables, animations, and pseudo-elements
- **Clean Code Structure** for easy maintenance and updates

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Advanced styling with variables, animations, and flexbox layout
- **JavaScript** - Interactive UI elements and animations
- **EmailJS** - Contact form functionality
- **Font Awesome** - Icon library for UI elements
- **Google Maps API** - Location display
- **IntersectionObserver API** - Scroll-triggered animations
- **Google Fonts** - Typography (Inter font family)

## 📂 Project Structure

```
portfolio/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # Main stylesheet
├── js/
│   ├── contactform.js   # Contact form functionality
│   ├── maptoggle.js     # Google Maps view toggle
│   └── menu.js          # Mobile menu functionality
├── assets/
│   └── img/             # Project images and portfolio assets
└── README.md            # Documentation
```

## 🚀 Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joshrobertson8/portfolio.git
   cd portfolio
   ```

2. **Open with a live server:**
   - Use Visual Studio Code with the Live Server extension, or
   - Use any local development server of your choice

3. **Customize the content:**
   - Edit `index.html` to update text content and personal information
   - Modify projects, experience, and skills sections to reflect your own
   - Replace images in the `assets/img/` directory with your own

## 📧 Contact Form Setup

The contact form is powered by EmailJS which allows sending emails directly from JavaScript:

1. **Create an EmailJS Account**:
   - Sign up at [EmailJS.com](https://www.emailjs.com/)

2. **Set Up an Email Service**:
   - Add your preferred email service (Gmail, Outlook, etc.)
   - Note the Service ID

3. **Create an Email Template**:
   - Create a template with variables:
     - `from_name`: Sender's name
     - `reply_to`: Sender's email
     - `message`: Message content
   - Save the Template ID

4. **Update Configuration**:
   - In `index.html`, replace `YOUR_USER_ID` with your EmailJS User ID
   - In `js/contactform.js`, update:
     - `SERVICE_ID` with your service ID
     - `TEMPLATE_ID` with your template ID

## 🔧 Customization

### Color Scheme
Edit the CSS variables in the `:root` selector in `styles.css` to change the color scheme:

```css
:root {
  --primary-color: #1a1a1a;
  --secondary-color: #ebb91f;
  /* more variables... */
}
```

### Adding Projects
To add a new project, copy an existing project box in the Projects section and update:
- Project title
- Description
- Technologies used
- Image/GIF
- GitHub link

### Adding Experience
To add a new work experience, copy an existing experience div in the Experience section and update the company, position, year, and description.

## 📱 Responsive Design

The portfolio is fully responsive with specific breakpoints at:
- 1024px for larger tablets and desktops
- 768px for tablets
- 480px for mobile devices

Media queries in `styles.css` handle all responsive adjustments automatically.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Josh Robertson
- Email: [joshjrob@unc.edu](mailto:joshjrob@unc.edu)
- LinkedIn: [Josh Robertson](https://linkedin.com/in/josh-robertson-66b370330)
- GitHub: [joshrobertson8](https://github.com/joshrobertson8) 