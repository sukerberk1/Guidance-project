import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {  ClearAll, GMobiledata, Login, PersonAdd, School, TipsAndUpdates, TrendingUp } from '@mui/icons-material';
import {  Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SwipeableDrawer } from '@mui/material';
import styled from '@emotion/styled';

const pages = [
  {
    title: "Główna",
    icon: <ClearAll/>
  },
  {
    title: "Tematy",
    icon: <TipsAndUpdates/>
  },
  {
    title: "Popularne",
    icon: <TrendingUp/>
  }
];
const unloggedUserOptions = [
  {
    title:"Zaloguj się",
    icon: <Login/>,
    link: "/login"
  },
  {
    title:"Stwórz konto",
    icon: <PersonAdd/>,
    link: "/register"
  }
];
const settings = [
  {
    title:"Moje konto",
    icon: <Login/>
  },
  {
    title:"Wypłać żappsy",
    icon: <PersonAdd/>
  }
];

const StyledSwipeableDrawer = styled(SwipeableDrawer)({
  "& 	.MuiDrawer-paper": {
    backgroundColor: "#404040",
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    minWidth: 190
  }
});

const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: "#262626",
  color: 'white',
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: 2,
  fontSize: 12
});

function NavBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { accessToken } = React.useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{backgroundColor: "transparent", boxShadow: 'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <School sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "#65a30d"}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GUIDANCE
          </Typography>

            {/* --- this box handles mobile version  ---*/}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <StyledSwipeableDrawer
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <GMobiledata sx={{color: "#52525b", fontSize: 72, textAlign: 'center'}}/>
              <List>
              {pages.map(page=>(
                <ListItemButton>
                    <ListItemIcon sx={{color: 'white'}}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText>{page.title}</ListItemText>
                </ListItemButton>
              ))}
              <Divider/>
              {accessToken ? 
              (<StyledListSubheader color='inherit'>Hej, Szymek</StyledListSubheader>) 
              : (<StyledListSubheader>Jesteś niezalogowany/a</StyledListSubheader>)}
              {accessToken ? (
                settings.map((opt => (<>
                <ListItemButton LinkComponent={Link}>
                    <ListItemIcon sx={{color: 'white'}}>
                      {opt.icon}
                    </ListItemIcon>
                    <ListItemText>{opt.title}</ListItemText>
                </ListItemButton>
                </>)))
              ) : (
              unloggedUserOptions.map((opt) => (<>
              <ListItemButton LinkComponent={Link} to={opt.link}>
                  <ListItemIcon sx={{color: 'white'}}>
                    {opt.icon}
                  </ListItemIcon>
                  <ListItemText>{opt.title}</ListItemText>
              </ListItemButton>
              </>
              )))}
              </List>
              
            </StyledSwipeableDrawer>

          </Box>
          <School sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: "#65a30d"}} />
          <Typography
            variant="h5"
            noWrap
            LinkComponent={Link} to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GUIDANCE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.icon}
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;