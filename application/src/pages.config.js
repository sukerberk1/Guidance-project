import { ClearAll, Login, PersonAdd, SmartToy, TipsAndUpdates, TrendingUp } from "@mui/icons-material";


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
    }
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
      title:"Moje konto",
      icon: <Login/>
    },
    {
      title:"Wypłać żappsy",
      icon: <PersonAdd/>
    }
];