import { motion as Motion } from "motion/react";
import PageIcon from "./PageIcon";
import { tapScale } from "./motionVariants";
export default function Pages({page, handlePageChange, totalPages, start}){
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
        <div className="d-flex w-100 justify-content-center align-items-center py-3 flex-wrap">
            <Motion.button className={`btn px-3 mx-3 ${page === 1 ? 'd-none' : ''} btn-light2`} onClick={prevPage} {...tapScale}><i className="bi bi-chevron-left"></i></Motion.button>
            <Motion.button className={`btn px-3 mx-3 ${page < 4 ? 'd-none' : 'btn-light2'}`} onClick={() => changePage(1)} {...tapScale}>1</Motion.button><span className={`${page < 5 ? 'd-none' : ''}`}>...</span>
            {[...Array(5)].map((__, i) =>{
                const current = start + i;
                return(
                    <PageIcon current={current} page={page} totalPages={totalPages} changePage={changePage} key={i}/>
                )
            }
            )}
            <span className={`${page > totalPages - 4 ? 'd-none' : ''}`}>...</span><Motion.button className={`btn px-3 mx-3 ${page > totalPages - 3 ? 'd-none' : 'btn-light2'}`} onClick={() => changePage(totalPages)} {...tapScale}>{totalPages}</Motion.button>
            <Motion.button className={`btn px-3 mx-3 ${page === totalPages ? 'd-none' : 'btn-light2'}`} onClick={nextPage} {...tapScale}><i className="bi bi-chevron-right"></i></Motion.button>
        </div>
    )
}