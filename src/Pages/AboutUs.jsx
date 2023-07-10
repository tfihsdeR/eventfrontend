import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

function AboutUs() {

    const recipientEmail = 'erdincatay@yandex.com';
    const subject = 'About Event Full Stack Project';
    const body = 'I hope this email makes you well.';

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const pStyles = {
        fontFamily: "Acakadut",
        fontSize: "50px"
    };

    const h1Styles = {
        fontFamily: "Silverstone",
        fontSize: "100px"
    };

    const instagramIconStyes = {
        fontSize: "60px",
        color: "red",
        marginRight: "15px"
    };

    const linkedinIconStyes = {
        fontSize: "60px",
        color: "blue",
        marginRight: "15px"
    };

    const mailIconStyles = {
        fontSize: "60px",
        color: "orange"
    };

    return (
        <div>
            <h1 style={h1Styles}>Erdinç Atay</h1>
            <p style={pStyles}>E-Mail: erdincatay@yandex.com</p>
            <p style={{ ...pStyles }}><a style={{ textDecoration: "none", color: "black" }} href="https://github.com/tfihsdeR">GitHub: https://github.com/tfihsdeR</a></p>
            <p style={pStyles}>Please follow me :)</p>

            <a href="https://www.instagram.com/_erdinc.atay_/" target="_blank" rel="noopener noreferrer" style={instagramIconStyes}>
                <i className="fab fa-instagram"></i>
            </a>

            <a href="https://www.linkedin.com/in/erdincatay" target="_blank" rel="noopener noreferrer" style={linkedinIconStyes}>
                <i className="fab fa-linkedin"></i>
            </a>

            <a href={mailtoLink} style={mailIconStyles}>
                <i className="far fa-envelope"></i>
            </a>
        </div>
    )
}

export default AboutUs