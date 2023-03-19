import { Typography } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Box, Container } from "@mui/system";
import FormTextField from "../components/FormTextField";
import PrimaryButton from "../components/PrimaryButton";
import { ExpandMore, South } from "@mui/icons-material";

export default function LoginPage(props){

    const { loginUser, accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        loginUser(username, password);
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
                <FormTextField fullWidth label="Nazwa użytkownika" variant="standard" name="username" InputLabelProps={{style: { color: '#a3a3a3'}}} autoComplete={"off"}/>
                <FormTextField fullWidth type="password" label="Hasło" variant="standard" name="password" InputLabelProps={{style: { color: '#a3a3a3'}}}autoComplete={"off"}/>
                <PrimaryButton variant="outlined" type="submit">Dalej</PrimaryButton>
                <Typography variant="overline" className="text-center">Lub <Link to={"/register"}><u className="hover:text-neutral-400">dołącz do nas</u></Link> już teraz</Typography>
            </Box>
        </Form>
        
    </Container>
    )
}