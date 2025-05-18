export default function Rating({fullStars, halfStars, emptyStars}){
    return(
        <>
        {
            Array(fullStars).fill().map((__, i) =>(
                <i className="bi bi-star-fill me-1" key={`full-${i}`}></i>
            ))
        }
        {
            halfStars === 1 && <i className="bi bi-star-half me-1"></i>
        }
        {
            Array(emptyStars).fill().map((__, i) => (
                <i className="bi bi-star me-1" key={`empty-${i}`}></i>
            ))
        }
        </>
    )
}