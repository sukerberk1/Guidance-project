import styled from "@emotion/styled";
import { Box, Button, ListSubheader, SwipeableDrawer } from "@mui/material";
import { Link } from "react-router-dom";


export const StyledSwipeableDrawer = styled(SwipeableDrawer)({
  "& 	.MuiDrawer-paper": {
    backgroundColor: "#404040",
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    minWidth: 190
  }
});


export const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: "#262626",
  color: 'white',
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: 2,
  fontSize: 12
});


export function NavBarCustomIconButton(props){
    return(
        <Button 
                LinkComponent={Link} to={props.option.link}
                key={props.option.title}
                sx={{ my: 2, mx:1, color: 'white', display: 'flex',
                '& .MuiSvgIcon-root':{ transition: "ease 0.15s"},
                ":hover":{
                  '& .MuiSvgIcon-root[data-testid="TipsAndUpdatesIcon"]':{
                    transform: "scale(1.5) rotate(10deg) translate(0, -2px)",
                  },
                  '& .MuiSvgIcon-root[data-testid="TrendingUpIcon"]':{
                    transform: "scale(1.5) skew(-9deg, -10deg) translate(2px, -5px) rotate(-3deg)",
                  },
                  '& .MuiSvgIcon-root[data-testid="ClearAllIcon"]':{
                    transform: "scale(1.75, 1.5) translate(0, -2px) skew(25deg, 0deg)",
                  },
                  '& .MuiSvgIcon-root[data-testid="LoginIcon"]':{
                    transform: "rotate(-45deg)"
                  },
                  '& .MuiSvgIcon-root[data-testid="PersonAddIcon"]':{
                    transform: "rotate(-5deg) scale(1.2)"
                  },
                  '& .MuiSvgIcon-root[data-testid="SmartToyIcon"]':{
                    transform: "scale(1.3) translate(0, -2px)"
                  }
                }
              }}
              >
                <Box sx={{padding: 1,}}>
                  {props.option.icon}
                </Box>
                {props.option.title}
              </Button>
    )
}