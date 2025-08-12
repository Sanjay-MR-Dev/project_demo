import * as React from 'react';
import {
    IconButton, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Logout from '@mui/icons-material/Logout';
import AppBarImage from 'assets/logo.png';
import HorizontalMenu from "components/HorizontalBar/horizontalBar"
import { useMediaQuery } from '@mui/material';
import {
    AppbarStyle, ToolBarStyle, BoxStyle,
    AppbarImageStyle, TypographyStyle, MenuItemStyle, MenuStyle,
    DividerStyle
} from 'css/style';
import { useNavigate } from 'react-router-dom';

interface Props {
    onMenuClick: () => void;
    drawerOpen: boolean;
}

const AppBars: React.FC<Props> = ({ onMenuClick }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:1450px)');

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleChangePassword = (): void => {
        handleClose();
    };
     const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate('/login');
    };

    return (
        <>
            <AppbarStyle position="fixed">
                <ToolBarStyle>
                    <BoxStyle>
                        <AppbarImageStyle src={AppBarImage} alt="App Logo" />
                        {isMobile &&
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="menu"
                                onClick={onMenuClick}
                            >
                                <MenuIcon />
                            </IconButton>
                        }
                    </BoxStyle>

                    {!isMobile && <HorizontalMenu />}

                    <BoxStyle onClick={handleMenuClick}>
                        <TypographyStyle variant="subtitle1" fontFamily='"Outfit", sans-serif' >
                            Trio-s Software Consultancy Pvt Ltd
                        </TypographyStyle>
                        <IconButton size="large" edge="end" >
                            <AccountCircle sx={{ fontSize: 40 }} />
                        </IconButton>
                    </BoxStyle>

                    <MenuStyle
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItemStyle onClick={handleChangePassword}>
                            <ListItemIcon>
                                <Lock fontSize="small"/>
                            </ListItemIcon>
                            Change Password
                        </MenuItemStyle>
                        <DividerStyle />
                        <MenuItemStyle onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItemStyle>
                    </MenuStyle>
                </ToolBarStyle>
            </AppbarStyle>
        </>
    );
};

export default AppBars;