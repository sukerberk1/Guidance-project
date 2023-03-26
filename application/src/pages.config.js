import { Clear, ClearAll, Face2, Login,  PersonAdd, SmartToy, TipsAndUpdates, TrendingUp } from "@mui/icons-material";


export const pages = [
    {
      title: "Główna",
      icon: <ClearAll/>,
      link: "/home"
    },
    {
      title: "Tematy",
      icon: <TipsAndUpdates/>,
      link: "/tags"
    },
    {
      title: "Popularne",
      icon: <TrendingUp/>,
      link: "/trending"
    },
    {title:"Twój StudyBuddy", 
    icon: <SmartToy/>, 
    link: ""   
    },
];

export const unloggedUserOptions = [
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

export const loggedUserOptions = [
    {
      title:"Mój profil",
      icon: <Face2/>,
      link: ""
    },
    {
      title:"Wypłać żappsy",
      icon: <Clear/>,
      link: ""
    },
    // I decided to add logout option explicitly for every case where its necessary, bcs it does call the logout function instead of navigating through an interface
    // {
    //   title:"Wyloguj się",
    //   icon: <Logout/>,
    //   link: "/logout"
    // },
];