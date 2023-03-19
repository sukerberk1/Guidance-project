import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const FormTextField = styled(TextField)({
    padding: 2,
    "& .MuiInputBase-input": {
        color: "white",
        backgroundColor: "transparent",
        '&:focus':{
            backgroundColor: "transparent"
        },
    },
    "& .MuiInput-underline:hover:after ": { borderBottomColor: "#84cc16" },
    "& .MuiInput-underline:hover:before ": { borderBottomColor: "#84cc16" },
    '& .MuiInput-underline:before': { borderBottomColor: '#65a30d' },
    '& .MuiInput-underline:after': { borderBottomColor: '#65a30d' },
});
// TODO: border on hover is black. Change it to lightgreen.

export default FormTextField
