import { useContext, useEffect, useState } from 'react'
import axiosInstance from '../apis/config'
import { useParams } from 'react-router';
import MovieCard from '../components/MovieCard';
import {LanguageContext} from '../context/LanguageContext';
import MovieDetails from '../components/MovieDetails';
export default function MovieDetailsPage(){
    const [movie, setmovie] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const { id, category } = useParams();
    const [favoriteItems, setFavoriteItems] = useState();
    const {language} = useContext(LanguageContext);
    useEffect(() => {
        Promise.all([
        axiosInstance.get(`${category === 'movies' ?'/movie/':'/tv/'}${id}?api_key=${import.meta.env.VITE_API_KEY}&language=${language}`),
        axiosInstance.get(`${category === 'movies' ?'/movie/':'/tv/'}${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}&language=${language}`)
        ])
        .then(([movie, recommendation]) => {
            setmovie(movie.data);
            setRecommendation(recommendation.data.results);
            console.log(movie.data.seasons);
            }
            )
        .catch(error => console.log(error))
    }, [id, language, category]);
    useEffect(() => {
        setFavoriteItems(JSON.parse(localStorage.getItem('favoriteItems')));
        console.log(favoriteItems);
    },[]);


    if(!movie)
        return(<h2>loading</h2>)
    return(
        <>
            <MovieDetails movie={movie} category={category} language={language}/>
            {category === 'shows' && <h2 className='inter-600 mx-5'>Seasons</h2>}
            { category=== 'shows' && movie?.seasons?.map(season => (
                <MovieDetails movie={season} category='season' language={language} key={movie.seasons.indexOf(season)}/>
            ))}
                    
                {language === 'en' && <h2 className='inter-700 px-3 mx-3 my-3'>Recommendations</h2>}
                {language === 'ar' && <h2 className='inter-700 px-3'>توصيات</h2>}
                {language === 'fr' && <h2 className='inter-700 px-3'>Recommandations</h2>}
                {language === 'zh' && <h2 className='inter-700 px-3'>推荐</h2>}

                <div className="mx-3 row row-cols-2 g-4">
                        {
                    recommendation?.slice(0,6).map((rec) => (
                        <MovieCard movie={rec} category={category} key={rec.id}/>
                    ))
                }
                </div>
        </>
    )
}
