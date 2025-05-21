export default function PageIcon({current, page,totalPages, changePage}){
    return(
        <>
            {current <= totalPages && current >= 1 &&
                <button className={`btn ${page === current ? 'btn-yellow': 'btn-light2'} px-3 mx-3`} onClick={() => changePage(current)}>{current}</button>
            }
            </>
    )
}