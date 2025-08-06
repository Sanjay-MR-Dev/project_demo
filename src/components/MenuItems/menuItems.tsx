import React from "react"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ViewListIcon from '@mui/icons-material/ViewList';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface itemsProps {
    label: string;
    path: string;
    icon?: React.ReactElement;
    
}

 export const menuItems: itemsProps[] = [
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Master', path: '/master', icon: <ViewListIcon /> },
        { label: 'Inventory Master', path: '/inventory_master', icon: <WarehouseIcon /> },
        { label: 'Inventory', path: '/inventory', icon: <DescriptionIcon /> },
        { label: 'Receipe', path: '/receipe', icon: <BreakfastDiningIcon /> },
        { label: 'Stock Report', path: '/stock_report', icon: <AutoStoriesIcon /> },
        { label: 'Report', path: '/report', icon: <AssessmentIcon /> },
    ];