import * as React from 'react';
import {Typography, MenuItem, Popper} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { submenuMap } from 'components/SubMenuItems/subMenuItems';
import { menuItems } from 'components/MenuItems/menuItems';
import {
     StackColour, ButtonBoxStyle,
    PaperStyle, ActiveSubitemStyle, HoverStyle, PaperWidth
} from 'css/style';



const HorizontalMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [subMenuOpen, setSubMenuOpen] = React.useState(false);
    const [subAnchorEl, setSubAnchorEl] = React.useState<null | HTMLElement>(null);
    const [activeSubItems, setActiveSubItems] = React.useState<{ label: string; path: string }[]>([]);
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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
        <StackColour spacing={1} direction='row' >
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
                    >
                        <HoverStyle

                            ref={hasSubmenu ? setSubAnchorEl : undefined}
                        >
                            <Typography
                                variant="caption"
                                component={PaperWidth}
                            >
                                {item.label}
                            </Typography>
                        </HoverStyle>
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
                <PaperStyle
                    onMouseEnter={handleSubPopperEnter}
                    onMouseLeave={handleSubPopperLeave}
                    elevation={3}
                >
                    {activeSubItems.map((sub) => (
                        <MenuItem
                            key={sub.path}
                            onClick={() => handleSubMenuItemClick(sub.path)}
                            component ={ActiveSubitemStyle}
                        >
                            {sub.label}
                        </MenuItem>
                    ))}
                </PaperStyle>
            </Popper>
        </StackColour>
    );
};

export default HorizontalMenu;
