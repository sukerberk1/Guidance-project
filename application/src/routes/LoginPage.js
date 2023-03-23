import { Typography } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/system";
import FormTextField from "../components/FormTextField";
import PrimaryButton from "../components/PrimaryButton";
import { ExpandMore } from "@mui/icons-material";

export default function LoginPage(props){

    const { loginUser, accessToken } = useContext(AuthContext);
    const [ submitState, setSubmitState ] = useState({status: 0, data: {}});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        setSubmitState(await loginUser(username, password));
    };

    useEffect(()=>{
        if(accessToken) navigate("/");
    },[accessToken])

    return(
    <Container maxWidth={'md'}>
        <Box className="my-12 text-center">
        <Typography variant="h5" className="text-center">Zaloguj się do Guidance</Typography>
        <ExpandMore/>
        </Box>
        <Form method="POST" onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', flexFlow:'column', gap: 4}}>
                {"detail" in submitState.data ? (<FormTextField error fullWidth label="Nazwa użytkownika" variant="standard" name="username"/>)
                : (<FormTextField fullWidth label="Nazwa użytkownika" variant="standard" name="username"/>)}
                {"detail" in submitState.data ? (<FormTextField error helperText="Nie znaleźliśmy konta o takich danych logowania." fullWidth type="password" label="Hasło" variant="standard" name="password"/>) 
                : (<FormTextField fullWidth type="password" label="Hasło" variant="standard" name="password"/>)}
                
                <PrimaryButton variant="outlined" type="submit">Dalej</PrimaryButton>
                <Typography variant="overline" className="text-center">Lub <Link to={"/register"}><u className="hover:text-neutral-400">dołącz do nas</u></Link> już teraz</Typography>
            </Box>
        </Form>
        
    </Container>
    )
}