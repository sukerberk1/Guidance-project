import { EmojiEvents, GroupAdd, Person, Visibility } from "@mui/icons-material";
import { Avatar, Box, Button, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import AuthContext from "../context/AuthContext";

export async function Loader({params}){
    return params.username;
}


export default function UserProfilePage(props){
    const searchedUsername = useLoaderData();
    const [ user, setUser ] = useState(null);
    const [ followClick, setFollowClick ] = useState(0);
    const { accessToken, refreshUser, loggedUser } = useContext(AuthContext);
    const [ followingDialog, setFollowingDialog ] = useState(false);
    const [ followedUsersDialog, setFollowedUsersDialog ] = useState(false);
    
    const handleFollowedUsersDialog = () => {
        setFollowedUsersDialog(!followedUsersDialog);
    };
    const handleFollowingDialog = () => {
        setFollowingDialog(!followingDialog);
    };

    const handleFollow = async () => {
        await refreshUser();
        const username = user.username;
        await fetch("http://127.0.0.1:8000/api/users/follow/", {
            method:"PUT",
            headers:{
                "Authorization": "Bearer "+accessToken, 
                "Content-Type": "application/json"
            },
            body:JSON.stringify({username})
        });
        setFollowClick(followClick+1);
    }

    async function load(){
        const response = await fetch(`http://127.0.0.1:8000/api/users/username/${searchedUsername}/`);
        const userObject = await response.json()
        setUser(userObject);
    }

    useEffect(()=>{
        load();
    },[followClick, searchedUsername]);

    if(loggedUser) console.log('1');
    console.log('2');

    if (user !== null)
    return(<Container maxWidth="md">
        <Box sx={{display: 'flex', flexFlow:{xs:"column", md:"row"}, mt: 4, gap: 4}}>
            <Avatar sx={{width:164, height:164, alignSelf: "center", outline: "4px solid #65a30d", outlineOffset: 6}} src={`http://127.0.0.1:8000/${user.avatar}`}/>
            <Box sx={{flexGrow: 2, mt: 1}}>
                <Typography variant="h4">{user.first_name} {user.last_name}</Typography>
                <Typography variant="subtitle1" className="text-neutral-400">@{user.username}</Typography>
                <Typography variant="body1" sx={{my:2}}>{user.bio}</Typography>
                <Typography variant="body2" className="text-neutral-400">
                    <u onClick={handleFollowingDialog} className="hover:text-white"><span className="text-white">{user.users_following_count}</span> Obserwujących</u>
                    {" | "}
                    <u onClick={handleFollowedUsersDialog} className="hover:text-white"><span className="text-white">{user.followed_users_count}</span> Obserwowanych</u>
                </Typography>
           
            </Box>
            <Box sx={{display: 'flex', flexFlow:{md: 'column'}, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: {xs:'space-around', md: 'flex-start'}, gap:{md:1}}}>
                <Box className="p-1 text-zinc-400">
                    <EmojiEvents sx={{margin: 1}}/>
                    <Typography variant="overline">Credit: {user.score}</Typography>
                </Box>
                { user.users_following.filter(u => u.username === loggedUser.username).length > 0 || user.username === loggedUser.username ? (
                    <SecondaryButton sx={{padding: 2}} onClick={handleFollow}>
                        <Visibility sx={{mx: 1}}/>
                        <Typography variant="overline">Obserwujesz</Typography>
                    </SecondaryButton>
                ) ? loggedUser : (
                    <PrimaryButton sx={{padding: 2}} onClick={handleFollow}>
                        <Visibility sx={{mx: 1}}/>
                        <Typography variant="overline">Obserwuj</Typography>
                    </PrimaryButton>
                ) :
                
                (
                    <Tooltip arrow enterTouchDelay={0} title="Zaloguj się">
                        <span>
                        <PrimaryButton disabled sx={{padding: 2}}>
                            <Visibility sx={{mx: 1}}/>
                            <Typography variant="overline">Obserwuj</Typography>
                        </PrimaryButton>
                        </span>
                    </Tooltip>
                )}
                
            </Box>
        </Box>


        
        <Dialog open={followedUsersDialog} onClose={handleFollowedUsersDialog}>
        <DialogTitle>Użytkownicy obserwowani przez @{user.username}</DialogTitle>
            <List sx={{ pt: 0 }}>
            {user.followed_users.map((u) => (
            <ListItem disableGutters>
                <ListItemButton key={u} LinkComponent={Link} to={`/users/${u.username}`}>
                <ListItemAvatar>
                    <Avatar alt={u.username} src={`http://127.0.0.1:8000/${u.avatar}`}/>
                </ListItemAvatar>
                <ListItemText primary={u.username} />
                </ListItemButton>
            </ListItem>
            ))}
            </List>
        </Dialog>
        <Dialog open={followingDialog} onClose={handleFollowingDialog}>
        <DialogTitle>Użytkownicy obserwujący @{user.username}</DialogTitle>
            <List sx={{ pt: 0 }}>
            {user.users_following.map((u) => (
            <ListItem disableGutters>
                <ListItemButton key={u} LinkComponent={Link} to={`/users/${u.username}`}>
                <ListItemAvatar>
                    <Avatar alt={u.username} src={`http://127.0.0.1:8000/${u.avatar}`}/>
                </ListItemAvatar>
                <ListItemText primary={u.username} />
                </ListItemButton>
            </ListItem>
            ))}
            </List>
        </Dialog>
        <Outlet/>
    </Container>);
    else 
    return(<></>);
}