import Lottie from "lottie-react";
import  loadingLight from '../components/animations/loadingLight.json';
import loadingDark from '../components/animations/loadingDark.json';
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
export default function Loading(){
    const {theme} = useContext(ThemeContext);
    return(
        <div className="d-flex flex-column  justify-content-center align-items-center vh-100">
            {theme === 'dark' && <Lottie animationData={loadingDark} loop={true} autoplay={true} />}
            {theme === 'light' && <Lottie animationData={loadingLight} loop={true} autoplay={true} />}
        </div>
    )
}