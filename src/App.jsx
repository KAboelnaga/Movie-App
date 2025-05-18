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
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
