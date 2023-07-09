import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SearchResults({ _searchedEvents, _allImages }) {

    const { keyword } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("_searchedEvents: ", _searchedEvents)
        console.log("_allImages: ", _allImages)
    }, [_searchedEvents, _allImages])


    //#region STYLES
    const errorTextStyles = {
        fontFamily: "Acakadut",
        fontSize: "50px"
    };

    const frameStyles = {
        border: "1px  solid black"
    };

    const searchExplainStyles = {
        fontFamily: "Acakadut",
        fontSize: "25px",
        marginBottom: "30px"
    };

    const tableContainerStyles = {
        display: "flex",
        justifyContent: "center"
    };

    const imageContainerStyles = {
        width: "400px",
        height: "200px",
        display: "inline-flex",

        marginLeft: "20px",
        marginRight: "20px"
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
                _searchedEvents != null && _allImages != null ? (
                    <div style={searchedItemsContainer}>
                        {_searchedEvents.map(e => (
                            <div style={imageContainerStyles}>
                                <div style={linkStyles} onClick={() => navigate(`/eventDetails/${e.id}`)}>
                                    <div style={theatreImageStyles(_allImages, e.id)}></div>
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