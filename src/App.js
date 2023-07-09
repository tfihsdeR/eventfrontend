import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AboutUs from './Pages/AboutUs';
import Theatres from './Pages/Theatres';
import ArtGaleries from "./Pages/ArtGaleries"
import Concerts from "./Pages/Concerts"
import SearchResults from './Pages/SearchResults'
import { useState } from 'react';
import EventDetails from './Pages/EventDetails';
import "./Fonts/Dirtyboy-BxYl.ttf"
import "./Fonts/DarlingtonDemo-z8xjG.ttf"
import "./Fonts/Silverstone-PKzn7.otf"
import "./Fonts/Abrushow-ALwDD.ttf"
import "./Fonts/NightLoverDemo-rgJRp.ttf"
import "./Fonts/Acakadut-GOZ5A.ttf"

function App() {

	const [searchBarValue, setSearchBarValue] = useState("");
	const navigate = useNavigate();
	const [searchedEvents, setSearchedEvents] = useState([]);
	const [allImages, setAllImages] = useState([]);

	//#region STYLES
	const mainStyles = {
		marginTop: "100px",
		minHeight: "90vh",
	}

	const footerStyles = {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "black",
		color: "white",
		width: "100%"
	}

	const navigationContainerStyles = {
		position: "fixed",
		top: "0",
		left: "0",
		right: "0",
		zIndex: "9999",
		backgroundColor: "orange",
		justifyContent: "center",
		display: "flex",
		minHeight: "60px"
	}

	const navigationStyles = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "NightLoverDemo",
		fontSize: "40px",
		color: "dark"
	}


	const searchBarStyles = {
		display: "inline-flex",
		justifyContent: "flex-end",
		alignItems: "center",
		position: "absolute",
		top: "50%",
		transform: "translate(250%, -50%)",
	};

	const appJsStyles = {
		backgroundImage: "url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)",
		backgroundSize: "cover",
		backgroundPosition: "center",
		justifyContent: 'center',
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
	}
	//#endregion

	const SearchEvent = (event) => {
		if (event.key === "Enter") {
			event.target.value = "";
			handleSearch();
		}
	}

	const handleSearch = async () => {
		await fetch(`https://localhost:7191/api/Event/events/keyword?keyword=${searchBarValue}`)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					return null;
				}
			})
			.then(data => setSearchedEvents(data))
		await fetch(`https://localhost:7191/api/Image/Image/${searchBarValue}`)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					return null;
				}
			})
			.then(data => setAllImages(data));
		navigate(`searchResults/${searchBarValue}`);
	};

	return (
		<div className="App" style={appJsStyles}>
			<header className="App-header">
				<div style={navigationContainerStyles}>
					<div id='navigation' style={navigationStyles}>
						<nav>
							<div className="navigationLinks" >
								<Link to="/mainPage" style={{ marginRight: "50px", color: "black" }}>Main Page</Link>
								<Link to="/aboutUs" style={{ color: "black" }}>About Us</Link>
							</div>
						</nav>
					</div>

					<div style={searchBarStyles}>
						<input style={{ height: "25px" }} placeholder='Search' type='text' onChange={s => setSearchBarValue(s.target.value)} onKeyPress={SearchEvent} />
						<i className="fas fa-search" style={{ fontSize: "15px", marginLeft: "5px" }} onClick={handleSearch}></i>
					</div>
				</div >
			</header >

			<main id='main' style={mainStyles}>
				<div id='routes'>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/mainPage' element={<MainPage />} />
						<Route path='/aboutUs' element={<AboutUs />} />
						<Route path="/theatres" element={<Theatres />} />
						<Route path="/artGaleries" element={<ArtGaleries />} />
						<Route path="/concerts" element={<Concerts />} />
						<Route path="/searchResults/:keyword" element={<SearchResults _searchedEvents={searchedEvents} _allImages={allImages} />} />
						<Route path="/eventDetails/:id" element={<EventDetails />} />
					</Routes>
				</div>
			</main>

			<footer style={footerStyles}>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<span>Created By <span style={{ fontFamily: "Silverstone", fontSize: "20px" }}>Erdinç Atay</span></span>
				</div>
			</footer>
		</div >
	);
}

export default App;
