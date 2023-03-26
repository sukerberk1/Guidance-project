/*TODO: make loading screen*/

import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LoadingScreen(props){
    return ( <Container sx={{minHeight: '90vh', display: 'grid', placeItems: 'center'}}>
        <Box sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', gap: 2}}>
            <Typography className="text-neutral-400">Authenticating</Typography>
            <img src="https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg"/>
        </Box>
    </Container> )
}