import { useSelector } from "react-redux";
import WatchlistCard from "../components/WatchlistCard";
import { Link } from "react-router";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import watchListItems from "../components/JS/watchListItems";
export default function Watchlist() {
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const {language} = useContext(LanguageContext);
    const movieItems = Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === true);
    const tvItems = Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === false);
    return (
        <>
            <div className="min-vh-100">
                <h2 className="inter-600 mx-5 py-4">{watchListItems.title[language]}</h2>
                {   
                    Object.keys(movieItems).length > 0 &&
                    <>
                        <h2 className="px-5 py-3 inter-500">Movies</h2>
                        <div className="row row-cols-2 mx-2 mx-lg-5">
                            {Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === true).map(([key, movie]) => (
                                <WatchlistCard movie={movie} key={key} category={'movies'} id={key}/>
                            ))}
                        </div>
                    </>

                }
                {   
                    Object.keys(tvItems).length > 0 &&
                    <>
                    <h2 className="mx-5 py-3 inter-500">TV shows</h2>
                        <div className="row row-cols-2 mx-2 mx-lg-5">
                            {Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === false).map(([key, movie]) => (
                                <WatchlistCard movie={movie} key={key} category={'shows'} id={key}/>
                            ))}
                        </div>
                    </>

                }
                {
                    Object.keys(favoriteItems).length === 0 &&
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="d-flex justify-content-center w-100" style={{fontSize:'15vw'}}><i className="bi bi-heartbreak-fill text-muted"></i></div>
                        <h1 className="inter-500" >{watchListItems.empty[language]}</h1>
                        
                        <Link to='/'>
                            <button className="btn btn-yellow w-100">{watchListItems.homeButton[language]}</button>
                        </Link>
                    </div>
                }
            </div>
        </>
    );
}
