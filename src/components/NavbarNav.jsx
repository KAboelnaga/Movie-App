import { Link, useLocation } from "react-router"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LanguageContext } from '../context/LanguageContext'
import { useContext } from "react";
import { useSelector } from "react-redux";
import { CategoryContext } from "../context/CategoryContext";
import navbar from "./JS/navbar";
export default function NavbarNav(){
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const { language, setLanguage } = useContext(LanguageContext);
    const {category,setCategory} = useContext(CategoryContext);
    const location = useLocation();
    const handleSelect = (lang) => {
        setLanguage(lang);
    };
    const changeCategory = (cat) =>{
        setCategory(cat);
        
    }
    return(<>
        <Navbar expand="md" className="bg-yellow d-flex">
        <Navbar.Brand as={Link} to={'/'} className="mx-5 inter-700">{navbar.navTitle[language]}</Navbar.Brand>

        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
            <div className="d-flex justify-content-between w-100">
            {location.pathname === '/' &&
        <div className="d-flex justify-content-start align-items-center">
            <Nav.Item onClick={() => changeCategory('movies')} className={`me-3 ${category === 'movies' ? 'inter-700 text-decoration-underline' : 'inter-400'}`}  style={{ cursor: 'pointer' }}>{navbar.navMovies[language]}</Nav.Item>


            <Nav.Item onClick={() => changeCategory('shows')} className={`me-3 ${category === 'shows' ? 'inter-700 text-decoration-underline' : 'inter-400'}`}  style={{ cursor: 'pointer' }}>{navbar.navShows[language]}</Nav.Item>
        </div>
        }
            <Nav className="justify-content-end align-items-center">
                <NavDropdown title={language} onSelect={handleSelect} className="inter-700 me-2">
                <NavDropdown.Item eventKey="en" active={language === 'en'}>EN</NavDropdown.Item>
                <NavDropdown.Item eventKey="ar"active={language === 'ar'}>AR</NavDropdown.Item>
                <NavDropdown.Item eventKey="fr"active={language === 'fr'}>FR</NavDropdown.Item>
                <NavDropdown.Item eventKey="zh"active={language === 'zh'}>ZH</NavDropdown.Item>
            </NavDropdown>
            <span className="nav-item align-items-center">
                <Link className="nav-link me-3 p-0" to="/watchlist">
                    <button className="btn border-0"><i className="bi bi-heart-fill fs-3"></i>{navbar.watchList[language]}</button>
                    <span className="d-inline-flex align-items-start mx-1" style={{fontSize: '15px'}}>{Object.keys(favoriteItems).length > 0 && Object.keys(favoriteItems).length}</span>
                </Link>
            </span>
            </Nav>
            </div>
        </Navbar.Collapse>
    </Navbar>
    </>
    )
}