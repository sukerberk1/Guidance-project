import { Done, DriveFileRenameOutline } from "@mui/icons-material";
import { Alert, Box, Container, LinearProgress, Snackbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import FormTextField from "../components/FormTextField";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import AuthContext from "../context/AuthContext";


export default function AddPostPage(props){
    const [ processing, setProcessing ] = useState(0);
    const { accessToken, refreshUser, loggedUser } = useContext(AuthContext);
    const [ submitError, setSubmitError ] = useState(false)
    const navigate = useNavigate();
    


    const handleSubmit = async (e) => {
        setProcessing(1);
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const tags = e.target.tags.value;
        await refreshUser();
        const res = await fetch("http://127.0.0.1:8000/api/posts/",{
            method: "POST",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem('access'),
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title,
                description,
                tags
            })
        })
        if( res.status >= 400 ){setSubmitError(true)}
        setProcessing(res.status);
    }

    /**TODO: redirect on post view */
    async function afterSuccessRedirect(){
        /** wait 2 sec b4 redirect*/
        await new Promise(r => setTimeout(r, 2000));
        navigate("/home/")
    }

    useEffect(()=>{
        if(processing===201) afterSuccessRedirect();
    },[processing]);

    useEffect(()=>{
        if(!('id' in loggedUser))
        navigate("/login/");
    })

    return(
    <Container maxWidth={'md'}>
        <Box className="my-12 text-center">
        <Typography variant="h5" className="text-center">Dodaj post</Typography>
        <DriveFileRenameOutline sx={{my: 2}}/>
        </Box>
        <Form method="POST" onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', flexFlow:'column', gap: 4}}>
                <FormTextField fullWidth label="Tytuł postu" variant="standard" name="title"/>
                <FormTextField multiline fullWidth label="O czym chcesz napisać?" variant="standard" name="description"/>
                <FormTextField helperText="Wpisz tagi oddzielone spacjami" fullWidth label="Tagi" variant="standard" name="tags"/>
                {processing === 1 ? (<LinearProgress color="inherit" />) 
                : processing === 201 ? (<SecondaryButton disabled variant="outlined" type="submit"> <Done/> </SecondaryButton>)
                : (<PrimaryButton variant="outlined" type="submit">Dalej</PrimaryButton>)
                }
                { submitError ? (<Snackbar open={submitError} autoHideDuration={6000} onClose={()=>setSubmitError(false)}>
                        <Alert onClose={()=>setSubmitError(false)} severity="error" sx={{ width: '100%' }}>
                            Wystąpił błąd przy dodawaniu posta. Spróbuj ponownie później
                        </Alert>
                    </Snackbar>) : (<></>)}
                
            </Box>
        </Form>
        
    </Container>
    )
}