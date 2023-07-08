import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AboutUs from './Pages/AboutUs';
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
		marginTop: "100px",
		minHeight: "90vh",
		minWidth: "1000px"
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
		alignItems: "center"
	}


	const searchBarStyles = {
		display: "inline-flex",
		justifyContent: "flex-end",
		alignItems: "center",
		position: "absolute",
		transform: "translate(50%, 50%)",
		marginLeft: "800px"
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
			handleSearch();
		}
	}

	const handleSearch = () => {
		console.log("Search value:", searchBarValue);
	};

	return (
		<div className="App" style={appJsStyles}>
			<Router>
				<header className="App-header">
					<div style={navigationContainerStyles}>
						<div id='navigation' style={navigationStyles}>
							<nav>
								<div className="navigationLinks" >
									<Link to="/mainPage" style={{ marginRight: "50px" }}>Main Page</Link>
									<Link to="/aboutUs" >About Us</Link>
								</div>
							</nav>
						</div>

						<div style={searchBarStyles}>
							<input style={{ height: "25px" }} placeholder='Search' type='text' onChange={s => setSearchBarValue(s.target.value)} onKeyPress={SearchEvent} />
							<i className="fas fa-search" style={{ fontSize: "15px", marginLeft: "5px" }} onClick={handleSearch}></i>
						</div>
					</div>
				</header>

				<main id='main' style={mainStyles}>
					<div id='routes'>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/mainPage' element={<MainPage />} />
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
		</div >
	);
}

export default App;
