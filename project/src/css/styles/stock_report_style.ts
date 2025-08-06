import { styled } from "@mui/material";
import { Box,Stack, Grid } from '@mui/material';
import colour from "css/colourFile";


export const StyledSpaceBox = styled(Stack)(({ theme }) => ({
    flexWrap: 'wrap',
    rowGap: theme.spacing(3),
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
    },
    alignItems: "flex-start",
    justifyContent: 'space-between',
    '& > *': {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}));

export const CollapseStack = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    flexDirection: "column",
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    }
}));

export const SrDropDown = styled(Box)(({ theme }) => ({
    minWidth: '100%',
    maxWidth: '200%',
    marginBottom: '16px',
    [theme.breakpoints.up('sm')]: {
        minWidth: 325,
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

export const ViewByContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));


export const ViewByCheckGroup = styled(Grid)(({ theme }) => ({
    width: "100%",
    rowGap: theme.spacing(1.5),
    columnGap: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
        rowGap: theme.spacing(1),
    },
}));

export const ViewByButtonGroup = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-end",
    },
}));
