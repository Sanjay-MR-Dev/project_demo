import { styled } from "@mui/material";
import colour from "css/colourFile";
import { Box, Typography, Stack, TextField } from '@mui/material';


export const VoucherLabelText = styled(Typography)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px'
    }
}));

export const PurchaseFormSection = styled(Box)(() => ({
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colour.white,
    boxShadow: 'unset'
}));

export const ResponsiveFormGroup = styled(Stack)(({ theme }) => ({
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

export const LocationDropDown = styled(Box)(({ theme }) => ({
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

export const CommonInputField = styled(TextField)(() => ({
    borderRadius: 4,
    width: '100%',
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
    '& input': {
        padding: '8px 8px',
    },
}));

export const CashBox = styled(Box)(() => ({
    marginTop: '8px',
    marginBottom: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '35%',
    height: '450px',
    backgroundColor: colour.white,
    padding: 16,
    boxShadow: 'unset'
}));

export const CashInputField = styled(TextField)(() => ({
    borderRadius: 4,
    width: '120%',
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
    '& input': {
        padding: '8px 8px',
    },
}));

export const RemarksInputField = styled(TextField)(() => ({
    borderRadius: 4,
    width: '150%',
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
    '& input': {
        padding: '8px 8px',
    },
}));

export const ActionButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export const ItemEntryRow = styled(Box)(({ theme }) => ({
    marginTop: '8px',
    gap: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '99%',//fix
    borderRadius: 8,
    backgroundColor: colour.white,
    padding: 16,
    boxShadow: 'unset'
}));

export const ItemListContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '99%',//fix
    height: '360px',//fix
    //borderRadius: 8,
    backgroundColor: colour.white,
    boxShadow: 'unset'
}));

export const TaxSummaryBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '99%',//fix
    height: '90px',//fix
    backgroundColor: colour.blue,
    padding: 16,
    boxShadow: 'unset'
}));

export const PurchasePageLayout = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
}));

export const LeftColumnBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '120%',
    gap: theme.spacing(2)
}));

export const TaxInputField = styled(TextField)(() => ({
    width: '70%',
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
    '& input': {
        padding: '16px 8px',
    },
}));