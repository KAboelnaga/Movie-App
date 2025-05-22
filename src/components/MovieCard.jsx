import { Link } from "react-router";
import CardImage from "./CardImage";
import FavoriteIcon from "./FavoriteIcon";


export default function MovieCard({movie, category}){
    return(
        <>
            <div className="col-6 col-md-6 col-lg-2">
                <Link to={`/moviedetails/${movie.id}/${category}`} className="text-decoration-none text-reset" style={{height:'200px'}}>
                    <CardImage poster_path={movie.poster_path}/>
                </Link>
                <div className="d-flex justify-content-between">
                        <div>

                        <Link to={`/moviedetails/${movie.id}/${category}`} className="text-decoration-none text-reset">
                            <h5 className="card-title fs-bold">{category === 'movies' && movie.title}{category === 'shows' && movie.name}</h5>
                        <h6 className="text-muted">{category === 'movies' && movie.release_date}{category === 'shows' && movie.first_air_date}</h6>
                        </Link>
                        </div>
                    <FavoriteIcon movie={movie} id={movie.id} category={category}/>
                </div>
            </div>
        </>
    )
}