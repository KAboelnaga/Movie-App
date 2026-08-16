import { useContext, useEffect, useState } from 'react'
import axiosInstance from '../apis/config'
import omdbInstance from '../apis/omdbConfig'
import { useParams } from 'react-router';
import { motion as Motion } from 'motion/react';
import MovieCard from '../components/MovieCard';
import {LanguageContext} from '../context/LanguageContext';
import MovieDetails from '../components/MovieDetails';
import movieDetailsItems from '../components/JS/movieDetails';
import { staggerContainer } from '../components/motionVariants';
import Loading from './Loading';
import useDocumentTitle from '../hooks/useDocumentTitle';
export default function MovieDetailsPage(){
    const [movie, setmovie] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [externalRatings, setExternalRatings] = useState(null);
    const [error, setError] = useState(false);
    const [retryKey, setRetryKey] = useState(0);
    const { id, category } = useParams();
    const {language} = useContext(LanguageContext);
    useDocumentTitle(movie ? (category === 'movies' ? movie.title : movie.name) : null);
    useEffect(() => {
        setError(false);
        setExternalRatings(null);
        Promise.all([
        axiosInstance.get(`${category === 'movies' ?'/movie/':'/tv/'}${id}?language=${language}&append_to_response=videos,credits,external_ids`),
        axiosInstance.get(`${category === 'movies' ?'/movie/':'/tv/'}${id}/recommendations?language=${language}`)
        ])
        .then(([movie, recommendation]) => {
            setmovie(movie.data);
            setRecommendation(recommendation.data.results);
            }
            )
        .catch(error => {
            console.log(error);
            setError(true);
        })
    }, [id, language, category, retryKey]);

    const imdbId = movie?.external_ids?.imdb_id;
    useEffect(() => {
        if (!imdbId) return;
        omdbInstance.get(`?i=${imdbId}`)
            .then(response => {
                const data = response.data;
                if (!data || data.Response === 'False') return;
                const imdb = data.imdbRating && data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : null;
                const imdbVotes = data.imdbVotes && data.imdbVotes !== 'N/A' ? data.imdbVotes : null;
                const rtEntry = data.Ratings?.find(r => r.Source === 'Rotten Tomatoes');
                const rottenTomatoes = rtEntry ? parseInt(rtEntry.Value) : null;
                setExternalRatings({ imdb, imdbVotes, rottenTomatoes });
            })
            .catch(error => console.log(error));
    }, [imdbId]);


    if(error)
        return(
            <div className="text-center py-5">
                <p className="text-muted">Something went wrong loading this title.</p>
                <button className="btn btn-yellow" onClick={() => setRetryKey(k => k + 1)}>Retry</button>
            </div>
        )
    if(!movie)
        return(<Loading/>)
    return(
        <>
            <MovieDetails movie={movie} category={category} externalRatings={externalRatings}/>
            {category === 'shows' && movie.number_of_seasons > 0 && <hr className="mx-3"/>}
            {category === 'shows' && movie.number_of_seasons > 0 && <h2 className='inter-600 mx-5'>Seasons</h2>}
            { category=== 'shows' && movie?.seasons?.map(season => (
                <MovieDetails movie={season} category='season' key={movie.seasons.indexOf(season)}/>
            ))}

                <hr className="mx-3"/>
                <h2 className='inter-700 px-3 mx-3 my-3'>{movieDetailsItems.recommendations[language]}</h2>

                <Motion.div className="mx-3 row row-cols-2 g-4" initial="hidden" animate="visible" variants={staggerContainer}>
                        {
                    recommendation?.slice(0,6).map((rec) => (
                        <MovieCard movie={rec} category={category} key={rec.id}/>
                    ))
                }
                </Motion.div>
        </>
    )
}
