export default function CardImage({poster_path}){
    return(
        <>
            <div className="card border-0">
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${poster_path}`} className="card-img-fluid rounded-1" alt="..."/>
            </div>
        </>
    )
}