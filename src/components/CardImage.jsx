import { motion as Motion } from "motion/react";
import notFoundImg from '../assets/notFoundImg.jpg';
export default function CardImage({poster_path}){
    return(
        <>
            {poster_path &&
            <div className="card border-0">
                <Motion.img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${poster_path}`} className="card-img-fluid rounded-4" alt="..." initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4}}/>
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