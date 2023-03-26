import './App.css';
import { Container } from "@mui/material"
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useContext, useEffect } from 'react';
import AuthContext from './context/AuthContext';


function App() {
  const navigate = useNavigate();
  const loc = useLocation();
  
  /* default redirect to home only if requested path is pure domain. MAY BE OPTIMIZED ? */
  useEffect(()=>{
    if(loc.pathname.length < 2) navigate("/home");
  }, []);

  return (
    <Container maxWidth={false} sx={{padding: 0, minHeight: "100vh"}}>
      <NavBar/>
      <Outlet/>
    </Container>
  );
}

export default App;
