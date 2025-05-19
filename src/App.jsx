import './App.css'
import './custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/inter'; 
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css'; 
import {BrowserRouter, Route, Routes} from 'react-router';
import { lazy, Suspense } from 'react';
import Watchlist from './pages/Watchlist';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchPage from './pages/SearchPage';


const NavbarNav = lazy(() => import('./components/NavbarNav'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));


function App() {
  return (
    <BrowserRouter>
    <NavbarNav/>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/watchlist' element={<Watchlist/>}/>
          <Route path='/moviedetails/:id/:category' element={<MovieDetailsPage/>}/>
          <Route path='/search/:search' element={<SearchPage/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
