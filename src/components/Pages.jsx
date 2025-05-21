import PageIcon from "./PageIcon";
export default function Pages({page, handlePageChange, totalPages}){

    
    const prevPage = () => {
        handlePageChange(page - 1);

    }
    const nextPage = () => {
        handlePageChange(page + 1);

    }
    const changePage = (newPage) => {
        handlePageChange(newPage);
    }
    return(
        <div className="d-flex w-100 justify-content-center align-items-center py-3">
            <button className={`btn px-3 mx-3 ${page === 1 ? 'd-none' : ''} btn-light2`} onClick={prevPage}><i className="bi bi-chevron-left"></i></button>
            <button className={`btn px-3 mx-3 ${page === 1 ? 'd-none' : 'btn-light2'}`} onClick={() => changePage(1)}>1</button><span className={`${page > 2 ? '' : 'd-none'}`}>...</span>
            {[...Array(5)].map((__, i) =>{
                const current = page + i;
                return(
                    <PageIcon current={current} page={page} totalPages={totalPages} changePage={changePage} key={i}/>
                )
            }
            )}
            <span className={`${page > totalPages - 5 ? 'd-none' : ''}`}>...</span><button className={`btn px-3 mx-3 ${page > totalPages - 5 ? 'd-none' : 'btn-light2'}`} onClick={() => changePage(totalPages)}>{totalPages}</button>
            <button className={`btn px-3 mx-3 ${page === totalPages ? 'd-none' : 'btn-light2'}`} onClick={nextPage}><i className="bi bi-chevron-right"></i></button>
        </div>
    )
}