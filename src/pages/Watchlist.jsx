import { useSelector } from "react-redux";
import WatchlistCard from "../components/WatchlistCard";
import { Link } from "react-router";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
export default function Watchlist() {
    const favoriteItems = useSelector((state) => state.favorites.movies);
    const {language} = useContext(LanguageContext);
    const movieItems = Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === true);
    const tvItems = Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === false);
    return (
        <>
            <div className="min-vh-100">
                {language === 'en' && <h2 className="inter-600 mx-5 py-4">Watch list</h2>}
                {language === 'ar' && <h2 className="inter-600 mx-5 py-4">قائمة المشاهدة</h2>}
                {language === 'fr' && <h2 className="inter-600 mx-5 py-4">Liste de surveillance</h2>}
                {language === 'zh' && <h2 className="inter-600 mx-5 py-4">观看列表</h2>}
                {   
                    Object.keys(movieItems).length > 0 &&
                    <>
                        <h2 className="px-5 py-3 inter-500">Movies</h2>
                        <div className="row row-cols-2 g-5 mx-5">
                            {Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === true).map(([key, movie]) => (
                                <WatchlistCard movie={movie} key={key} id={key}/>
                            ))}
                        </div>
                    </>

                }
                {   
                    Object.keys(tvItems).length > 0 &&
                    <>
                    <h2 className="mx-5 my-3 inter-500">TV shows</h2>
                        <div className="row row-cols-2 g-5 mx-5">
                            {Object.entries(favoriteItems).filter(([key, movie]) => movie.isMovie === false).map(([key, movie]) => (
                                <WatchlistCard movie={movie} key={key} id={key}/>
                            ))}
                        </div>
                    </>

                }
                {
                    Object.keys(favoriteItems).length === 0 &&
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="d-flex justify-content-center w-100" style={{fontSize:'15vw'}}><i className="bi bi-heartbreak-fill text-muted"></i></div>
                        {language === 'en' && <h1 className="inter-500" >No Movies in watch list</h1>}
                        {language === 'ar' && <h1 className="inter-500" >لا توجد أفلام في قائمة المشاهدة</h1>}
                        {language === 'fr' && <h1 className="inter-500" >Aucun film dans la liste de surveillance</h1>}
                        {language === 'zh' && <h1 className="inter-500" >观看列表中没有电影</h1>}
                        <Link to='/'>
                            {language === 'en' && <button className="btn btn-yellow w-100">Back to Home</button>}
                            {language === 'ar' && <button className="btn btn-yellow w-100">العودة إلى الصفحة الرئيسية</button>}
                            {language === 'fr' && <button className="btn btn-yellow w-100">Retour à l’accueil</button>}
                            {language === 'zh' && <button className="btn btn-yellow w-100">返回主页</button>}
                        </Link>
                    </div>
                }
            </div>
        </>
    );
}
