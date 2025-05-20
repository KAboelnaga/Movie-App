import Title from "../components/Title";
import axiosInstance from "../apis/config";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { LanguageContext } from "../context/LanguageContext";
import PageIcon from "../components/PageIcon";
import { CategoryContext } from "../context/CategoryContext";
export default function Home(){
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const {language} = useContext(LanguageContext);
    const {category} = useContext(CategoryContext);
    useEffect(() =>{
        axiosInstance.get(`${category === 'movies' ? '/movie/now_playing?':'tv/popular?'}api_key=${import.meta.env.VITE_API_KEY}&language=${language}&page=${page}`)
        .then(response => {
            setMovies(Array.isArray(response.data?.results) ? response.data.results : [])
            setTotalPages(response.data.total_pages);
        })
        .catch(error => console.log(error))
    },[page,language,category]);
    const topOfPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    useEffect(() => {
        setPage(1);
    },[category]);
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
             <MovieCard movie={movie} category={category} key={movie.id}/>
            ))
            }
        </div>
        <div className="d-flex justify-content-center align-items-center py-3">
            <button className={`btn px-3 mx-3 ${page === 1 ? 'disabled btn-dark' : 'btn-outline-dark'}`} onClick={prevPage}><i className="bi bi-chevron-left"></i></button>
            {[...Array(5)].map((__, i) =>{
                const current = page + i;
                return(
                    <PageIcon current={current} page={page} totalPages={totalPages} changePage={changePage} key={i}/>
                )
            }
            )}
            <button className="btn btn-outline-dark px-3 mx-3" onClick={nextPage}><i className="bi bi-chevron-right"></i></button>
        </div>
        </>
    )
}