import React, { useEffect, useState } from 'react'
import ImageCard from '../Components/ImageCard';

function Concerts2() {
    const [allConcertEvents, setAllConcertEvents] = useState([]);
    const [allImages, setAllImages] = useState([]);

    //#region FUNCTIONS

    //#endregion

    useEffect(() => {
        fetch("https://localhost:7191/api/Event")
            .then(response => response.json())
            .then(data => setAllConcertEvents(data));

        fetch("https://localhost:7191/api/Image")
            .then(response => response.json())
            .then(data => setAllImages(data));
    }, [])


    return (
        <div>
            if (allImages.length != 0) {
                // <ImageCard image={allImages.filter(i => i.eventId == )} name={"concert"} />
            }
        </div>
    )
}

export default Concerts2