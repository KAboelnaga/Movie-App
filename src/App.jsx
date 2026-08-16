import './App.css'
import './custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router';
import { AnimatePresence } from 'motion/react';
import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadFavorites } from './components/store/slices/favorites';
import Loading from './pages/Loading';
import PageTransition from './components/PageTransition';


const NavbarNav = lazy(() => import('./components/NavbarNav'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ActorPage = lazy(() => import('./pages/ActorPage'));


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<PageTransition><Home/></PageTransition>}/>
        <Route path='/watchlist' element={<PageTransition><Watchlist/></PageTransition>}/>
        <Route path='/moviedetails/:id/:category' element={<PageTransition><MovieDetailsPage/></PageTransition>}/>
        <Route path='/actor/:id' element={<PageTransition><ActorPage/></PageTransition>}/>
        <Route path='/search/:search' element={<PageTransition><SearchPage/></PageTransition>}/>
        <Route path='/*' element={<PageTransition><NotFound/></PageTransition>}/>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.movies);
  useEffect(() => {
    let savedFavorites = null;
    try {
      savedFavorites = JSON.parse(localStorage.getItem('favoriteItems'));
    } catch {
      savedFavorites = null;
    }
    if (savedFavorites) {
      dispatch(loadFavorites(savedFavorites));
    }

  },[dispatch]);
        useEffect(() => {
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    },[favoriteItems]);
  return (
    <BrowserRouter>
    <NavbarNav/>
      <Suspense fallback={<Loading/>}>
        <AnimatedRoutes/>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
