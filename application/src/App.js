import './App.css';
import { Button, Container} from "@mui/material"
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useContext, useEffect } from 'react';
import AuthContext from './context/AuthContext';


function App() {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/home");
  }, []);

  return (
    <Container maxWidth={false} sx={{padding: 0, minHeight: "100vh"}}>
      <NavBar/>
      <Outlet/>
      <Button onClick={logoutUser}>Wyloguj</Button>
    </Container>
  );
}

export default App;
