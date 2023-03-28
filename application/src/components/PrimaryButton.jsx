import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

const PrimaryButton = styled(ButtonBase)({
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#65a30d",
    letterSpacing: 1,
    margin: 2,
    "&.Mui-disabled":{
        backgroundColor: "#737373",
        color: "#27272a"
    }
});
export default PrimaryButton;
