import FormTextField from "../components/FormTextField";
import PrimaryButton from "../components/PrimaryButton";
import { Check, ExpandMore } from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Form, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, } from "react";
import AuthContext from "../context/AuthContext";


export default function RegisterPage(props){

    const { registerUser } = useContext(AuthContext);
    const [ submitState, setSubmitState ] = useState({status: 0, data: {}});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.password.value === e.target.password2.value){
        setSubmitState( await registerUser(
            e.target.username.value,
            e.target.email.value,
            e.target.password.value,
            e.target.first_name.value,
            e.target.last_name.value
        ) );
        
        }
        else setSubmitState({
            status: 406,
            data: {password:"Passwords don't match"}
        });
    }
    
    if (submitState.status !== 201)
    return(
        <Container maxWidth={'md'}>
            <Box className="my-12 text-center">
            <Typography variant="h5" className="text-center">Utwórz konto</Typography>
            <ExpandMore/>
            </Box>
            <Form method="POST" onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexFlow:'column', gap: 4}}>
                    {"username" in submitState.data ? 
                    (<FormTextField error helperText="Ta nazwa jest już zajęta" fullWidth label="Nazwa użytkownika" variant="standard" name="username"/>) 
                    : (<FormTextField fullWidth label="Nazwa użytkownika" variant="standard" name="username"/>)}
                    {/* it's not necessary to perform validation on first and last name providing we dont take trolling into account */}
                    <Box className="md:flex">
                        <FormTextField fullWidth label="Twoje imię" variant="standard" name="first_name"/>
                        <FormTextField fullWidth label="Twoje nazwisko" variant="standard" name="last_name"/>
                    </Box>
                    {"email" in submitState.data ? 
                    (<FormTextField error helperText="Nie możesz użyć takiego adresu e-mail" fullWidth label="Adres e-mail" variant="standard" name="email"/>)
                    : (<FormTextField fullWidth label="Adres e-mail" variant="standard" name="email"/>)}
                    {"password" in submitState.data ? 
                    (<><FormTextField error fullWidth type="password" label="Hasło" variant="standard" name="password"/>
                    <FormTextField error helperText="Hasła nie są takie same" fullWidth type="password" label="Powtórz hasło" variant="standard" name="password2"/></>) 
                    : (<><FormTextField fullWidth type="password" label="Hasło" variant="standard" name="password"/>
                    <FormTextField fullWidth type="password" label="Powtórz hasło" variant="standard" name="password2"/></>)}
                    
                    <PrimaryButton variant="outlined" type="submit">Dalej</PrimaryButton>
                    <Typography variant="overline" className="text-center">Lub <Link to={"/login"}><u className="hover:text-neutral-400">zaloguj się</u></Link> do istniejącego konta</Typography>
                </Box>

                <Typography variant="caption" display="block" className="text-center text-neutral-400">
                    Rejestrując się, zgadzasz się na Warunki korzystania i Politykę prywatności, łącznie z Polityką ciasteczek.
                </Typography>
            </Form>
            
        </Container>
        )
        else return(
            <Container maxWidth={'md'}>
            <Box className="my-12 text-center">
            <Typography variant="h4" className="text-center">Właśnie utworzyłeś konto!</Typography>
            <Check fontSize="large" className="my-8"/>
            <Typography variant="subtitle2" className="text-center">Teraz, <Link to={"/login/"}><u className="hover:text-neutral-400">zaloguj się</u></Link> do niego aby zacząć w pełni korzystać z Guidance</Typography>
            </Box>
            
            
        </Container>
        );
}