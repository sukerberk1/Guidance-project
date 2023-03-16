import { Button, TextField, Typography } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { Form, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Box, Container } from "@mui/system";

export default function LoginPage(props){

    const { loginUser, accessToken, logoutUser, getUserData } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        loginUser(username, password);
    };


    useEffect(()=>{
        console.log("AT changed");
    },[accessToken])

    useEffect(()=>{
        getUserData().then( a => console.log(a) );
    })

    return(
    <Box>
        <Form method="POST" onSubmit={handleSubmit}>
            { accessToken ? (
            <>
                <Typography>{accessToken}</Typography>
                <Button variant="outlined" onClick={logoutUser}>Wyloguj</Button>
            </>
            ) : (
            <>
                <TextField id="username" label="username" variant="standard" name="username"/>
                <TextField id="password" label="password" variant="standard" name="password"/>
                <Button variant="outlined" type="submit">Loguj się</Button>
            </>
            )}
            
        </Form>
        <Button LinkComponent={Link} to={"/"}>Wróć</Button>
    </Box>
    )
}