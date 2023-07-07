import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Concerts() {

    const [concerts, setConcerts] = useState([]);
    const [allImages, setAllImages] = useState([]);
    //#endregion

    useEffect(() => {
        fetch("https://localhost:7191/api/Event")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(e => e.categoryId == 3);
                setConcerts(filteredData);
            });

        fetch("https://localhost:7191/api/Image")
            .then(response => response.json())
            .then(data => setAllImages(data))
    }, [])

    const navigate = useNavigate();

    //#region FUNCTIONS
    const ShowAllConcerts = () => {
        let newDivItems = [];
        let innerCounter = 1;

        let newDivS = [];


        for (let i = 0; i < concerts.length; i++) {
            newDivItems.push(concerts[i]);
            innerCounter++;

            if (innerCounter == 3 || i == concerts.length - 1) {
                newDivS = [...newDivS, newDivItems];
                newDivItems = [];
                innerCounter = 1;
            }
        }

        return (
            <div>
                {newDivS.map(d => (
                    <div style={eventsImagesStyles}>
                        {d.map(innerconcerts => (
                            <div style={imageContainerStyles}>
                                <div style={linkStyles} onClick={() => navigate(`/eventDetails/${innerconcerts.id}`)}>
                                    <div style={theatreImageStyles(allImages, innerconcerts.id)}></div>
                                    <div style={imageTextStyles}><span>{innerconcerts.name}</span></div>
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
        marginBottom: "80px"
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
    };
    //#endregion

    return (
        <div>
            <div>
                <h1>CONCERTS</h1>
            </div>

            <div>
                {
                    allImages.length != 0 ? ShowAllConcerts() : null
                }
            </div>
        </div>
    )
}

export default Concerts