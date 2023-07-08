import React from 'react'
import ImageSlider from "../Components/ImageSlider";
import { Link } from 'react-router-dom';
function MainPage() {

	//#region PROPERTIES
	const slides = [
		{ imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/d5550b8/2147483647/strip/false/crop/1416x796+0+0/resize/1416x796!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa7%2Fc6%2F4502753bd827515c7134951ba60e%2Fsd-1503976985-tw487nv9sd-snap-image", title: "Hamlet" },
		{ imageUrl: "https://www.comedie-francaise.fr/www/comedie/media/image/spectacle/coverfaust1718.jpg", title: "Faust" },
		{ imageUrl: "https://www.kultursanatharitasi.com/wp-content/uploads/2015/04/phantom-of-the-opera.jpg", title: "The Phantom of the Opera" },
		{ imageUrl: "https://cdn2.rsc.org.uk/sitefinity/images/productions/productions-2009-and-before/Romeo-and-Juliet/romeo-and-juliet_-2000_-love-at-first-sight_2000_photo-by-robert-workman-_c_-rsc_103542.tmb-img-912.jpg?sfvrsn=bbb03a21_1", title: "Romeo and Juliet" },
		{ imageUrl: "https://cdn.londonandpartners.com/asset/les-miserables-the-musical-at-the-sondheim-theatre_les-miserables-image-courtesy-of-cameron-mackintosh_a336a558488e8570eb52e027042a4902.jpg", title: "Les Misérables at the Sondheim" }
	];

	const eventMainImages = [
		{ imageUrl: "https://t3.ftcdn.net/jpg/03/74/28/58/360_F_374285858_KzJ88FysqJ79AhyNPW2lqnBtsRTokuav.jpg", title: "Theatre" },
		{ imageUrl: "https://media.istockphoto.com/id/1366076847/tr/foto%C4%9Fraf/concert-and-festival-background-crowd-of-people-partying.jpg?s=170667a&w=0&k=20&c=dQHydC_Q8CVvuWnsgYXrZDrEfJ8UwQRlNqQD2wSEUnE=", title: "Concert" },
		{ imageUrl: "https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/2021-09/TTD_ArtGalleries.jpg?VersionId=vTzNwgFkdGXdrmtW0Emr7pC6lmSQTHXY", title: "Art Galery" }
	];
	//#endregion

	//#region STYLES
	const eventHeaderStyles = {
		display: "flex",
		justifyContent: "center",
		fontSize: "50px",
		marginBottom: "20px",
		fontFamily: "DirtyBoys",
	};

	const eventsContainerStyles = {
		marginTop: "50px",
		height: "300px"
	};

	const sliderContainerStyles = {
		width: "500px",
		height: "280px",
		margin: "0 auto",
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

	const theatreImageStyles = {
		width: "100%",
		height: "100%",
		borderRadius: "10px",
		backgroundPosition: "center",
		backgroundSize: "contain",
		backgroundImage: `url(${eventMainImages.find(e => e.title.toLowerCase() === "theatre").imageUrl})`,
	};

	const eventsImagesStyles = {
		display: "flex",
		justifyContent: "space-around",
	};

	const concertImageStyles = {
		width: "100%",
		height: "100%",
		borderRadius: "10px",
		backgroundPosition: "center",
		backgroundSize: "contain",
		backgroundImage: `url(${eventMainImages.find(e => e.title.toLowerCase() === "concert").imageUrl})`,
	};

	const artGaleryImageStyles = {
		width: "100%",
		height: "100%",
		borderRadius: "10px",
		backgroundPosition: "center",
		backgroundSize: "contain",
		backgroundImage: `url(${eventMainImages.find(e => e.title.toLowerCase() === "art galery").imageUrl})`,
	};

	const imageTextStyles = {
		position: "absolute",
		fontSize: "50px",
		color: "white",
		fontFamily: "Acakadut"
	};
	//#endregion

	return (
		<div>
			<div >
				<div style={sliderContainerStyles}>
					<ImageSlider slides={slides} />
				</div>
			</div>

			<div style={eventsContainerStyles}>
				<div style={eventHeaderStyles}>
					<span>EVENTS</span>
				</div>

				<div style={eventsImagesStyles}>
					<div style={imageContainerStyles}>
						<Link to="/theatres" style={linkStyles}>
							<div style={theatreImageStyles}></div>
							<div style={imageTextStyles}><span>Theatres</span></div>
						</Link>
					</div>

					<div style={{ ...imageContainerStyles, marginLeft: "20px", marginRight: "20px" }}>
						<Link to="/concerts" style={linkStyles}>
							<div style={concertImageStyles}></div>
							<div style={imageTextStyles}><span>Concerts</span></div>
						</Link>
					</div>

					<div style={imageContainerStyles}>
						<Link to="/artGaleries" style={linkStyles}>
							<div style={artGaleryImageStyles}></div>
							<div style={imageTextStyles}><span>Art Galeries</span></div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage