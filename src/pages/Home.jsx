import Title from "../components/Title";
import axiosInstance from "../apis/config";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { LanguageContext } from "../context/LanguageContext";
import { CategoryContext } from "../context/CategoryContext";
import Pages from "../components/Pages";
import homeSub from "../components/JS/homeSubtitle";
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
    useEffect(() => {
        setPage(1);
    },[category]);
    const topOfPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const changePage = (newPage) =>{
        setPage(newPage);
        topOfPage();
    }
    return(
        <div className="pt-4 mt-5 min-vh-100">
        <Title />
        <h2 className="inter-700 my-3 mx-4">{homeSub.nowPlaying[language]}</h2>
        <div className="row row-cols-2 g-4 mx-3">
            {movies.slice(0,18).map(movie => (
             <MovieCard movie={movie} category={category} />
            ))
            }
        </div>
        <Pages start={page-2} page={page} totalPages={totalPages} handlePageChange={changePage}/>
        </div>
    )
}