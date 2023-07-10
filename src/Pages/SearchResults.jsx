import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SearchResults() {

    const { keyword } = useParams();
    const navigate = useNavigate();

    const [ascendingBtnColor, setascendingBtnColor] = useState("white");
    const [descendingBtnColor, setdescendingBtnColor] = useState("white");

    const [searchedEvents, setSearchedEvents] = useState(null);
    const [allImages, setAllImages] = useState(null);
    const [searchedVenues, setSearchedVenues] = useState(null);

    const [firstDate, setfirstDate] = useState(null);
    const [secondDate, setsecondDate] = useState(null);
    const [selectedVenue, setselectedVenue] = useState();
    const [detailedSearchKeyword, setdetailedSearchKeyword] = useState(null);
    const [isAscending, setisAscending] = useState(true);



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
                // setSearchedEvents([]);
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
                // setAllImages([]);
            });

        fetch("https://localhost:7191/api/Venue")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                }
            })
            .then(data => {
                let sortedVenues = data.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();

                    if (nameA > nameB) {
                        return -1;
                    } else if (nameA < nameB) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                let reverseVenues = sortedVenues.reverse();

                setSearchedVenues(reverseVenues);
            })
            .catch(error => {
                console.error(error);
                // setSearchedVenues([]);
            })
    }, [keyword]);

    //#region FUNCTIONS
    const Search = async () => {
        await fetch(`https://localhost:7191/api/Event/events/keyword?keyword=${searchedEvents}`)
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
                // setSearchedEvents([]);
            });

        await fetch(`https://localhost:7191/api/Image/Image/${searchedEvents}`)
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
                // setAllImages([]);
            });

        const filteredEvents = searchedEvents.filter(event => {
            const endDate = new Date(event.endDate);
            const startDateRangeStart = new Date(firstDate);
            const endDateRangeEnd = new Date(secondDate);

            return endDate <= endDateRangeEnd && endDate >= startDateRangeStart
        });

        const sortedEvents = filteredEvents.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA > nameB) {
                return -1;
            } else if (nameA < nameB) {
                return 1;
            } else {
                return 0;
            }
        });

        let reverseVenues = isAscending ? sortedEvents.reverse() : sortedEvents;

        setSearchedEvents(reverseVenues);

        console.log("SearchedEvents: ", searchedEvents);

        navigate(`/searchResults/${detailedSearchKeyword}`);
    }

    const AscendingClick = () => {
        setascendingBtnColor("red");
        setdescendingBtnColor("white");
        setisAscending(true);
    }

    const DescendingClick = () => {
        setdescendingBtnColor("red");
        setascendingBtnColor("white");
        setisAscending(false);
    }

    const handleFirstDateChange = (event) => {
        const selectedDate = event.target.value;
        const [month, day, year] = selectedDate.split('/');

        const formattedDate = `${day}/${month}/${year}`;

        setfirstDate(formattedDate);
    };

    const handleSecondDateChange = (event) => {
        const selectedDate = event.target.value;
        const [month, day, year] = selectedDate.split('/');

        const formattedDate = `${day}/${month}/${year}`;

        setsecondDate(formattedDate);
    };
    //#endregion

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
            // backgroundPosition: "center",
            // backgroundSize: "cover",
            // backgroundImage: `url(${imagesList.find(i => i.eventId == id).imageUrl})`,
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

    const detailedSearchContainerStyles = {
        display: "inline-flex",
        width: "100%",
        justifyContent: "center"
    };

    const dateContainerStyles = {
        display: "inline-flex",
        flexWrap: "wrap"
    };

    const inputDateStyle = {
        borderRadius: "5px"
    };

    const selectingStyles = {
        display: "inline-flex",
        justifyContent: "space-around",
        width: "70%",
        alignItems: "center",
        flexWrap: "wrap"
    };

    const searchButtonStyles = {
        width: "100px",
        height: "30px",
        borderRadius: "10px"
    };

    const dropdownStyles = {
        borderRadius: "10px",
        width: "250px"
    };
    //#endregion

    return (
        <div>
            <div>
                <h2>Detailed Search</h2>
                <div style={detailedSearchContainerStyles}>
                    <div style={selectingStyles}>
                        <div style={dateContainerStyles}>
                            <div style={{ marginRight: "10px" }}>
                                <label for="firstDate">From: </label>
                                <input type="date" id='firstDate' name='firstDate' style={inputDateStyle} onChange={handleFirstDateChange} />
                            </div>

                            <div>
                                <label for="secondDate">To: </label>
                                <input type="date" id='secondDate' name='secondDate' style={inputDateStyle} onChange={handleSecondDateChange} />
                            </div>


                        </div>

                        <div >
                            <button style={{ borderRadius: "10px", backgroundColor: ascendingBtnColor }} onClick={AscendingClick}>Ascending</button>
                            <button style={{ borderRadius: "10px", marginLeft: "10px", backgroundColor: descendingBtnColor }} onClick={DescendingClick}>Descending</button>
                        </div>

                        <div>
                            <label for="venues" style={{ marginRight: "10px" }}>Venue:</label>
                            <select id="venues" name="venues" style={dropdownStyles} onChange={v => setselectedVenue(v.target.value)}>
                                <option value="default">Select Venue</option>
                                {
                                    searchedVenues != null ? (
                                        searchedVenues.map((v, index) => {
                                            return (
                                                <option key={index}>{v.name}</option>
                                            )
                                        })
                                    ) : null
                                }
                            </select>
                        </div>

                        <div>
                            <input type="text" placeholder='Search' style={{ borderRadius: "10px" }} onChange={k => setdetailedSearchKeyword(k.target.value)} />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "30px" }}>
                    <button style={searchButtonStyles} onClick={Search}>Search</button>
                </div>
            </div>
            <div style={{ marginTop: "30px" }}>
                {
                    searchedEvents != null && allImages != null ? (
                        <div style={searchedItemsContainer}>
                            {searchedEvents.map((e, index) => (
                                <div key={index} style={imageContainerStyles}>
                                    <div style={linkStyles} onClick={() => navigate(`/eventDetails/${e.id}`)}>
                                        <figure class="effect-bubba" style={{ height: "100%", width: "100%" }}>
                                            <img src={`${allImages.find(i => i.eventId == e.id).imageUrl}`} style={{ width: "100%", height: "100%", borderRadius: "10px", }} />
                                            <figcaption style={{ height: "100%", width: "100%" }}>
                                                <h2>{e.name}</h2>
                                                <p>Start Date: <span>{e.startDate.slice(0, 10)}</span></p>
                                                <p>End Date: <span>{e.endDate.slice(0, 10)}</span></p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span style={errorTextStyles}>There is no event to display!</span>
                    )
                }
            </div>
        </div>
    );

}

export default SearchResults