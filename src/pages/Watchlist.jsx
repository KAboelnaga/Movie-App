import { useSelector } from "react-redux";
import WatchlistCard from "../components/WatchlistCard";
import { Link } from "react-router";
export default function Watchlist() {
    const favoriteItems = useSelector((state) => state.favorites.movies);
    console.log(favoriteItems);

    return (
        <>
            <div className="min-vh-100">
                <h2 className="inter-600 ms-5 py-4">Watch list</h2>
                {   
                    Object.keys(favoriteItems).length > 0 &&
                    <div className="row row-cols-2 g-5 mx-5">
                        {Object.entries(favoriteItems).map(([key, movie]) => (
                            <WatchlistCard movie={movie} key={key} id={key}/>
                        ))}
                    </div>

                }
                {
                    Object.keys(favoriteItems).length === 0 &&
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="d-flex justify-content-center w-100" style={{fontSize:'15vw'}}><i className="bi bi-heartbreak-fill text-muted"></i></div>
                        <h1 className="inter-500" >No Movies in watch list</h1>
                        <Link to='/'>
                            <button className="btn btn-yellow w-100">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </>
    );
}
