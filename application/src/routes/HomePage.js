import { AddBox, DriveFileRenameOutline } from "@mui/icons-material";
import { Box, Divider, Fab, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function HomePage(props){
    const [ feed, setFeed ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchFeed = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/posts/");
        const posts = await response.json();
        console.log(posts);
        setFeed(posts);
        setLoading(false)
    }

    useEffect(()=>{
        fetchFeed();
    },[]);

    return(<Container maxWidth="md">

    <Divider sx={{"&::after, &::before":{borderColor:"#65a30d", my:2}}}>
        <Tooltip arrow title="Dodaj post">
        <IconButton sx={{bgcolor: "#65a30d", "&:hover": {bgcolor: "#84cc16"}}} LinkComponent={Link} to="/posts/add">
            <DriveFileRenameOutline sx={{color: 'white' }} fontSize="medium"/>
        </IconButton>
        </Tooltip>
    </Divider>

    {loading ? (<Skeleton></Skeleton>) : (
        feed.map(elem=><Post object={elem}/>)
    )}
    </Container>);
}