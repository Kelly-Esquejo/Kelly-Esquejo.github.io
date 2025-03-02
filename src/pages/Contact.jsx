import "../css/contact.css";
function Contact() {
    return (
        <div className="contact-container">
            <p>Feel free to check my profiles and resume:</p>
            <div className="contact-content">
                <a
                    className="contact-links"
                    href="https://github.com/Kelly-Esquejo"
                    rel="noopener noreferrer">
                    GitHub
                </a>
            </div>
            <div className="contact-content">
                <a
                    className="contact-links"
                    href="https://www.linkedin.com/in/kelly-esquejo"
                    target="_blank"
                    rel="noopener noreferrer">
                    LinkedIn
                </a>
            </div>
            <div className="contact-content">
                <a
                    className="contact-links"
                    href="/Kelly Esquejo - Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                    Resume
                </a>
            </div>
        </div>
    );
}

export default Contact;
