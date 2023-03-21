import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)({
    padding: 2,
    "& .MuiInputBase-input": {
        color: "white",
        backgroundColor: "transparent",
        '&:focus':{
            backgroundColor: "transparent"
        },
    },
    "& .MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before":{
        borderBottomColor: "#84cc16" ,
    },    
    "& .MuiInput-underline:hover:after ": { borderBottomColor: "#84cc16" },
    "& .MuiInput-underline:hover:before ": { borderBottomColor: "#84cc16" },
    '& .MuiInput-underline:before': { borderBottomColor: '#65a30d' },
    '& .MuiInput-underline:after': { borderBottomColor: '#65a30d' },
    "& .Mui-error:before":{
        borderBottomColor: "#f59e0b"
    },
    "& .Mui-error":{
        color: "#f59e0b",
    }
});
// TODO: border on hover is black. Change it to lightgreen.

export default function FormTextField(props){
    return (
        <StyledTextField {...props} InputLabelProps={{style: { color: '#a3a3a3'}}} autoComplete={"off"}></StyledTextField>
    )
}
