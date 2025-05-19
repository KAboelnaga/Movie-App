import notFoundImg from '../assets/notFoundImg.jpg';
export default function CardImage({poster_path}){
    return(
        <>
            {poster_path &&
            <div className="card border-0">
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${poster_path}`} className="card-img-fluid rounded-4" alt="..."/>
            </div>
            }
            {!poster_path &&
            <div className="card border-0">
                <img src={notFoundImg} className="card-img-fluid rounded-1" alt="notfound"/>
            </div>
            }
        </>
    )
}