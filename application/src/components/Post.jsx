import styled from "@emotion/styled";
import { Delete, MoreVert } from "@mui/icons-material";
import { Avatar, Chip, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";


// const PostBox = styled(Box)({
//     padding: 12,
//     transition: "200ms ease",
//     outline: "1px solid transparent",
//     "&:hover": {
//         // backgroundColor: "#3f3f46"
//         outline: "1px solid #65a30d",
//         borderRadius
//     }
// })

const StyledChip = styled(Chip)({
    color: '#a3a3a3',
    outline: '1px solid transparent',
    transition: '150ms ease',
    ":hover":{
        border: '1px solid #65a30d',
        color: '#65a30d'
    }
})

export default function Post(props){
    const post = props.object;

    var date = new Date(post.pub_date);
    const formattedPubDate = date.toISOString().substring(0, 10)

    return(<>
    <div className="px-4 py-6">
    <div className="flex gap-2">
        {post.tags.map(tag=>(
            <StyledChip variant='outlined' label={'#'+tag.name} onClick={{}}/>
        ))}
    </div>
    <Typography variant="h4" sx={{my:2}}>{post.title}</Typography>
    <Typography variant="body1" sx={{my:2}}>{post.description}</Typography>
        <div className="flex gap-4">
            <Link to={`/users/${post.author.username}`}>
                {/* <Avatar src={`http://127.0.0.1:8000/${post.author.avatar}`} alt={post.author.username}/> */}
                <Avatar src={post.author.avatar}/>
            </Link>
            <div className="grow">
            <Typography>{post.author.first_name}{" "}{post.author.last_name} - <span className="text-neutral-400">{formattedPubDate}</span></Typography>
            <Typography 
            component={Link} to={`/users/${post.author.username}`}
            variant="caption text-neutral-400"> 
            @{post.author.username}</Typography>
            </div>
            <IconButton aria-label="delete">
                <MoreVert sx={{color: "#a3a3a3"}}/>
            </IconButton>
        </div>
        
    </div>
    <Divider className="bg-neutral-400"/>
    </>
    )
}