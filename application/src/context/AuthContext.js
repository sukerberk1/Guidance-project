import { createContext, useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useHistory, redirect, useLocation } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access")
      ? localStorage.getItem("access")
      : null
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refresh")
      ? localStorage.getItem("refresh")
      : null
  );
  const [ loggedUser, setLoggedUser ] = useState({
    username: "",
    first_name: "",
    last_name:"",
    avatar:"",
  });
  const [ loading, setLoading ] = useState(true);
  const [ authError, setAuthError ] = useState(false);
  

  const loginUser = async (username, password) => {
    console.log("loginUser triggered");
    const response = await fetch("http://127.0.0.1:8000/api/token/obtain-pair/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();
    if (response.status === 200) {
      setAccessToken(data.access);
      setRefreshToken(data.refresh); 
      await decodeUserFromToken();
    }
    /** is returning data necessary? May remove in future for safety reasons */
    return {
      status: response.status,
      data: data
    };
  };

  /** verifies accessToken inside accessToken state value. Returns 1 if token's valid and 0 if not. THIS FUNCTION DOES NO CHANGE TO TOKEN VALUES */
  const verifyAccessToken = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/token/verify/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
      })
    });
    if (response.status === 200) return 1;
    else return 0;
  }

  /** uses refreshToken to refresh AccessToken. Returns 1 if succeded and 0 if not */
  const refreshUser = async () => {
    if (refreshToken === null) return 0;
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log("setting accessToken:"+data.access);
      setAccessToken(data.access); 
      return 1;
    } else{
      console.log('Couldnt refresh token');
      return 0;
    }
  }
  
  const registerUser = async (username, email, password, first_name, last_name) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email,
        first_name,
        last_name
      })
    });
    return {
      status: response.status,
      data: await response.json()
    };
  };

  /** sets Access token and Refresh token to null and removes them from localstorage */
  const logoutUser = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return 204; /* http 'no content' response */
  };

  /** function decodes current JWT accessToken and stores current user in loggedUser stateful value */
  const decodeUserFromToken = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/translate-token/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer "+accessToken, 
            "Content-Type": "application/json"
        },
      });
    const u = await res.json()
    setLoggedUser(u);
  };

  /* Access token localstorage setter */
  /** additionally, triggers tokenDecode on every token change so the user data, avatar etc stay up-to-date */
  useEffect(() => {
    localStorage.setItem("access", accessToken);
    decodeUserFromToken();
  },[accessToken])

  /* Refresh token localstorage setter */
  useEffect(() => {
    localStorage.setItem("refresh", refreshToken);
  },[refreshToken])


  /*This useEffect logs user in if their localstorage token is valid */
  useEffect(() => {
    loginOnLoad();
  }, [loading]);

  async function loginOnLoad(){
    if (!localStorage.getItem("refresh")){ setLoading(false);return; }
    let loginTryCounter = 0;  // for later usage to specify how many tries are there to log in
    let isValid = await verifyAccessToken();
    while(!isValid && loginTryCounter < 20){
      const refreshed = await refreshUser();
      isValid = refreshed;
      loginTryCounter += 1;
      console.log("loginonload loop, trycounter:"+loginTryCounter)
    }
    await decodeUserFromToken();
    if (loginTryCounter >= 20){
      logoutUser();
      setAuthError(true);
    }
    setLoading(false);
  }


  const contextData = {
    accessToken,
    loggedUser,
    authError,
    setAuthError,
    loginUser,
    logoutUser,
    refreshUser,
    verifyAccessToken,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (<LoadingScreen/>) : children}
    </AuthContext.Provider>
  );
};