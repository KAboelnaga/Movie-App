import { useContext, useEffect, useState } from "react";
import CardImage from "./CardImage";
import Rating from "./Rating";
import MoviesDurationLanguage from "./MovieDurationLanguages";
import FavoriteIcon from "./FavoriteIcon";
import showSeasonItems from "./JS/showSeasonsItems";
import { LanguageContext } from "../context/LanguageContext";
export default function MovieDetails({movie, category}){
    const {language} = useContext(LanguageContext);
    const [fullStars, setFullStars] = useState(0);
    const [halfStars, setHalfStars] = useState(0);
    const [emptyStars, setEmptyStars] = useState(5);
    useEffect(() => {
            if (movie && movie.vote_average !== undefined) {
                const rating = movie.vote_average / 2;
                const full = Math.floor(rating);
                const half = rating % 1 >= 0.5 ? 1 : 0;
                const empty = 5 - full - half;
                setFullStars(full);
                setHalfStars(half);
                setEmptyStars(empty);
            }
        }, [movie]);
    return(
        <>
            <div className="row m-3 shadow-sm">
            <div className="col-10 col-lg-2 m-3">
                <CardImage poster_path={movie.poster_path}/>
            </div>
            <div className="col-10 col-lg-8 mt-3 ms-3">
                <div className='d-flex w-100 justify-content-between'>
                    <h1 className="inter-700 d-inline">{category === 'movies' ? movie.title : movie.name}</h1>
                    {(category === 'shows' || category === 'movies') && (<FavoriteIcon movie={movie} category={category} id={movie.id}/>)}
                </div>

                {category === 'movies' && <p className="text-muted" style={{fontSize:'12px'}}>{movie.release_date}</p>}
                {category === 'shows' && <p className="text-muted" style={{fontSize:'12px'}}>{(movie.first_air_date).split('-',1)} - {(movie.last_air_date)?.split('-',1)}</p>}
                {category === 'season' && <p className="text-muted" style={{fontSize:'12px'}}>First Air Date: {(movie.air_date)}</p>}

                {movie.vote_average > 0 && 
                    <>
                        <Rating fullStars={fullStars} halfStars={halfStars} emptyStars={emptyStars} />
                        <span className="mx-3 ">{movie.vote_count}</span>
                    </>
                }

                {
                (category === 'shows' && movie.number_of_seasons > 0) &&
                (
                    <h6 className="mt-3 fs-5 inter-700 p-2">{showSeasonItems.seasons[language]} 
                        <span className="inter-400 fs-6 me-5">{movie.number_of_seasons}</span>
                    
                    <span className="mt-3 inter-700 p-2">{showSeasonItems.episodes[language]}
                        <span className="inter-400 fs-6">{movie.number_of_episodes}</span>
                    </span>
                    </h6>
                )
                }
                {
                    category === 'movies' &&
                    <MoviesDurationLanguage runtime={movie.runtime} spoken_languages={movie.spoken_languages}/>
                }
                


                {
                    movie?.genres?.map((genre) => (
                        <span className='position-relative bg-yellow rounded-4 me-4 my-4 p-2 px-4' key={genre.id}>
                            {genre.name}
                        </span>
                        
                    ))
                }
                <p className='mt-4'>{movie.overview}</p>
                    <div className="my-3">
                        {category !== 'season' && <h5 className='pt-3 inter-400'>{showSeasonItems.producedBy[language]}</h5>}
                        {
                            movie?.production_companies?.map((company) =>(
                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${company.logo_path}`} className="card-img-fluid rounded-1 me-5 my-3" alt={company.name} key={company.id} style={{width: '200px'}}/>
                            ))
                        }
                    </div>
                </div>
                </div>
        </>
    )
}