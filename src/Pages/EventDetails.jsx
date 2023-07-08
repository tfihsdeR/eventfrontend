import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../Components/ImageSlider";

function EventDetails({ images }) {

    const { id } = useParams();
    const [allImages, setAllImages] = useState([]);
    const [eventDetails, setEventDetails] = useState([]);
    const [venue, setVenue] = useState([]);

    //#region STYLES
    const sliderContainerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto",
    };

    const descriptionStyles = {
        fontSize: "30px",
    };

    const descriptionContainerStyles = {
        marginTop: "50px"
    };

    const dateInfoHeadStyles = {
        fontSize: "23px"
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

        fetch(`https://localhost:7191/api/Venue/venues/${id}`)
            .then(response => response.json())
            .then(data => setVenue(data));
    }, [])


    return (
        <div style={{ marginTop: "100px" }}>
            <div>
                <h1 style={{ fontFamily: "Acakadut", fontSize: "50px" }}>{eventDetails.name}</h1>
            </div>

            <div >
                <div style={sliderContainerStyles}>
                    <ImageSlider slides={allImages} />
                </div>

                <div style={descriptionContainerStyles}>
                    <p style={descriptionStyles}>Event Description</p>
                </div>

                <div style={{ display: "inline-flex", justifyContent: "space-between" }}>
                    <div style={{ marginRight: "25px" }}>
                        <div><span style={dateInfoHeadStyles}>Start Date</span></div>
                        <div><span>{eventDetails.length != 0 ? eventDetails.startDate.slice(0, 10) : null}</span></div>
                    </div>
                    <div>
                        <div><span style={dateInfoHeadStyles}>End Date</span></div>
                        <div><span>{eventDetails.length != 0 ? eventDetails.endDate.slice(0, 10) : null}</span></div>
                    </div>
                </div>
                <div style={{ marginTop: "50px" }}>
                    <iframe
                        src={venue.length != 0 ? venue[0].googleMapSource : null}
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
