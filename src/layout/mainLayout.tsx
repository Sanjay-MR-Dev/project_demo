
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import AppBars from 'components/AppBar/appBar';
import Drawers from 'components/Drawer/drawer';
import { DrawerLayoutStyles, MainLayoutStyles } from 'css/style';
import useSessionTimeout from 'hooks/useSessionTimeout';


const MainLayout: React.FC = () => {
  useSessionTimeout();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width:1450px)');

  const handleAppBarMenuClick = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleDrawerClose = (): void => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBars
        onMenuClick={handleAppBarMenuClick}
        drawerOpen={drawerOpen}
      />

      {isMobile && (
        <DrawerLayoutStyles
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}

        >
          <Drawers
            collapsed={false}
            isMobile={isMobile}
            onCloseDrawer={handleDrawerClose}
          />
        </DrawerLayoutStyles>
      )}

      <MainLayoutStyles>
        <Outlet />
      </MainLayoutStyles>
    </>
  );
};

export default MainLayout;