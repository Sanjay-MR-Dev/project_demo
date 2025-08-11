import { styled } from "@mui/material/styles";
import {
    TextField, Typography, Box, Paper,
    Stack, Button, Drawer, ListItemButton,
    ListItemIcon, ListItem, FormControl, AppBar, Toolbar,
    MenuItem,
    Menu,
    Divider,
    Grid, GridProps
} from '@mui/material';
import colour from './colourFile';


interface StyleProps {
    collapsed: boolean;
}

//common style
export const CommonHeaderBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'collapseOpen' })<{ collapseOpen?: boolean }>(({ collapseOpen }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: collapseOpen ? 0 : 8,
        borderBottomRightRadius: collapseOpen ? 0 : 8,
        backgroundColor: colour.white,
        padding: 12,
        boxShadow: 'unset',
    }));

export const CommonTypography = styled(Typography)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    letterSpacing: '0px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '20px'
    },
}));

export const CommonCollapseBox = styled(Box)(() => ({
    backgroundColor: colour.white,
    padding: '16px',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

export const CommonModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    maxWidth: '100vw',
    width: '600px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        width: '300px'
    },
    [theme.breakpoints.down('md')]: {
        width: '380px'
    },
    [theme.breakpoints.down('xs')]: {
        width: '100%'
    },
}));

//error button style
export const ErrorButton = styled(Button)(() => ({
    backgroundColor: `${colour.red} !important`,
    '&:hover': {
        backgroundColor: `${colour.hoverRed} !important`
    },
}));

//success button style
export const SuccessButton = styled(Button)(() => ({
    backgroundColor: `${colour.lightGreen} !important`,
    '&:hover': {
        backgroundColor: `${colour.lightGreen} !important`
    },
}));

//Appbar Style
export const AppbarStyle = styled(AppBar)(() => ({
    transition: 'margin 0.8s, width 0.3s',
    backgroundColor: colour.white,
}));

export const ToolBarStyle = styled(Toolbar)(() => ({
    display: 'flex', justifyContent: 'space-between'
}));

export const BoxStyle = styled(Box)(() => ({
    display: 'flex', alignItems: 'center', cursor: 'pointer',
}));
export const AppbarImageStyle = styled('img')(() => ({
    width: 90, height: 35, marginRight: 8
}));
export const TypographyStyle = styled(Typography)(() => ({
    marginRight: '8px', color: colour.black
}));
export const MenuItemStyle = styled(MenuItem)(() => ({
    borderRadius: 2, margin: '4px 8px', fontFamily: '"Fredoka", sans-serif'
}));
export const MenuStyle = styled(Menu)(() => ({
    '& .MuiPaper-root': {
        borderRadius: '24px',
        minWidth: 180,
        marginTop: '8px',
        marginLeft: '-16px',
        backgroundColor: colour.white
    }
}));
export const DividerStyle = styled(Divider)(() => ({
    marginTop: '4px',
    marginBottom: '4px'
}))

//drawer style
export const DrawerSx = styled(Drawer)<StyleProps>(() => ({
    '& .MuiDrawer-paper': {
        width: '62vw',
        maxWidth: '100vw',
        transition: 'width 0.10s',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        color: colour.white,
    },
}));

export const DrawerHeaderSx = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'collapsed',
})<StyleProps>(({ collapsed }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    padding: '24px'

}));

export const DrawerLogoSx = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export const DrawerLogoImg = styled('img', {
    shouldForwardProp: (prop) => prop !== 'collapsed',
})<StyleProps>(({ collapsed }) => ({
    width: 120,
    height: 40,
    marginRight: collapsed ? 0 : 5,
}));

export const DrawerListItemSx = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'collapsed',
})<StyleProps>(({ collapsed }) => ({
    justifyContent: collapsed ? 'center' : 'flex-start',
    marginTop: 8,
    marginBottom: 8,
}));

export const ListItemButtonSx = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'collapsed',
})<StyleProps>(({ collapsed }) => ({
    paddingLeft: collapsed ? 2 : 3,
    justifyContent: collapsed ? 'center' : 'flex-start',
    minHeight: 16,
    paddingTop: 4,
    paddingBottom: 8,

}));

export const ListItemIconSx = styled(ListItemIcon, {
    shouldForwardProp: (prop) => prop !== 'collapsed',
})<StyleProps>(({ collapsed }) => ({
    minWidth: collapsed ? 0 : 40,
    justifyContent: 'center',
    color: colour.white
}));


//horizontalbar style
export const StackColour = styled(Stack)(() => ({
    justifyContent: "left",
    flexWrap: "nowrap",
    minWidth: 'max-content',
    paddingLeft: '8px',
    paddingRight: '8px'
}));

export const ButtonBoxStyle = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    gap: 1,
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '4px',
    paddingBottom: '4px',
    cursor: 'pointer',
    borderRadius: 2,
    transition: 'all 0.2s',
}));

export const PaperStyle = styled(Paper)(() => ({
    marginTop: '8px',
    borderRadius: '16px',
    backgroundColor: colour.white,
    minWidth: '160px',
    zIndex: 1300,

}));

export const ActiveSubitemStyle = styled(Box)(() => ({
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
}));

export const HoverStyle = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ active }) => ({
    position: 'relative',
    display: 'inline-block',
    fontWeight: active ? 600 : 'normal',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '2px',
        width: active ? '100%' : '0%',
        backgroundColor: colour.black,
        transition: 'width 0.3s ease-in-out',
    },
}));

export const PaperWidth = styled(Paper)(() => ({
    marginTop: '0.125rem',
    fontFamily: '"Fredoka", sans-serif"',
    color: colour.red,
    backgroundColor: colour.red,
    fontSize: '0.95rem',

}));

//mainlayout style
export const DrawerLayoutStyles = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
        width: 240
    }
}));

export const MainLayoutStyles = styled(Box)(() => ({
    marginTop: '85px',
    padding: 2,
    marginLeft: "20px",
    marginRight: "20px"
}));

//file style
export const CustomTextFieldStyles = styled(TextField)(() => ({
    borderRadius: 8,
    width: '50%',
    marginBottom: 32,
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
}));

export const DropDownStyle = styled(FormControl)(() => ({
    marginBottom: 16,
    '& .MuiSvgIcon-root': {
        fontSize: 28,
    },
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    }
}));

//login Style

export const LoginImageStyle = styled('img')(() => ({
    justifyContent: 'center',
    width: 100, height: 40, marginRight: 8, marginBottom : '8px'
}));

export const GridBox = styled(Grid)<GridProps>(() => ({
    backgroundColor: '#111936',
    height: '100vh',
}));


export const PaperModal = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    height: '70%',
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
        width: '50%',
        flexDirection: 'row',
    },
    [theme.breakpoints.up('md')]: {
        width: '50%',
        flexDirection: 'row'
    }
}));

export const ImageBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 300,
    display: 'block',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.up('sm')]: {
        width: '50%',
        height: 'auto'
    },

}));

export const Typograph = styled(Typography)(() => ({
    fontWeight:'bold',
    textAlign:'center',
    marginBottom : '40px'
}))



export const FormBox = styled(Box)(() => ({
    display: 'flex',
    flex: '4px',
    flexDirection: 'column',
    padding: '32px',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
}));