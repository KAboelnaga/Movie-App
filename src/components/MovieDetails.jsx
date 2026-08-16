import { useContext } from "react";
import CardImage from "./CardImage";
import Ratings from "./Ratings";
import MoviesDurationLanguage from "./MovieDurationLanguages";
import FavoriteIcon from "./FavoriteIcon";
import MovieTrailer from "./MovieTrailer";
import Cast from "./Cast";
import showSeasonItems from "./JS/showSeasonsItems";
import { LanguageContext } from "../context/LanguageContext";
export default function MovieDetails({movie, category, externalRatings}){
    const {language} = useContext(LanguageContext);
    return(
        <>
            <div className="row mx-3 my-5 shadow-sm">
            <div className="col-12 col-lg-2 my-5 mx-lg-3 ">
                <CardImage poster_path={movie.poster_path}/>
            </div>
            <div className="col-12 col-lg-8 my-lg-5 ms-lg-3">
                <div className='d-flex w-100 justify-content-between'>
                    <h1 className="inter-700 d-inline">{category === 'movies' ? movie.title : movie.name}</h1>
                    {(category === 'shows' || category === 'movies') && (<FavoriteIcon movie={movie} category={category} id={movie.id}/>)}
                </div>

                {category === 'movies' && <p className="text-muted" style={{fontSize:'12px'}}>{movie.release_date}</p>}
                {category === 'shows' && <p className="text-muted" style={{fontSize:'12px'}}>{(movie.first_air_date).split('-',1)} - {(movie.last_air_date)?.split('-',1)}</p>}
                {category === 'season' && <p className="text-muted" style={{fontSize:'12px'}}>First Air Date: {(movie.air_date)}</p>}

                <Ratings
                    tmdb={movie.vote_average}
                    voteCount={movie.vote_count}
                    imdb={externalRatings?.imdb}
                    imdbVotes={externalRatings?.imdbVotes}
                    rottenTomatoes={externalRatings?.rottenTomatoes}
                />

                {(category === 'movies' || category === 'shows') && <div><MovieTrailer videos={movie.videos?.results}/></div>}

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
                


                <div className="w-100 d-flex flex-wrap">
                    {
                    movie?.genres?.map((genre) => (
                        <h6 className=' d-inline position-relative bg-yellow rounded-4 me-4 my-4 p-2 px-4' key={genre.id}>
                            {genre.name}
                        </h6>
                        
                    ))
                    }
                </div>
                
                <p className='mt-4'>{movie.overview}</p>
                    <div className="my-3">
                        {category !== 'season' && <h5 className='pt-3 inter-400'>{showSeasonItems.producedBy[language]}</h5>}
                        {
                            movie?.production_companies?.map((company) =>(
                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${company.logo_path}`} className="card-img-fluid rounded-1 me-5 my-3" alt={company.name} key={company.id} loading="lazy" style={{width: '200px'}}/>
                            ))
                        }
                    </div>
                </div>
                </div>
                {(category === 'movies' || category === 'shows') && <hr className="mx-3"/>}
                {(category === 'movies' || category === 'shows') && <Cast cast={movie.credits?.cast}/>}
        </>
    )
}