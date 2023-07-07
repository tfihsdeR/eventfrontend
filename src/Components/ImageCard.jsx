import React from 'react'

function ImageCard({ image, name, textOnTheImage }) {

    //#region STYLES
    const imageContainerStyles = {
        width: "400px",
        height: "200px",
    };

    // const theatreImageStyles = {
    //     width: "100%",
    //     height: "100%",
    //     borderRadius: "10px",
    //     backgroundPosition: "center",
    //     backgroundSize: "contain",
    //     backgroundImage: `url(${image.find(e => e.title.toLowerCase() === name.toLowerCase()).imageUrl})`,
    // };

    const imageTextStyles = {
        position: "absolute",
        fontSize: "50px",
        color: "white",
    };

    const theatreImageStyles = () => {
        const url = "";
        console.log("images length: ", image.length)
        if (image.length != 0) {
            url = `url(${image.find(e => e.title === name).imageUrl})`;
        }
        return {
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundImage: url
        }
    }
    //#endregion

    //#region FUNCTIONS
    const WriteTextOnTheImage = () => {
        if (textOnTheImage != undefined) {
            return (
                <div style={imageTextStyles}>
                    <span>{textOnTheImage}</span>
                </div>
            )
        }
    }
    //#endregion

    return (
        <div style={imageContainerStyles}>
            <div style={theatreImageStyles()}></div>
            {WriteTextOnTheImage()}
        </div>
    )
}

export default ImageCard