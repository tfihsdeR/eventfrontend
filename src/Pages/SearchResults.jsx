import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SearchResults() {

    const { keyword } = useParams();
    const navigate = useNavigate();

    const [searchedEvents, setSearchedEvents] = useState(null);
    const [allImages, setAllImages] = useState(null);

    useEffect(() => {
        fetch(`https://localhost:7191/api/Event/events/keyword?keyword=${keyword}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                }
            })
            .then(data => {
                setSearchedEvents(data);
            })
            .catch(error => {
                console.error(error);
                setSearchedEvents([]);
            });

        fetch(`https://localhost:7191/api/Image/Image/${keyword}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                }
            })
            .then(data => {
                setAllImages(data);
            })
            .catch(error => {
                console.error(error);
                setAllImages([]);
            });
    }, [keyword]);

    //#region STYLES
    const errorTextStyles = {
        fontFamily: "Acakadut",
        fontSize: "50px"
    };

    const imageContainerStyles = {
        width: "400px",
        height: "200px",
        display: "inline-flex",

        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "20px"
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
    };

    const imageTextStyles = {
        position: "absolute",
        fontSize: "50px",
        color: "white",
        fontFamily: "Acakadut"
    };

    const searchedItemsContainer = {
        justifyContent: "space-around",
        flexWrap: "wrap",
    };
    //#endregion

    return (
        <div>
            {
                searchedEvents != null && allImages != null ? (
                    <div style={searchedItemsContainer}>
                        {searchedEvents.map((e, index) => (
                            <div key={index} style={imageContainerStyles}>
                                <div style={linkStyles} onClick={() => navigate(`/eventDetails/${e.id}`)}>
                                    <div style={theatreImageStyles(allImages, e.id)}></div>
                                    <div style={imageTextStyles}><span>{e.name}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span style={errorTextStyles}>There is no event to display!</span>
                )
            }
        </div>
    );

}

export default SearchResults