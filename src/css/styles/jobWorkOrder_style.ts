import { styled } from "@mui/material";
import colour from "css/colourFile";
import { Box, Typography, Stack, TextField,Button } from '@mui/material';



export const uniformButton = styled(Box)(() => ({

    textDecoration : 'underline',
    color : colour.blue,
    fontWeight : 'bolder',
    marginTop : '3%',
    marginLeft : '10px',
    cursor : 'pointer'
}));

export const CloseButton = styled(Button)(() => ({
    backgroundColor: `${colour.red} !important`,
    '&:hover': {
        backgroundColor: `${colour.hoverRed} !important`
    },
}));

export const SaveButton = styled(Button)(() => ({
    backgroundColor: `${colour.blue} !important`,
    '&:hover': {
        backgroundColor: `${colour.blue} !important`
    },
}));

export const ContinueButton = styled(Button)(() => ({
    backgroundColor: `${colour.lightGreen} !important`,
    '&:hover': {
        backgroundColor: `${colour.lightGreen} !important`
    },
}));

export const RemarksInputField = styled(TextField)(() => ({
    borderRadius: 4,
    width: '400%',
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
    '& input': {
        padding: '8px 8px',
    },
}));