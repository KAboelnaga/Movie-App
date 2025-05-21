import Lottie from "lottie-react";
import notfound from '../components/animations/notfound.json'
import { useNavigate } from "react-router";
export default function NotFound(){
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    }
    return(
        <>
        <div className="d-flex flex-column  justify-content-center align-items-center vh-100">
            <Lottie animationData={notfound} loop={true} autoplay={true} />
            <br />
            <h2 className="inter-600">Page not found</h2>
            <button className="btn btn-yellow d-block" onClick={backToHome}> back to home</button>

        </div>
        </>
    )
}