import { useContext } from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router";
import { LanguageContext } from "../context/LanguageContext";
import movieDetailsItems from "./JS/movieDetails";
import { fadeInUp, staggerContainer } from "./motionVariants";
import notFoundImg from "../assets/notFoundImg.jpg";

export default function Cast({ cast }) {
    const { language } = useContext(LanguageContext);
    const topCast = cast?.slice().sort((a, b) => a.order - b.order).slice(0, 12);

    if (!topCast || topCast.length === 0) return null;

    return (
        <div className="my-4 mx-3">
            <h2 className="inter-700 mb-3 px-3">{movieDetailsItems.cast[language]}</h2>
            <Motion.div
                className="d-flex flex-nowrap overflow-x-auto pb-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {topCast.map(actor => (
                    <Motion.div
                        key={actor.id}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.08 }}
                        className="flex-shrink-0 mx-2"
                        style={{ width: '110px', minWidth: '110px', maxWidth: '110px' }}
                    >
                        <Link to={`/actor/${actor.id}`} className="d-block text-decoration-none text-reset">
                            <img
                                src={actor.profile_path ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${actor.profile_path}` : notFoundImg}
                                alt={actor.name}
                                className="rounded-circle d-block mx-auto"
                                loading="lazy"
                                style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                            />
                            <p className="inter-600 mb-0 mt-2 text-truncate" dir="ltr" style={{ fontSize: '13px' }} title={actor.name}>{actor.name}</p>
                            <p className="text-muted mb-0 text-truncate" dir="ltr" style={{ fontSize: '12px' }} title={actor.character}>{actor.character}</p>
                        </Link>
                    </Motion.div>
                ))}
            </Motion.div>
        </div>
    );
}
