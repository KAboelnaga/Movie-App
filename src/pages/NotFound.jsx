import Lottie from "lottie-react";
import notfound from '../components/animations/notfound.json'
import { useNavigate } from "react-router";
import useDocumentTitle from "../hooks/useDocumentTitle";
export default function NotFound(){
    useDocumentTitle('Page not found');
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