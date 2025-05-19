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
        {language == 'en' && <Navbar.Brand as={Link} to={'/'} className="mx-5 inter-700">Movie App</Navbar.Brand>}
        {language == 'ar' && <Navbar.Brand as={Link} to={'/'} className="mx-5 inter-700">تطبيق الأفلام</Navbar.Brand>}
        {language == 'fr' && <Navbar.Brand as={Link} to={'/'} className="mx-5 inter-700">application de film</Navbar.Brand>}
        {language == 'zh' && <Navbar.Brand as={Link} to={'/'} className="mx-5 inter-700">电影应用程序</Navbar.Brand>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end align-items-center">
            <Nav className="align-items-center">
                <NavDropdown title={language} onSelect={handleSelect} className="inter-700 me-2">
                <NavDropdown.Item eventKey="en" active={language === 'en'}>EN</NavDropdown.Item>
                <NavDropdown.Item eventKey="ar"active={language === 'ar'}>AR</NavDropdown.Item>
                <NavDropdown.Item eventKey="fr"active={language === 'fr'}>FR</NavDropdown.Item>
                <NavDropdown.Item eventKey="zh"active={language === 'zh'}>ZH</NavDropdown.Item>
            </NavDropdown>
            <span className="nav-item align-items-center">
                <Link className="nav-link me-3 p-0" to="/watchlist">

                    {language == 'en' && <button className="btn border-0"><i className="bi bi-heart-fill fs-3"></i> Watchlist</button>}
                    {language == 'ar' && <button className="btn border-0"><i className="bi bi-heart-fill fs-3"></i>قائمة المشاهدة</button>}
                    {language == 'fr' && <button className="btn border-0"><i className="bi bi-heart-fill fs-3"></i>Liste de surveillance</button>}
                    {language == 'zh' && <button className="btn border-0"><i className="bi bi-heart-fill fs-3"></i>观看列表</button>}

                    <span className="d-inline-flex align-items-start mx-1" style={{fontSize: '15px'}}>{Object.keys(favoriteItems).length > 0 && Object.keys(favoriteItems).length}</span>
                </Link>
            </span>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
    )
}