import { useEffect } from "react";



export default function UserProfile(props){

    useEffect(async ()=>{
        const response = await fetch('localhost:8000/api-token-auth', )
        console.log(response.json())
    }, [])

    return(
        <>UserProfile</>
    );
}