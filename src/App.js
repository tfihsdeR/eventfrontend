import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AboutUs from './Pages/AboutUs';
import Events from './Pages/Events';
import Theatres from './Pages/Theatres';
import ArtGaleries from "./Pages/ArtGaleries"
import Concerts from "./Pages/Concerts"
import SearchResults from './Pages/SearchResults'
import { useEffect, useState } from 'react';
import EventDetails from './Pages/EventDetails';

function App() {

	const [searchBarValue, setSearchBarValue] = useState("");

	//#region STYLES
	const mainStyles = {
		marginTop: "70px",
		minHeight: "90vh"
	}

	const footerStyles = {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "black",
		color: "white"
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
		height: "50px",
		maxHeight: "200"
	}

	const navigationStyles = {
		display: "inline-flex",
		alignItems: "center",
	}

	const searchBarStyles = {
		display: "inline-flex",
		justifyContent: "flex-end",
		alignItems: "center"
	}
	//#endregion

	return (
		<div className="App" style={{ backgroundImage: "url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)", backgroundSize: "contain", backgroundPosition: "center", }}>
			<Router>
				<header className="App-header">
					<div style={navigationContainerStyles}>
						<div id='navigation' style={navigationStyles}>
							<nav>
								<div className="navigationLinks" >
									<Link to="/mainPage" style={{ marginLeft: "380px", marginRight: "50px" }}>Main Page</Link>
									{/* <Link to="/events" style={{ marginRight: "50px", marginLeft: "50px" }}>Events</Link> */}
									<Link to="/aboutUs" style={{ marginRight: "200px" }}>About Us</Link>
								</div>
							</nav>
						</div>

						<div>
							<Link to="/theatres"></Link>
						</div>

						<div style={searchBarStyles}>
							<input style={{ height: "25px" }} placeholder='Search' type='text' onChange={s => setSearchBarValue(s.target.value)} />
							<i className="fas fa-search" style={{ fontSize: "15px", marginLeft: "5px" }}></i>
						</div>
					</div>
				</header>

				<main id='main' style={mainStyles}>
					<div id='routes'>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/mainPage' element={<MainPage />} />
							{/* <Route path='/events' element={<Events />} /> */}
							<Route path='/aboutUs' element={<AboutUs />} />
							<Route path="/theatres" element={<Theatres />} />
							<Route path="/artGaleries" element={<ArtGaleries />} />
							<Route path="/concerts" element={<Concerts />} />
							<Route path="/searchResults" element={<SearchResults />} />
							<Route path="/eventDetails/:id" element={<EventDetails />} />
						</Routes>
					</div>
				</main>
			</Router>

			<footer style={footerStyles}>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<span>Created By Erdinç Atay</span>
				</div>
			</footer>
		</div>
	);
}

export default App;
