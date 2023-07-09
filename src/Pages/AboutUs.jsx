import React from 'react'

function AboutUs() {
    const pStyles = {
        fontFamily: "Acakadut",
        fontSize: "50px"
    };

    const h1Styles = {
        fontFamily: "Silverstone",
        fontSize: "100px"
    };

    return (
        <div>
            <h1 style={h1Styles}>Erdinç Atay</h1>
            <p style={pStyles}>E-Mail: erdincatay@yandex.com</p>
            <p style={{ ...pStyles }}><a style={{ textDecoration: "none", color: "black" }} href="https://github.com/tfihsdeR">GitHub: https://github.com/tfihsdeR</a></p>
            <p style={pStyles}>Please follow me :)</p>
        </div>
    )
}

export default AboutUs