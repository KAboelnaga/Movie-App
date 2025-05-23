import { Link, useLocation } from "react-router";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LanguageContext } from '../context/LanguageContext';
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { CategoryContext } from "../context/CategoryContext";
import 'hamburgers/dist/hamburgers.css';
import navbar from "./JS/navbar";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

export default function NavbarNav() {
    const [isActive, setIsActive] = useState(false);
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const { language, setLanguage } = useContext(LanguageContext);
    const { category, setCategory } = useContext(CategoryContext);
    const {theme} = useContext(ThemeContext);
    const location = useLocation();
    const [textColor, setTextColor] = useState(theme === 'dark' ? 'white' : 'black');
    useEffect(() => {
        if (theme === 'dark')
            setTextColor('white');
        else
            setTextColor('black');
        
    },[theme]);
    const toggleMenu = () => setIsActive(!isActive);

    const handleSelect = (lang) => setLanguage(lang);

    const changeCategory = (cat) => setCategory(cat);
    
    const closeNavbar = () => setIsActive(false); 

  return (
    <Navbar expand="md" className="bg-yellow position-absolute top-0 w-100" expanded={isActive}>
      <Container fluid>
        <Navbar.Brand as={Link} to={'/'} className="mx-lg-5 inter-700" onClick={closeNavbar}>
          {navbar.navTitle[language]}
        </Navbar.Brand>

        {/* Hamburger Button */}
        <button
          className={`d-md-none hamburger hamburger--spin ${isActive ? 'is-active' : ''}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        <Navbar.Collapse className="justify-content-between align-items-center w-100"  style={{
        position: isActive ? 'fixed' : 'relative', // FIXED when open
        top: isActive ? '56px' : 'auto',           // adjust if navbar height different
        left: 0,
        right: 0,
        backgroundColor: 'var(--bs-yellow)',       // or your bg color
        zIndex: 1099,
        padding: isActive ? '1rem' : 0,
        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
      }}>
          <Nav className="d-lg-flex align-items-lg-center">
            {location.pathname === '/' && (
              <>
                <Nav.Item
                  onClick={() => {changeCategory('movies'); setIsActive(false);}}
                  className={`mx-3 my-2 ${category === 'movies' ? 'inter-700 fs-4' : 'inter-400'}`}
                  style={{ cursor: 'pointer' }}
                >
                  {navbar.navMovies[language]}
                </Nav.Item>
                <Nav.Item
                  onClick={() => {changeCategory('shows'); setIsActive(false);}}
                  className={`mx-3 my-2 ${category === 'shows' ? 'inter-700 fs-4' : 'inter-400'}`}
                  style={{ cursor: 'pointer' }}
                >
                  {navbar.navShows[language]}
                </Nav.Item>
              </>
            )}
          </Nav>

          <Nav>
            <NavDropdown title={language} onSelect={(lang) =>{ handleSelect(lang); setIsActive(false);}} className='inter-700 mx-3 my-2 d-lg-align-items-center'>
                <NavDropdown.Item eventKey="en" >EN</NavDropdown.Item>
                <NavDropdown.Item eventKey="ar" active={language === 'ar'}>AR</NavDropdown.Item>
                <NavDropdown.Item eventKey="fr" active={language === 'fr'}>FR</NavDropdown.Item>
                <NavDropdown.Item eventKey="zh" active={language === 'zh'}>ZH</NavDropdown.Item>
            </NavDropdown>

            <span className="nav-item align-items-center justify-content-end">
              <Link className="nav-link p-0" to="/watchlist">
                <button className={`btn border-0 text-decoration-none text-${textColor}`} onClick={() => setIsActive(false)}>
                  <i className="bi bi-heart-fill fs-3"></i>{navbar.watchList[language]}
                </button>
                <span className={`d-inline-flex align-items-start bg-light2 px-2 text-${textColor} rounded-5 me-1`} style={{ fontSize: '15px' }}>
                  {Object.keys(favoriteItems).length > 0 && Object.keys(favoriteItems).length}
                </span>
              </Link>
            </span>

            <ThemeToggle closeNavbar={() => closeNavbar()}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
