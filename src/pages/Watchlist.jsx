import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
export default function Watchlist(){
    const favoriteItems = useSelector((state) => state.favorites.movies);
    console.log(favoriteItems);
    return(
        <>
            <h2 className="inter-600 ms-5 py-4">Watch list</h2>

            {Object.keys(favoriteItems).map(key => {
                <MovieCard movie={favoriteItems[key]} key={key}/>
    
})}

        </>
    )
}