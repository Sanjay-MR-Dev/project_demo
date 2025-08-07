import * as React from 'react';
import {
    Box,Typography, MenuItem, Popper, Paper
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ButtonBoxStyle, StackColour } from 'css/style';
import colour from 'css/colourFile';
import { submenuMap } from 'components/SubMenuItems/subMenuItems';
import { menuItems } from 'components/MenuItems/menuItems';


const HorizontalMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [subMenuOpen, setSubMenuOpen] = React.useState(false);
    const [subAnchorEl, setSubAnchorEl] = React.useState<null | HTMLElement>(null);
    const [activeSubItems, setActiveSubItems] = React.useState<{ label: string; path: string }[]>([]);
    const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSubMenuEnter = (event: React.MouseEvent<HTMLElement>, itemLabel: string) => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        if (submenuMap[itemLabel]) {
            setActiveSubItems(submenuMap[itemLabel]);
            setSubAnchorEl(event.currentTarget);
            setSubMenuOpen(true);
        } else {
            setSubMenuOpen(false);
        }
    };

    const handleSubMenuLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setSubMenuOpen(false);
            setSubAnchorEl(null);
        }, 1000);
    };

    const handleSubPopperEnter = () => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };

    const handleSubPopperLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setSubMenuOpen(false);
            setSubAnchorEl(null);
        }, 300);
    };

    const handleSubMenuItemClick = (path: string) => {
        navigate(path);
        setSubMenuOpen(false);
    };

    return (
        <StackColour
            spacing={1}
            direction="row"
            justifyContent="left"
            flexWrap="nowrap"
        >

            {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const hasSubmenu = Boolean(submenuMap[item.label]);
                return (
                    <ButtonBoxStyle
                        key={item.path}
                        onMouseEnter={(e) => hasSubmenu && handleSubMenuEnter(e, item.label)}
                        onMouseLeave={hasSubmenu ? handleSubMenuLeave : undefined}
                        onClick={() => {
                            if (!hasSubmenu) navigate(item.path);
                        }}
                        sx={{ backgroundColor: 'transparent', position: 'relative' }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    height: '2px',
                                    width: isActive ? '100%' : '0%',
                                    backgroundColor: colour.black,
                                    transition: 'width 0.3s ease-in-out',
                                },
                                '&:hover::after': {
                                    width: '100%',
                                },
                            }}
                            ref={hasSubmenu ? setSubAnchorEl : undefined}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 0.5,
                                    fontWeight: isActive ? 600 : 400,
                                    fontFamily: '"Fredoka", sans-serif',
                                    color: 'black',
                                    fontSize: '0.95rem',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    </ButtonBoxStyle>
                );
            })}

            <Popper
                open={subMenuOpen}
                anchorEl={subAnchorEl}
                placement="bottom-start"
                disablePortal
                modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
            >
                <Paper
                    onMouseEnter={handleSubPopperEnter}
                    onMouseLeave={handleSubPopperLeave}
                    elevation={3}
                    sx={{
                        mt: 1,
                        borderRadius: 2,
                        backgroundColor: colour.white,
                        minWidth: 160,
                        zIndex: 1300,
                    }}
                >
                    {activeSubItems.map((sub) => (
                        <MenuItem
                            key={sub.path}
                            onClick={() => handleSubMenuItemClick(sub.path)}
                            sx={{ px: 2, py: 1 }}
                        >
                            {sub.label}
                        </MenuItem>
                    ))}
                </Paper>
            </Popper>
        </StackColour>
    );
};

export default HorizontalMenu;
