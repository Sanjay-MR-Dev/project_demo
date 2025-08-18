import React from "react"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ViewListIcon from '@mui/icons-material/ViewList';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface itemsProps {
    id : string;
    label: string;
    path: string;
    icon?: React.ReactElement;
    
}

 export const menuItems: itemsProps[] = [
        {id :'menu-dashboard', label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        {id :'menu-jobworkorder', label: 'Job Work Order', path: '/job-work-order', icon: <DashboardIcon /> },
        {id :'menu-master', label: 'Master', path: '/master', icon: <ViewListIcon /> },
        {id :'menu-inventorymaster', label: 'Inventory Master', path: '/inventory_master', icon: <WarehouseIcon /> },
        {id :'menu-inventory', label: 'Inventory', path: '/inventory', icon: <DescriptionIcon /> },
        {id :'menu-receipe', label: 'Receipe', path: '/receipe', icon: <BreakfastDiningIcon /> },
        {id :'menu-stockreport', label: 'Stock Report', path: '/stock_report', icon: <AutoStoriesIcon /> },
        {id :'menu-report', label: 'Report', path: '/report', icon: <AssessmentIcon /> },
    ];