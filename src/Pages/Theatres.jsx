import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Theatres() {

    //#region PROPERTIES
    const [theatres, setTheatres] = useState([]);
    const [allImages, setAllImages] = useState([]);
    //#endregion

    useEffect(() => {
        fetch("https://localhost:7191/api/Event")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(e => e.categoryId == 1);
                setTheatres(filteredData);
            });

        fetch("https://localhost:7191/api/Image")
            .then(response => response.json())
            .then(data => setAllImages(data))
    }, [])

    const navigate = useNavigate();

    //#region FUNCTIONS
    const ShowAllTheatres = () => {
        let newDivItems = [];
        let innerCounter = 1;

        let newDivS = [];


        for (let i = 0; i < theatres.length; i++) {
            newDivItems.push(theatres[i]);
            innerCounter++;

            if (innerCounter == 3 || i == theatres.length) {
                newDivS = [...newDivS, newDivItems];
                newDivItems = [];
                innerCounter = 1;
            }
        }

        return (
            <div>
                {newDivS.map(d => (
                    <div style={eventsImagesStyles}>
                        {d.map(innerTheatre => (
                            <div style={imageContainerStyles}>
                                <div style={linkStyles} onClick={() => navigate(`/eventDetails/${innerTheatre.id}`)}>
                                    <div style={theatreImageStyles(allImages, innerTheatre.id)}></div>
                                    <div style={imageTextStyles}><span>{innerTheatre.name}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };
    //#endregion 

    //#region STYLES
    const eventsImagesStyles = {
        display: "flex",
        justifyContent: "space-around",
    };

    const imageContainerStyles = {
        width: "400px",
        height: "200px",
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
                <h1 style={{ fontFamily: "DirtyBoys", fontSize: "50px" }}>THEATRES</h1>
            </div>

            <div>
                {
                    allImages.length != 0 ? ShowAllTheatres() : null
                }
            </div>
        </div>
    )
}

export default Theatres