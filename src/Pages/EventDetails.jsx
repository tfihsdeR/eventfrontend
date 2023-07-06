import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../Components/JS/ImageSlider";

function EventDetails({ images }) {

    const { id } = useParams();
    const [allImages, setAllImages] = useState([]);
    const [eventDetails, setEventDetails] = useState([]);


    //#region STYLES
    const sliderContainerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto",
    };


    //#endregion

    useEffect(() => {
        fetch(`https://localhost:7191/api/Image`)
            .then(response => response.json())
            .then(data => {
                const filteredImages = data.filter(i => i.eventId == id);
                setAllImages(filteredImages);
            });

        fetch(`https://localhost:7191/api/Event/${id}`)
            .then(response => response.json())
            .then(data => setEventDetails(data));
    }, [])


    return (
        <div style={{ marginTop: "100px" }}>
            <div>
                <h1>{eventDetails.name}</h1>
            </div>

            <div >
                <div style={sliderContainerStyles}>
                    <ImageSlider slides={allImages} />
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
