import { Link } from "react-router"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LanguageContext } from '../context/LanguageContext'
import { useContext } from "react";
import { useSelector } from "react-redux";
export default function NavbarNav(){
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const { language, setLanguage } = useContext(LanguageContext);
    const handleSelect = (lang) => {
        setLanguage(lang);
    };
    return(<>
        <Navbar expand="md" className="bg-yellow">
        <Navbar.Brand as={Link} to={'/'} className="ms-3 inter-700">Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end align-items-center">
            <Nav className="align-items-center">
                <NavDropdown title={language} onSelect={handleSelect} className="inter-700 me-2">
                <NavDropdown.Item eventKey="EN" active={language === 'EN'}>EN</NavDropdown.Item>
                <NavDropdown.Item eventKey="AR"active={language === 'AR'}>AR</NavDropdown.Item>
            </NavDropdown>
            <span className="nav-item align-items-center">
                <Link className="nav-link me-3 p-0" to="/watchlist">
                    <button className="btn border-0"><i className="bi bi-heart-fill fs-3"></i> Watchlist</button>
                    <span className="d-inline-flex align-items-start me-3" style={{fontSize: '15px'}}>{Object.keys(favoriteItems).length > 0 && Object.keys(favoriteItems).length}</span>
                </Link>
            </span>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
    )
}