import FormTextField from "../components/FormTextField";
import PrimaryButton from "../components/PrimaryButton";
import { ExpandMore } from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Form, Link } from "react-router-dom";


export default function RegisterPage(props){

    const handleSubmit = () => {

    }
    // TODO: make registration form
    return(
        <Container maxWidth={'md'}>
            <Box className="my-12 text-center">
            <Typography variant="h5" className="text-center">Utwórz konto</Typography>
            <ExpandMore/>
            </Box>
            <Form method="POST" onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexFlow:'column', gap: 4}}>
                    <FormTextField fullWidth label="Nazwa użytkownika" variant="standard" name="username" InputLabelProps={{style: { color: '#a3a3a3'}}} autoComplete={"off"}/>
                    <FormTextField fullWidth type="password" label="Hasło" variant="standard" name="password" InputLabelProps={{style: { color: '#a3a3a3'}}}autoComplete={"off"}/>
                    <PrimaryButton variant="outlined" type="submit">Dalej</PrimaryButton>
                    <Typography variant="overline" className="text-center">Lub <Link to={"/login"}><u className="hover:text-neutral-400">zaloguj się</u></Link> do istniejącego konta</Typography>
                </Box>
            </Form>
            
        </Container>
        )
}