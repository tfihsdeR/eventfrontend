import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ArtGaleries() {
    const [artGaleries, setArtGaleries] = useState([]);
    const [allImages, setAllImages] = useState([]);
    //#endregion

    useEffect(() => {
        fetch("https://localhost:7191/api/Event")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(e => e.categoryId == 2);
                setArtGaleries(filteredData);
            });

        fetch("https://localhost:7191/api/Image")
            .then(response => response.json())
            .then(data => setAllImages(data))
    }, [])

    const navigate = useNavigate();

    //#region FUNCTIONS
    const ShowAllArtGaleries = () => {
        let newDivItems = [];
        let innerCounter = 1;

        let newDivS = [];


        for (let i = 0; i < artGaleries.length; i++) {
            newDivItems.push(artGaleries[i]);
            innerCounter++;

            if (innerCounter == 3 || i == artGaleries.length - 1) {
                newDivS = [...newDivS, newDivItems];
                newDivItems = [];
                innerCounter = 1;
            }
        }

        return (
            <div>
                {newDivS.map(d => (
                    d.map(innerartGaleries => (
                        <div style={imageContainerStyles}>
                            <div style={linkStyles} onClick={() => navigate(`/eventDetails/${innerartGaleries.id}`)}>
                                <figure class="effect-bubba" style={{ height: "100%", width: "100%" }}>
                                    <img src={`${allImages.find(i => i.eventId == innerartGaleries.id).imageUrl}`} style={{ width: "100%", height: "100%", borderRadius: "10px", }} />
                                    <figcaption style={{ height: "100%", width: "100%" }}>
                                        <h2>{innerartGaleries.name}</h2>
                                        <p>Start Date: <span>{innerartGaleries.startDate.slice(0, 10)}</span></p>
                                        <p>End Date: <span>{innerartGaleries.endDate.slice(0, 10)}</span></p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        );
    };
    //#endregion 

    //#region STYLES
    const eventsImagesStyles = {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "80px"
    };

    const imageContainerStyles = {
        width: "400px",
        height: "200px",
        display: "inline-flex",

        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "20px",
        flexWrap: "wrap"
    };

    const linkStyles = {
        display: "flex",
        width: "400px",
        height: "200px",
        margin: "0 auto",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
    };

    const theatreImageStyles = (imagesList, id) => {
        return {
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${imagesList.find(i => i.eventId == id).imageUrl})`,
        }
    }

    const imageTextStyles = {
        position: "absolute",
        fontSize: "50px",
        color: "white",
        fontFamily: "Acakadut"
    };
    //#endregion

    return (
        <div>
            <div>
                <h1 style={{ fontFamily: "DirtyBoys", fontSize: "50px" }}>ART GALERIES</h1>
            </div>

            <div>
                {
                    allImages.length != 0 ? ShowAllArtGaleries() : null
                }
            </div>
        </div>
    )
}

export default ArtGaleries