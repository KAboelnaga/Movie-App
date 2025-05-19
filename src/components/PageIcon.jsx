export default function PageIcon({current, page, changePage}){
    return(
        <>
            <button className={`btn ${page === current ? 'btn-yellow': 'btn-outline-dark'} px-3 mx-3`} onClick={() => changePage(current)}>{current}</button>
        </>
    )
}