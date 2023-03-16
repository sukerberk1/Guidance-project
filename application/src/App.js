import logo from './logo.svg';
import './App.css';
import {Button, Container} from "@mui/material"
import AuthProvider from './context/AuthContext';
import { Outlet, Link } from 'react-router-dom';



function App() {
  return (
    <Container>
      <Button LinkComponent={Link} to={"login"}>LOGUJ</Button>
      <Outlet/>
    </Container>
  );
}

export default App;
