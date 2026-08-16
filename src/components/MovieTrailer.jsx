import { useContext } from "react";
import { motion as Motion } from "motion/react";
import { LanguageContext } from "../context/LanguageContext";
import movieDetailsItems from "./JS/movieDetails";
import { fadeInUp } from "./motionVariants";

export default function MovieTrailer({ videos }) {
    const { language } = useContext(LanguageContext);

    const trailer = videos?.find(video => video.site === 'YouTube' && video.type === 'Trailer')
        || videos?.find(video => video.site === 'YouTube' && video.type === 'Teaser');

    if (!trailer) return null;

    return (
        <Motion.div className="my-4" initial="hidden" animate="visible" variants={fadeInUp}>
            <h5 className="inter-700 mb-3">{movieDetailsItems.watchTrailer[language]}</h5>
            <div className="ratio ratio-16x9">
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                    title={trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </Motion.div>
    );
}
