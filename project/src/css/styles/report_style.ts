import { styled } from "@mui/material/styles";
import colour from "css/colourFile";
import { Box, Stack } from '@mui/material';


export const StyledSpaceBox = styled(Stack)(({ theme }) => ({
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
    },
    alignItems: "flex-start",
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
        Width: '100%'
    },

}));

export const CollapseStack = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    }
}));


export const StyledFlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

export const OutletBox = styled(Box)(({ theme }) => ({
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
        minWidth: 250,
    },

    '& .MuiOutlinedInput-root': {
        backgroundColor: colour.white,
        minHeight: '36px',
    },

    '& .MuiSelect-select': {
        paddingTop: '8px',
        paddingBottom: '8px',
    },
}));


