import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";


/** Im using a redirect to log user out, so the whole project routing design can stay more consistent and clear */
export default function LogoutRedirect(props){

    const navigate = useNavigate();
    const { logoutUser } = useContext(AuthContext)

    useEffect(()=>{
        logoutUser();
        navigate("/");
    },[]);

    return(<></>)
}