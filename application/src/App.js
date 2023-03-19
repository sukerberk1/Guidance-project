import './App.css';
import { Button, Container} from "@mui/material"
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';


function App() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <Container maxWidth={false} sx={{padding: 0, minHeight: "100vh"}}>
      <NavBar/>
      <Outlet/>
      <Button onClick={logoutUser}>Wyloguj</Button>
    </Container>
  );
}

export default App;
