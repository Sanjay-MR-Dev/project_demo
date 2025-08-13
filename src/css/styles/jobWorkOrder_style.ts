import { styled, TableBody, TableCell, TableContainer, TableContainerProps, TableRow } from "@mui/material";
import colour from "css/colourFile";
import { Box, Typography, TextField, Button } from '@mui/material';


export const HeaderBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
}));

export const ValueBox = styled(Box)(({ theme }) => ({
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: '8px',
    backgroundColor: colour.white,
    padding: theme.spacing(1),
    position: 'static',
    boxShadow: 'unset',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
}));

export const DropDownBox = styled(Box)(({ theme }) => ({
    marginLeft: '8px',
    marginBottom: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '40%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '20%',
    },
    '& .MuiSelect-select': {
        padding: '10px 8px',
    },
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
    marginTop: '6px',
    [theme.breakpoints.up('md')]: {
        marginTop: '30px',
    },
    [theme.breakpoints.up('lg')]: {
        marginTop: '22px',
    },

}));

export const uniformButton = styled(Box)(() => ({
    fontStyle: '"Outfit", sans-serif',
    textDecoration: 'underline',
    color: colour.primary,
    fontWeight: 'bolder',
    cursor: 'pointer'
}));


export const FirstRowTableBox = styled(Box)(({ theme }) => ({
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
    backgroundColor: colour.white,
    padding: theme.spacing(1),
    boxShadow: 'unset',
    gap: theme.spacing(3),
    borderTop: '4px solid blue',
}));

export const UniformBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '8px',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    [theme.breakpoints.up('md')]: {
        width: '35%',
    },

    [theme.breakpoints.up('lg')]: {
        width: '25%',
    },
}));

export const UniformTypography = styled(Typography)(({ theme }) => ({
    minWidth: '80px',
    fontWeight: 500,
    fontFamily: '"Outfit", sans-serif',
    marginBottom: '2px',

    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
    }
}));

export const DropDownBoxs = styled(Box)(({ theme }) => ({
    flexGrow: 1, width: '100%',
    '& .MuiSelect-select': {
        padding: '10px 8px',
    },
    [theme.breakpoints.up('lg')]: {
        width: '50%',
    },
    [theme.breakpoints.up('md')]: {
        width: '80%',
    }
}));

export const BothFirstTableBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    width: '100%',

    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
    },
}));//11

export const BothSecondTableBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    width: '100%',

    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
    },
}));

export const FirstTableOutsideBox = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%"
}));

export const FirstTableInsideBox = styled(Box)(() => ({
    display: "flex", alignItems: "center",
    marginBottom: "8px"
}));

export const TableContainerStyle = styled(TableContainer)<TableContainerProps>(() => ({
    border: `1px solid ${colour.borderColour}`,
    borderRadius: "8px",
    overflow: "hidden",
}));

export const TableRowBackground = styled(TableRow)(() => ({
    backgroundColor: `${colour.tableRowColour}`
}));

export const SnoHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '80px'
}));

export const SizeHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '20%'
}));

export const QtyHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '25%'
}));

export const RateHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '25%'
}));

export const AmountHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '25%'
}));

export const TableBodyStyle = styled(TableBody)(() => ({
    "& td": {
        fontWeight: 500,
        fontSize: "16px"
    }
}));

export const RightBodyTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    padding: "8px 8px",

}));

export const CenterBodyTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    padding: "8px 8px",

}));

export const LeftBodyTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "left",
    padding: "8px 8px",

}));

export const TotalBottomTableBox = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px"
}));
export const QtyBottomTableBox = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
}));
export const AmountBottomTableBox = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    fontWeight: "bold",
    paddingRight: "16px",
}));

export const SecondTableOutsideBox = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%"
}));

export const SecondTableInsideBox = styled(Box)(() => ({
    display: "flex", alignItems: "center", marginBottom: "8px"
}));

export const SNoHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '80px'
}));

export const FabricHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "16px",
    width: '60%'
}));

export const TotalMeterHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "16px",
    width: "20%"
}));

export const TotalAmountHeaderTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "16px",
    width: "20%"
}));

export const TotalBottomTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    fontWeight: 700,
    textAlign: "left",
    fontSize: "14px",
}));

export const MeterBottomTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    fontWeight: "bold",
}));

export const AmountBottomTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    fontWeight: "bold",
    paddingRight: "16px",
}));


export const SecondRowTableBox = styled(Box)(({ theme }) => ({
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
    backgroundColor: colour.white,
    boxShadow: 'unset',
    gap: theme.spacing(3),
    borderTop: `4px solid ${colour.lightGreen}`,
    width: "100%",
}));

export const StitchingLeftTableBox = styled(TableCell)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
}));

export const CommonFirstTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    width: '80px'
}));

export const CommonSecondTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "16px",
    width: "80%"
}));

export const CommonThirdTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "16px",
    width: "20%"
}));

export const StitchingRightTableBox = styled(TableCell)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
}));

export const FinalBodyTableCell = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`,
    textAlign: "right",
    padding: "8px 8px",
}));

export const TableCellBorder = styled(TableCell)(() => ({
    border: `1px solid ${colour.borderColour}`
}));


export const InsideTableBox = styled(TableCell)(() => ({
    backgroundColor: colour.lightGreens,
    color: "black",
    padding: "4px 8px",
    borderRadius: "8px",
    border: '2px solid',
    borderColor: colour.lightGreen,
    display: "inline-block"
}));

export const RemarksDateBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginLeft: '12px',
    gap: theme.spacing(3),
    flexDirection: 'column',
    width: '25%',
    alignItems: 'flex-start',

    [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
        width: '80%',
    },

    [theme.breakpoints.up('xl')]: {
        flexDirection: 'row',
        width: '80%',
    },
}));

export const RemarksBox = styled(Box)(({ theme }) => ({
    flex: '100%',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
        flex: '100%',
    },

    [theme.breakpoints.up('lg')]: {
        flex: '50%',
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

export const DateBox = styled(Box)(({ theme }) => ({
    flex: '100%',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
        flex: '100%',
    },

    [theme.breakpoints.up('lg')]: {
        flex: '25%',
    },
}));

export const EndButtonBox = styled(TableCell)(() => ({
    marginTop: 4,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5
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


