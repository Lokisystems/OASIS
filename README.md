Oasis of Hope Initiatives - Website
===================================

Overview
--------
Static site containing `index.html`, `styles.css`, images, and `script.js`.

What I updated
--------------
- Removed duplicate Donate section (duplicate `id="donate"`).
- Fixed footer email to `info@oasisofhopeinitiatives.org`.
- Accessibility: added `aria-controls` to hamburger, `aria-live` to search results and counters.

Local preview
-------------
You can double-click `index.html` to open it, or serve locally:

PowerShell (Windows):
```powershell
cd "C:\Users\LOKI SYSTEMS\OASIS"
python -m http.server 8080
```
Then visit `http://localhost:8080`.

Deploy options
--------------
1) GitHub Pages
- Push this folder to a GitHub repo.
- In repo Settings → Pages → Deploy from branch → `main` → `/root`.

2) Netlify
- Drag-and-drop the folder at `https://app.netlify.com/drop`.

3) Vercel
- Run the Vercel wizard and point to this folder. Framework preset: "Other".

DNS and domain
--------------
- If using a custom domain, add an `A`/`CNAME` record per your host’s instructions.

Performance tips (optional)
---------------------------
- Ensure images are optimized (WebP/JPEG, appropriate sizes).
- Consider adding a `sitemap.xml` and `robots.txt` when you have hosting URL.

# Oasis of Hope Initiatives - Healthcare & Empowerment Hub

A modern, responsive website for Oasis of Hope Initiatives, a healthcare and empowerment hub in Bulapesa, Isiolo County, Kenya. Built with cutting-edge web technologies featuring 3D effects, smooth animations, and a professional design that reflects the organization's mission of community development and healthcare provision.

## 🌟 Features

### Design & User Experience
- **Modern 3D Design**: Futuristic interface with smooth 3D hover effects and parallax scrolling
- **Responsive Layout**: Fully responsive design that works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: CSS3 animations and JavaScript-powered scroll reveals
- **Professional Color Palette**: Health-focused colors (greens, blues, warm gold accents)
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Interactive Elements
- **Animated Counters**: Dynamic statistics display with counting animations
- **3D Card Effects**: Interactive cards with tilt effects on hover
- **Smooth Scrolling**: Seamless navigation between sections
- **Tabbed Services**: Organized medical and empowerment services
- **Contact Form**: Functional contact form with validation
- **Mobile Menu**: Responsive hamburger menu for mobile devices

### Performance & SEO
- **Optimized Loading**: Lazy loading for images and performance optimization
- **SEO Friendly**: Proper meta tags, semantic HTML, and structured content
- **Fast Loading**: Optimized CSS and JavaScript for quick page loads
- **Cross-browser Compatible**: Works on all modern browsers

## 📁 Project Structure

```
oasis-of-hope-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or Download** the project files to your local machine

2. **Open the Website**:
   - **Option 1**: Double-click `index.html` to open in your browser
   - **Option 2**: Use a local server for better development experience

3. **Local Server Setup** (Recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the Website**: Open `http://localhost:8000` in your browser

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #4CAF50;      /* Main green color */
    --secondary-color: #2196F3;    /* Blue accent */
    --accent-color: #FF9800;       /* Orange accent */
    --text-dark: #333;             /* Dark text */
    --text-light: #666;            /* Light text */
    --text-white: #fff;            /* White text */
}
```

### Content Updates
- **Text Content**: Edit the HTML file to update text, descriptions, and contact information
- **Images**: Replace placeholder images with actual photos of the organization
- **Blog Posts**: Add new blog articles by duplicating the existing article structure
- **Services**: Modify the services section to reflect current offerings

### Adding New Sections
1. Add the HTML structure in `index.html`
2. Add corresponding CSS styles in `styles.css`
3. Add any JavaScript functionality in `script.js`

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for modern typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Lazy Loading**: Images load only when needed
- **Debounced Events**: Optimized scroll and resize handlers
- **CSS Animations**: Hardware-accelerated animations
- **Minified Assets**: Optimized for production

## 📄 Sections Overview

### 1. Hero Section
- Animated 3D floating cards
- Impact statistics with counting animations
- Call-to-action buttons
- Parallax background effects

### 2. About Section
- Organization story and mission
- Core values with animated cards
- Team information (ready for photos)

### 3. Services Section
- Tabbed interface for medical and empowerment services
- Interactive service cards with 3D effects
- Comprehensive service descriptions

### 4. Blog/News Section
- Latest news and updates
- Category-based organization
- Pagination system

### 5. Projects Section
- Showcase of completed and ongoing projects
- Impact statistics for each project
- Visual project cards

### 6. Facilities Section
- Health center overview
- Empowerment center details
- Future expansion plans

### 7. Contact Section
- Contact information and hours
- Functional contact form
- Social media links
- Map placeholder (ready for Google Maps integration)

## 🎯 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Open Graph**: Social media sharing optimization
- **Semantic HTML**: Proper heading hierarchy and structure
- **Alt Text**: Descriptive alt text for all images
- **Schema Markup**: Ready for structured data implementation

## 🔒 Security Considerations

- **Form Validation**: Client-side validation for contact form
- **XSS Prevention**: Proper input sanitization
- **HTTPS Ready**: Secure connection compatible
- **Content Security Policy**: Ready for CSP implementation

## 📈 Analytics Ready

The website is prepared for analytics integration:
- Google Analytics 4
- Facebook Pixel
- Custom event tracking
- Conversion tracking

## 🚀 Deployment

### Static Hosting
The website can be deployed to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting

### Custom Domain
- Update DNS settings to point to your hosting provider
- Configure SSL certificate for HTTPS
- Update contact information and social media links

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or customization requests:
- Email: [Your Email]
- Phone: [Your Phone]
- Website: [Your Website]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Oasis of Hope Initiatives** for the opportunity to serve their mission
- **Font Awesome** for the comprehensive icon library
- **Google Fonts** for the beautiful typography
- **Community** for inspiration and feedback

---

**Built with ❤️ for community development and healthcare empowerment**

*Last updated: January 2025*
