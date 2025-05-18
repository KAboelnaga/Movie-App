import { toggleFavorites } from "./store/slices/favorites";
import { useSelector, useDispatch } from 'react-redux';

export default function FavoriteIcon({movie, id}){
    console.log(movie);
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const handleFavorites = () => {
        const favIcon = document.getElementById(`favicon${id}`);
        favIcon.classList.toggle('bi-heart-fill');
        favIcon.classList.toggle('bi-heart');
        dispatch(toggleFavorites({id : parseInt(id), poster_path: movie.poster_path, title: movie.title, release_date: movie.release_date, vote_average: movie.vote_average, vote_count: movie.vote_count, overview: movie.overview}));

    }
    return(
    <>
        <button className="btn btn-outline-yellow fs-5 border-0 mt-2" style={{width:'50px',height:'50px'}} onClick={handleFavorites}><i className={`bi ${favoriteItems[id]?'bi-heart-fill':'bi-heart'}`} id={`favicon${id}`}></i></button>
    </>
    )
}