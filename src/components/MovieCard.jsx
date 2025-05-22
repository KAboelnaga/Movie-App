import { Link } from "react-router";
import CardImage from "./CardImage";
import FavoriteIcon from "./FavoriteIcon";


export default function MovieCard({movie, category}){
    return(
        <>
            <div className="d-flex flex-column col-16 col-md-6 justify-content-center col-lg-2" style={{height: '500px'}}>
                <Link to={`/moviedetails/${movie.id}/${category}`} className="text-decoration-none text-reset">
                    <CardImage poster_path={movie.poster_path}/>
                </Link>
                {/* <CircularRating percentage={75} /> */}
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/moviedetails/${movie.id}/${category}`} className="text-decoration-none text-reset">
                            <h5 className="card-title fs-bold">{category === 'movies' && movie.title}{category === 'shows' && movie.name}</h5>
                        </Link>
                        <h6 className="text-muted">{category === 'movies' && movie.release_date}{category === 'shows' && movie.first_air_date}</h6>
                    </div>
                    <FavoriteIcon movie={movie} id={movie.id} category={category}/>
                </div>
            </div>
        </>
    )
}