import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SearchResults({ _searchedEvents }) {

    const { keyword } = useParams();
    const navigate = useNavigate();

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
    //#endregion

    const ResultOfTheSearch = () => {
        if (_searchedEvents != null) {
            return (
                <div>
                    <div style={searchExplainStyles}>
                        <span>Click to the Event Name to navigate the event details!</span>
                    </div>
                    <div style={tableContainerStyles}>
                        <table style={frameStyles}>
                            <thead style={frameStyles}>
                                <tr style={frameStyles}>
                                    <th style={frameStyles}>Event</th>
                                    <th style={frameStyles}>Orginazor</th>
                                    <th style={frameStyles}>Start Date</th>
                                    <th style={frameStyles}>End Date</th>
                                </tr>
                            </thead>
                            <tbody style={frameStyles}>
                                {
                                    _searchedEvents.map((e, index) => {
                                        return (
                                            <tr key={index} style={frameStyles}>
                                                <td style={{ ...frameStyles, cursor: "pointer" }} onClick={() => navigate(`/eventDetails/${e.id}`)}>{e.name}</td>
                                                <td style={frameStyles}>{e.organizer}</td>
                                                <td style={frameStyles}>{e.startDate.slice(0, 10)}</td>
                                                <td style={frameStyles}>{e.endDate.slice(0, 10)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <span style={errorTextStyles}>There is no event to display!</span>
            );
        }
    }

    return (
        <div>
            <div style={{ justifyContent: "center", display: "flex" }}>
                {
                    ResultOfTheSearch()
                }
            </div>
        </div>
    )
}

export default SearchResults