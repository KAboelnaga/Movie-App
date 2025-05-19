import { useContext, useEffect, useState } from 'react'
import axiosInstance from '../apis/config'
import { useParams } from 'react-router';
import CardImage from '../components/CardImage';
import Rating from '../components/Rating';
import MovieCard from '../components/MovieCard';
import FavoriteIcon from '../components/FavoriteIcon';
import {LanguageContext} from '../context/LanguageContext';


export default function MovieDetails(){
    const [movie, setmovie] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [fullStars, setFullStars] = useState(0);
    const [halfStars, setHalfStars] = useState(0);
    const [emptyStars, setEmptyStars] = useState(5);
    const { id, category } = useParams();
    const {language} = useContext(LanguageContext);
    useEffect(() => {
        Promise.all([
        axiosInstance.get(`${category === 'movies' ?'/movie/':'/tv/'}${id}?api_key=${import.meta.env.VITE_API_KEY}&language=${language}`),
        axiosInstance.get(`${category === 'movies' ?'/movie/':'/tv/'}${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}&language=${language}`)
        ])
        .then(([movie, recommendation]) => {
            setmovie(movie.data);
            setRecommendation(recommendation.data.results);
            }
            )
        .catch(error => console.log(error))
    }, [id, language, category]);

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
    if (!movie) return <p>Loading...</p>;
        console.log(recommendation);
    return(
        <>
            <div className="row m-3">
                <div className="col-10 col-lg-2 m-3">
                    <CardImage poster_path={movie.poster_path}/>
                </div>
                <div className="col-10 col-lg-8 mt-3 ms-3">
                    <div className='d-flex w-100 justify-content-between'>
                        <h1 className="inter-700 d-inline">{category === 'movies' ? movie.title : movie.name}</h1>
                        <FavoriteIcon movie={movie} category={category} id={movie.id}/>
                    </div>
                    <p className="text-muted" style={{fontSize:'12px'}}>{movie.release_date}</p>
                    <Rating fullStars={fullStars} halfStars={halfStars} emptyStars={emptyStars} />
                    <span className="ms-3 ">{movie.vote_count}</span>
                    <p className='mt-4'>{movie.overview}</p>
                    {
                    movie?.genres?.map((genre) => (
                        <span className='bg-yellow rounded-4 me-4 p-2' key={genre.id}>
                            {genre.name}
                        </span>
                        
                    ))
                    }
                    <div className="d-block mt-3">
                    {language === 'en' && 
                        <>                        
                            <p className='d-inline inter-600'>Duration:</p>
                            <span className='ms-3 inter-400 me-5'>{movie.runtime} Min.</span>
                            <span className='d-inline inter-600 me-3'> Languages:</span>
                        </>

                    }
                    {language === 'ar' && 
                        <>                        
                            <p className='d-inline inter-600'>المدة:</p>
                            <span className='ms-3 inter-400 me-5'>{movie.runtime} دقيقة</span>
                            <span className='d-inline inter-600 me-3'> اللغات:</span>
                        </>

                    }
                    {language === 'fr' && 
                        <>                        
                            <p className='d-inline inter-600'>Durée: </p>
                            <span className='ms-3 inter-400 me-5'>{movie.runtime} Min.</span>
                            <span className='d-inline inter-600 me-3'> Langues: </span>
                        </>

                    }
                    {language === 'zh' && 
                        <>                        
                            <p className='d-inline inter-600'>时长：</p>
                            <span className='ms-3 inter-400 me-5'>{movie.runtime} 分钟</span>
                            <span className='d-inline inter-600 me-3'> 语言：</span>
                        </>

                    }
                    {
                        movie?.spoken_languages?.map((language) =>(
                            <span className='me-3 ' key={language}>
                                {language.name}
                            </span>
                        ))
                    }
                    </div>
                    <div className="my-3">
                        {
                            movie?.production_companies?.map((company) =>(
                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${company.logo_path}`} className="card-img-fluid rounded-1 me-5 my-3" alt={company.name} key={company.id} style={{width: '200px'}}/>
                            ))
                        }
                    </div>
                </div>
                {language === 'en' && <h2 className='inter-700 px-3'>Recommendations</h2>}
                {language === 'ar' && <h2 className='inter-700 px-3'>توصيات</h2>}
                {language === 'fr' && <h2 className='inter-700 px-3'>Recommandations</h2>}
                {language === 'zh' && <h2 className='inter-700 px-3'>推荐</h2>}

                <div className="row row-cols-2 g-4">
                        {
                    recommendation?.slice(0,6).map((rec) => (
                        <MovieCard movie={rec} category={category} key={rec.id}/>
                    ))
                }
                </div>
                
            </div>
        </>
    )
}
