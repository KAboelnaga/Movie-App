import { motion as Motion } from "motion/react";
import { toggleFavorites } from "./store/slices/favorites";
import { useSelector, useDispatch } from 'react-redux';
import { tapScale } from "./motionVariants";

export default function FavoriteIcon({movie, id, category}){
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const isFavorite = Boolean(favoriteItems[id]);
    const handleFavorites = () => {
        dispatch(toggleFavorites({id : parseInt(id),
            poster_path: movie.poster_path,
            title: category === 'movies' ? movie.title : movie.name,
            release_date: category === 'movies' ? movie.release_date: movie.first_air_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            overview: movie.overview,
            isMovie: category === 'movies' ? true : false
        }));

    }


    return(
    <>
        <Motion.button id={`favIconButton${id}`} className="btn fs-5 border-0 mt-2" style={{width:'50px',height:'50px'}} onClick={handleFavorites} {...tapScale}>
            <Motion.i
                className={`bi ${isFavorite ? 'text-yellow bi-heart-fill' : 'bi-heart'}`}
                id={`favicon${id}`}
                animate={isFavorite ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
            ></Motion.i>
        </Motion.button>
    </>
    )
}