import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";


/** logout redirect idea rejected, now handling logouts explicitly */
export default function LogoutRedirect(props){

    const navigate = useNavigate();
    const { logoutUser } = useContext(AuthContext)

    useEffect(()=>{
        logoutUser();
        navigate("/");
    },[]);

    return(<></>)
}