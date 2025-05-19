import Title from "../components/Title";
import axiosInstance from "../apis/config";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { LanguageContext } from "../context/LanguageContext";
import PageIcon from "../components/PageIcon";
export default function Home(){
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const {language} = useContext(LanguageContext);
    
    useEffect(() =>{
        axiosInstance.get(`/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&language=${language}&page=${page}`)
        .then(response => setMovies(Array.isArray(response.data?.results) ? response.data.results : []))
        .catch(error => console.log(error))
    },[page,language]);
    const topOfPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const prevPage = () => {
        setPage(page - 1);
        topOfPage();
    }
    const nextPage = () => {
        setPage(page + 1);
        topOfPage();
    }
    const changePage = (newPage) => {
        setPage(newPage);
        topOfPage();
    }
    return(
        <>
        <Title />
        <h2 className="inter-700 py-5 mx-4">Now Playing</h2>
        <div className="row row-cols-2 g-4 mx-3">
            {movies.slice(0,18).map(movie => (
             <MovieCard movie={movie} key={movie.id}/>
            ))
            }
        </div>
        <div className="d-flex justify-content-center align-items-center py-3">
            <button className={`btn px-3 mx-3 ${page === 1 ? 'disabled btn-white' : 'btn-outline-yellow'}`} onClick={prevPage}><i className="bi bi-chevron-left"></i></button>
            {[...Array(5)].map((__, i) =>{
                const current = page + i;
                return(
                    <PageIcon current={current} page={page} changePage={changePage} key={i}/>
                )
            }
            )}
            <button className="btn btn-outline-yellow px-3 mx-3" onClick={nextPage}><i className="bi bi-chevron-right"></i></button>
        </div>
        </>
    )
}