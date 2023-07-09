import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../Components/ImageSlider";

function EventDetails({ images }) {

    const { id } = useParams();
    const [allImages, setAllImages] = useState([]);
    const [eventDetails, setEventDetails] = useState([]);
    const [venue, setVenue] = useState([]);
    const [priceBySeats, setPriceBySeats] = useState(null);

    const [singlePriceAdult, setSinglePriceAdult] = useState(null);
    const [standartSeatPriceAdult, setstandartSeatPriceAdult] = useState(null);
    const [premiumSeatPriceAdult, setpremiumSeatPriceAdult] = useState(null);
    const [vipSeatPriceAdult, setvipSeatPriceAdult] = useState(null);

    const [singlePriceStudent, setSinglePriceStudent] = useState(null);
    const [standartSeatPriceStudent, setstandartSeatPriceStudent] = useState(null);
    const [premiumSeatPriceStudent, setpremiumSeatPriceStudent] = useState(null);
    const [vipSeatPriceStudent, setvipSeatPriceStudent] = useState(null);

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

    const priceContainerStyles = {
        display: "inline-flex",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid black",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "20px",
        // flexWrap: "wrap"
    };

    const borderStyles = {
        border: "1px solid black"
    };
    //#endregion

    useEffect(() => {
        const fetchImages = fetch(`https://localhost:7191/api/Image`)
            .then((response) => response.json())
            .then((data) => {
                const filteredImages = data.filter((i) => i.eventId == id);
                setAllImages(filteredImages);
            });

        const fetchEvents = fetch(`https://localhost:7191/api/Event/${id}`)
            .then((response) => response.json())
            .then((data) => setEventDetails(data));

        const fetchVenues = fetch(`https://localhost:7191/api/Venue/venues/${id}`)
            .then((response) => response.json())
            .then((data) => setVenue(data));

        const fetchPriceBySeats = fetch(`https://localhost:7191/api/PriceBySeat/priceBySeats/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPriceBySeats(data);

                if (data != null) {
                    const studentPbc = data.find((pbc) => pbc.isStudent === true);
                    const adultPbc = data.find((pbc) => pbc.isStudent !== true);

                    if (studentPbc != null) {
                        setPriceBySeatsValuesStudent(studentPbc);
                    }

                    if (adultPbc != null) {
                        setPriceBySeatsValuesAdult(adultPbc);
                    }
                }
            });

        Promise.all([fetchImages, fetchEvents, fetchVenues, fetchPriceBySeats]).catch((error) => {
            // Handle any errors that occurred during fetching
            console.error(error);
        });
    }, []);


    const setPriceBySeatsValuesStudent = (pbc) => {
        setSinglePriceStudent(pbc.singlePrice);
        setstandartSeatPriceStudent(pbc.standardSeatPrice);
        setpremiumSeatPriceStudent(pbc.premiumSeatPrice);
        setvipSeatPriceStudent(pbc.vipSeatPrice);
    }

    const setPriceBySeatsValuesAdult = (pbc) => {
        setSinglePriceAdult(pbc.singlePrice);
        setstandartSeatPriceAdult(pbc.standardSeatPrice);
        setpremiumSeatPriceAdult(pbc.premiumSeatPrice);
        setvipSeatPriceAdult(pbc.vipSeatPrice);
    }

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
                    <p style={descriptionStyles}>{eventDetails.length != 0 ? eventDetails.description : null}</p>
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

                <div>
                    <div style={priceContainerStyles}>
                        <h3>Price (TRY)</h3>
                        <div >
                            <table style={borderStyles}>
                                <thead>
                                    <tr>
                                        <th style={borderStyles}>Seats</th>
                                        <th style={borderStyles}>Adult</th>
                                        <th style={borderStyles}>Student</th>
                                    </tr>
                                </thead>
                                <tbody style={borderStyles}>
                                    <tr >
                                        <th style={borderStyles}>Standard Seats</th>
                                        <td style={borderStyles}>{standartSeatPriceAdult}</td>
                                        <td style={borderStyles}>{standartSeatPriceStudent}</td>

                                    </tr>
                                    <tr>
                                        <th style={borderStyles}>Premium Seats</th>
                                        <td style={borderStyles}>{premiumSeatPriceAdult}</td>
                                        <td style={borderStyles}>{premiumSeatPriceStudent}</td>

                                    </tr>
                                    <tr>
                                        <th style={borderStyles}>VIP Seats</th>
                                        <td style={borderStyles}>{vipSeatPriceAdult}</td>
                                        <td style={borderStyles}>{vipSeatPriceStudent}</td>
                                    </tr>
                                    <tr>
                                        <th style={borderStyles}>Single Price</th>
                                        <td style={borderStyles}>{singlePriceAdult} </td>
                                        <td style={borderStyles}>{singlePriceStudent} </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
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
