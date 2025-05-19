import { toggleFavorites } from "./store/slices/favorites";
import { useSelector, useDispatch } from 'react-redux';
import { CategoryContext } from "../context/CategoryContext";

export default function FavoriteIcon({movie, id, category}){
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const handleFavorites = () => {
        dispatch(toggleFavorites({id : parseInt(id), 
            poster_path: movie.poster_path, 
            title: category === 'movies' ? movie.title : movie.name, 
            release_date: category === 'movies' ? movie.release_date: movie.first_air_time, 
            vote_average: movie.vote_average, 
            vote_count: movie.vote_count, 
            overview: movie.overview,
            isMovie: category === 'movies' ? true : false
        }));


    }
    return(
    <>
        <button id={`favIconButton${id}`} className="btn fs-5 border-0 mt-2" style={{width:'50px',height:'50px'}} onClick={handleFavorites}><i className={`bi ${favoriteItems[id]?'text-yellow bi-heart-fill':'bi-heart'}`} id={`favicon${id}`}></i></button>
    </>
    )
}