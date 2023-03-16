import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory, redirect } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  

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
      return response.status;
    } else if(response.status === 401){
      return response.status;
    } else {
      alert("Something went wrong!");
      return 0
    }
  };

  const verifyAccessToken = async () => {
    const accessToken = localStorage.getItem('access');
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
    if (response.status === 200) return 1
    else return 0;
  }

  const refreshUser = async () => {
    let tokenValid = await verifyAccessToken();
    if(tokenValid){
        return 1;
    }
    const refreshToken = localStorage.getItem('refresh');
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
      localStorage.setItem('access', data.access); 
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
    return response.status;
  };

  const logoutUser = () => {
    setAccessToken(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return 204; /* http 'no content' response */
  };

  const getUserData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/translate-token/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer "+accessToken, 
            "Content-Type": "application/json"
        },
      });
      return await res.json()
  }


  useEffect(() => {
    if (localStorage.getItem('access')) {
        verifyAccessToken().then(ans => {
          if(!ans) refreshUser();
        });
        setAccessToken(localStorage.getItem('access'));
    }
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    localStorage.setItem("access", accessToken);
    console.log("access token changed");
  },[accessToken])

  useEffect(() => {
    localStorage.setItem("refresh", refreshToken);
    console.log("refresh token changed");
  },[refreshToken])


  const contextData = {
    accessToken,
    setAccessToken,
    loginUser,
    logoutUser,
    refreshUser,
    verifyAccessToken,
    registerUser,
    getUserData
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};