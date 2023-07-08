import { useEffect, useState } from "react";

const ImageSlider = ({ slides }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    //#region FUNCTIONS
    const GoToPrevious = () => {
        const isFirstSlide = currentImageIndex == 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
    }

    const GoToNext = () => {
        const isLastSlide = currentImageIndex == slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
    }

    const goToSlide = (slideIndex) => {
        setCurrentImageIndex(slideIndex);
    }
    //#endregion

    useEffect(() => {
        const interval = setInterval(() => {
            GoToNext();
        }, 3500);

        return () => {
            clearInterval(interval);
        };
    }, [currentImageIndex]);

    //#region STYLES
    const sliderStyles = {
        height: "100%",
        position: "relative"
    };

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentImageIndex] == undefined ? null : slides[currentImageIndex].imageUrl})`
    };

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer"
    };

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer"
    };

    const dotsContainerStyles = {
        display: "flex",
        justifyContent: "center"
    };

    const dotsStyles = {
        margin: "0 3px",
        cursor: "pointer",
        fontSize: "20px"
    };

    const nameStyles = {
        position: "absolute",
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "25px",
        color: "white",
        // textDecoration: "underline"
    };

    //#endregion

    return (
        <div id="imageSlider" style={sliderStyles}>
            <div style={leftArrowStyles} onClick={GoToPrevious}>&#10216;</div>
            <div style={rightArrowStyles} onClick={GoToNext}>&#10217;</div>
            <div style={slideStyles}></div>
            <div style={dotsContainerStyles}>
                {
                    slides.map((slide, slideIndex) => (
                        <div key={slideIndex}
                            style={dotsStyles}
                            onClick={() => goToSlide(slideIndex)}
                        >
                            &bull;
                        </div>
                    ))
                }
            </div>
            <div style={nameStyles}>
                {slides[currentImageIndex] == undefined ? null : slides[currentImageIndex].title}
            </div>

        </div>
    )
}

export default ImageSlider;