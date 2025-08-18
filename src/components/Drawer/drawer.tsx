import * as React from 'react';
import {
    List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DrawerLogo from 'assets/logo.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { submenuMap } from 'components/SubMenuItems/subMenuItems';
import { menuItems } from 'components/MenuItems/menuItems'
import {
    DrawerSx, DrawerHeaderSx, DrawerLogoSx, DrawerLogoImg,
    DrawerListItemSx, ListItemButtonSx, ListItemIconSx
} from 'css/style'

interface Props {
    collapsed: boolean;
    isMobile: boolean;
    onCloseDrawer?: () => void;
}

const Drawers: React.FC<Props> = ({ collapsed, isMobile, onCloseDrawer }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openSubMenu, setOpenSubMenu] = React.useState<{ [key: string]: boolean }>({});

    const toggleSubMenu = (label: string) => {
        setOpenSubMenu((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        if (isMobile && onCloseDrawer) {
            onCloseDrawer();
            setOpenSubMenu({});
        }
    };

    React.useEffect(() => {
        if (collapsed) {
            setOpenSubMenu({});
        }
    }, [collapsed]);

    if (!isMobile) return null;

    return (
        <DrawerSx variant="permanent"
            id="drawer-menu"
            anchor="left"
            open
            collapsed={collapsed}>
            <DrawerHeaderSx collapsed={collapsed}>
                <DrawerLogoSx>
                    <DrawerLogoImg
                        src={DrawerLogo}
                        alt="App Logo"
                        collapsed={collapsed}
                    />
                </DrawerLogoSx>
            </DrawerHeaderSx>

            <List>
                {menuItems.map((item) => {
                    const hasSubMenu = !!submenuMap[item.label];
                    const isOpen = openSubMenu[item.label];

                    return (
                        <React.Fragment key={item.label}>
                            <DrawerListItemSx collapsed={collapsed}>
                                <ListItemButtonSx
                                    id={item.id}
                                    collapsed={collapsed}
                                    selected={location.pathname === item.path}
                                    onClick={() =>
                                        hasSubMenu ? toggleSubMenu(item.label) : handleNavigate(item.path)
                                    }
                                >
                                    <ListItemIconSx collapsed={collapsed}>
                                        {item.icon}
                                    </ListItemIconSx>
                                    {!collapsed && (
                                        <>
                                            <ListItemText primary={item.label} />
                                            {hasSubMenu &&
                                                (isOpen ? (
                                                    <KeyboardArrowDownIcon fontSize="small" />
                                                ) : (
                                                    <KeyboardArrowRightIcon fontSize="small" />
                                                ))}
                                        </>
                                    )}
                                </ListItemButtonSx>
                            </DrawerListItemSx>

                            {hasSubMenu && isOpen && !collapsed && (
                                <List component="div" disablePadding>
                                    {submenuMap[item.label].map((subItem) => (
                                        <ListItem key={subItem.path} disablePadding sx={{ pl: 4 }}>
                                            <ListItemButton
                                                id={subItem.id}
                                                selected={location.pathname === subItem.path}
                                                onClick={() => handleNavigate(subItem.path)}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <ListItemIcon sx={{ minWidth: 32 }}>
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={subItem.label} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </React.Fragment>
                    );
                })}
            </List>
        </DrawerSx>
    );
};

export default Drawers;