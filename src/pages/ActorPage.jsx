import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion as Motion } from 'motion/react';
import axiosInstance from '../apis/config';
import MovieCard from '../components/MovieCard';
import CardImage from '../components/CardImage';
import { LanguageContext } from '../context/LanguageContext';
import actorItems from '../components/JS/actor';
import navbar from '../components/JS/navbar';
import { staggerContainer } from '../components/motionVariants';

export default function ActorPage(){
    const { id } = useParams();
    const { language } = useContext(LanguageContext);
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(false);
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        setError(false);
        setPerson(null);
        axiosInstance.get(`/person/${id}?language=${language}&append_to_response=combined_credits`)
            .then(response => setPerson(response.data))
            .catch(error => {
                console.log(error);
                setError(true);
            });
    }, [id, language, retryKey]);

    if (error)
        return (
            <div className="text-center py-5">
                <p className="text-muted">Something went wrong loading this person.</p>
                <button className="btn btn-yellow" onClick={() => setRetryKey(k => k + 1)}>Retry</button>
            </div>
        );

    if (!person)
        return (<h2>loading</h2>);

    const credits = (person.combined_credits?.cast || [])
        .filter(credit => credit.poster_path)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    const movieCredits = credits.filter(credit => credit.media_type === 'movie');
    const tvCredits = credits.filter(credit => credit.media_type === 'tv');

    return (
        <div className="pt-4 mt-5 min-vh-100">
            <div className="row mx-3 my-5">
                <div className="col-12 col-lg-2 mx-lg-3">
                    <CardImage poster_path={person.profile_path}/>
                </div>
                <div className="col-12 col-lg-8 ms-lg-3">
                    <h1 className="inter-700">{person.name}</h1>
                    {person.birthday &&
                        <p className="text-muted">
                            {actorItems.born[language]}: {person.birthday}{person.place_of_birth ? ` · ${person.place_of_birth}` : ''}
                        </p>
                    }
                    {person.biography && <p className="mt-3">{person.biography}</p>}
                </div>
            </div>

            {credits.length > 0 && <hr className="mx-3"/>}
            {credits.length > 0 && <h2 className="inter-700 px-3 mx-3 my-3">{actorItems.filmography[language]}</h2>}

            {movieCredits.length > 0 &&
                <>
                    <h4 className="px-5 py-3 inter-500">{navbar.navMovies[language]}</h4>
                    <Motion.div className="row row-cols-2 g-4 mx-3" initial="hidden" animate="visible" variants={staggerContainer}>
                        {movieCredits.map(credit => (
                            <MovieCard movie={credit} category="movies" key={`movie-${credit.id}`}/>
                        ))}
                    </Motion.div>
                </>
            }

            {movieCredits.length > 0 && tvCredits.length > 0 && <hr className="mx-3"/>}

            {tvCredits.length > 0 &&
                <>
                    <h4 className="px-5 py-3 inter-500">{navbar.navShows[language]}</h4>
                    <Motion.div className="row row-cols-2 g-4 mx-3" initial="hidden" animate="visible" variants={staggerContainer}>
                        {tvCredits.map(credit => (
                            <MovieCard movie={credit} category="shows" key={`tv-${credit.id}`}/>
                        ))}
                    </Motion.div>
                </>
            }
        </div>
    );
}
