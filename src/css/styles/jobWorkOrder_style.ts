import { styled } from "@mui/material";
import colour from "css/colourFile";
import { Box, Typography, Stack, TextField, Button } from '@mui/material';


export const HeaderBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 3,
    marginTop: 2
}));

export const ValueBox = styled(Box)(({ theme }) => ({
    marginTop: '8px',
    display: 'flex',
    borderRadius: '8px',
    backgroundColor: colour.white,
    padding: 4,
    position: 'static',
    boxShadow: 'unset',

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    }
}));

export const DropDownBox = styled(Box)(({ theme }) => ({
    marginLeft: '12px',
    marginBottom: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginBottom: 0,
        width: '35%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '20%',
    },
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '36px',
    marginTop: '8px',
    [theme.breakpoints.up('md')]: {
        marginTop: '30px',
    },
    [theme.breakpoints.up('lg')]: {
        marginTop: '30px',
    },

}));

export const uniformButton = styled(Box)(() => ({
    fontStyle: '"Outfit", sans-serif',
    textDecoration: 'underline',
    color: colour.primary,
    fontWeight: 'bolder',
    marginLeft: '10px',
    cursor: 'pointer'
}));

export const ItemBackgroundBox = styled(Box)(() => ({
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
    backgroundColor: colour.white,
    padding: 4, 
    boxShadow: 'unset',
    gap: 3,
    borderTop: "4px solid blue",
}));




export const CloseButton = styled(Button)(() => ({
    fontStyle: '"Outfit", sans-serif',
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