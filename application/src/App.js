import './App.css';
import { Container, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {  Home, Search, Person, SmartToy } from '@mui/icons-material';
import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function App() {

  const [currentPage, setCurrentPage] = useState('home');
  
  let userId = 1; /* temporary current user id */

    return (
    <Container className='App'>

      {currentPage == 'home'? (<>Homepage</>) : (<Outlet/>)}

      <BottomNavigation
        showLabels
        style={{ position: 'fixed', bottom: 0, left:0, right: 0, paddingTop: 4, paddingBottom: 4 }}
        value={currentPage}
        onChange={(event, newValue) => {
          setCurrentPage(newValue);
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          value='home'
          icon={<Home />} 
          LinkComponent={RouterLink} to='/'
        />
        <BottomNavigationAction 
          label="Search" 
          value='search'
          icon={<Search/>} 
          LinkComponent={RouterLink} to='search/'
        />
        <BottomNavigationAction 
          label="Profile" 
          value='profile'
          icon={<Person />} 
          LinkComponent={RouterLink} to={`profile/${userId}`}
        />
        <BottomNavigationAction 
          label="YourBuddy" 
          value='yourBuddy'
          icon={<SmartToy />} 
          LinkComponent={RouterLink} to={`yourbuddy/${userId}`}
        />
      </BottomNavigation>
    </Container>
  );
}

export default App;
