import React from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StoreIcon from '@mui/icons-material/Store';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import PollIcon from '@mui/icons-material/Poll';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InputIcon from '@mui/icons-material/Input';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CategoryIcon from '@mui/icons-material/Category';
import IosShareIcon from '@mui/icons-material/IosShare';
import SetMealIcon from '@mui/icons-material/SetMeal';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ManIcon from '@mui/icons-material/Man';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventBusyIcon from '@mui/icons-material/EventBusy';

interface itemsProps {
    label: string;
    id?: string;
    path: string;
    icon?: React.ReactElement;
};

export const submenuMap: Record<string, itemsProps[]> = {
    Master: [
        { label: 'Company Confirgation', path: '/master/company-conf', icon: <StorefrontIcon /> },
        { label: 'Outlet Confirgation', path: '/master/outlet-conf', icon: <StoreIcon /> },
        { label: 'Item Group', path: '/master/item-group-master', icon: <FoodBankIcon /> },
        { label: 'Item Sub-Group', path: '/master/item-sub-group-master', icon: <KebabDiningIcon /> },
        { label: 'Add-on', path: '/master/item-master', icon: <SoupKitchenIcon /> },
        { label: 'Unit', path: '/master/unit-master', icon: <PollIcon /> },
        { label: 'Item', path: '/master/addon-master', icon: <RamenDiningIcon /> },
        { label: 'Outlet Item Mapping', path: '/master/outlet-item-mapping-master', icon: <MapsHomeWorkIcon /> },
        { label: 'Item Price Change', path: '/master/item-price-change', icon: <PriceChangeIcon /> },
        { label: 'Add-on Price Change', path: '/master/addon-price-change', icon: <PriceChangeIcon /> },
        { label: 'User Role', path: '/master/user-role-master', icon: <PersonAddIcon /> },
        { label: 'User', path: '/master/user-master', icon: <PersonAddIcon /> },
        { label: 'Customer', path: '/master/customer', icon: <GroupIcon /> }
    ],
    "Inventory Master": [
        { id: 'submenu-rmitemgroup', label: 'RM Item Group', path: '/inventory/rm-group-master', icon: <FoodBankIcon /> },
        { id: 'submenu-rmitemsubgroup', label: 'RM Item Sub Group', path: 'inventory/rm-subgroup', icon: <KebabDiningIcon /> },
        { label: 'RM Item Master', path: '/inventory/rm-item-master', icon: <RamenDiningIcon /> },
        { label: 'Location Master', path: '/inventory/location-master', icon: <MyLocationIcon /> },
        { label: 'Department', path: '/inventory/department', icon: <MyLocationIcon /> },
    ],
    Inventory: [
        { label: 'Purchase', path: '/inventory/inventory-list', icon: <ShoppingCartIcon /> },
        { label: 'Stock Outward', path: '/inventory/stock-outward-list', icon: <ArrowOutwardIcon /> },
        { label: 'Stock Adjustment', path: '/inventory/stock-adjustment', icon: <BarChartIcon /> },
        { label: 'Stock Transfer', path: '/inventory/stock-transfer-list', icon: <MoveDownIcon /> },
        { label: 'Material Request', path: '/inventory/material-request-list', icon: <ReceiptIcon /> },
        { label: 'ST Aganist MQ', path: '/inventory/st-aganist-material-request', icon: <InputIcon /> },
        { label: 'Inwards Received', path: '/inventory/inward-received-list', icon: <OpenInBrowserIcon /> },
        { label: 'Inwards Approval', path: '/inventory/inward-received-approval', icon: <DoneOutlineIcon /> },
    ],
    Receipe: [
        { label: 'Recipe Product', path: '/receipe/product', icon: <FoodBankIcon /> },
        { label: 'Receipe Master', path: '/receipe/receipe-master-list', icon: <FoodBankIcon /> },
        { label: 'Product Cost', path: '/receipe/productcost-list', icon: <FoodBankIcon /> },
        { label: 'Production Cost', path: '/receipe/production-cost-list', icon: <FoodBankIcon /> },
        { label: 'Production', path: '/receipe/requirement-list', icon: <MyLocationIcon /> },
        { label: 'Production Utilization', path: '/receipe/production-stock-report', icon: <TroubleshootIcon /> },
    ],
    "Stock Report": [
        { label: 'Date Wise Stock Report', path: '/stock-report/date-wise-stock-report', icon: <CalendarMonthIcon /> },
        { label: 'Item Movement Analysis', path: '/stock-report/item-wise-stock-report', icon: <TroubleshootIcon /> },
    ],
    Report: [
        { label: 'Date Base Consolidated', path: '/report/datebased-consolidated-sales', icon: <EventNoteIcon /> },
        { label: 'Item Based Sales', path: '/report/itemwise-sales-report', icon: <CategoryIcon /> },
        { label: 'Exportable Item Report', path: '/report/itemwise-sales-print', icon: <IosShareIcon /> },
        { label: 'Bill Based Sales', path: '/report/billbased-sales-report', icon: <ReceiptIcon /> },
        { label: 'Meal Based Sales', path: '/report/mealperiod-sales-report', icon: <SetMealIcon /> },
        { label: 'Time Based Sales', path: '/report/timebased-report', icon: <PunchClockIcon /> },
        { label: 'Hourly Item Based Sales ', path: '/report/hourlybased-report', icon: <HourglassBottomIcon /> },
        { label: 'Day Based Sales', path: '/report/daybased-sales-report', icon: <CalendarMonthIcon /> },
        { label: 'Consolidated Sales', path: '/report/consolidate-sales-report', icon: <ReceiptIcon /> },
        { label: 'Deleted Items', path: '/report/deleted-items-report', icon: <DeleteSweepIcon /> },
        { label: 'Waiter Wise', path: '/report/waiterwise-report', icon: <ManIcon /> },
        { label: 'Total Occupancy', path: '/report/total-average-occupancy-report', icon: <TableRestaurantIcon /> },
        { label: 'KOT Analysis', path: '/report/kot-analysis-timetaken-report', icon: <RamenDiningIcon /> },
        { label: 'Expenses', path: '/report/expense-report', icon: <LocalOfferIcon /> },
        { label: 'Day Close', path: '/report/dayclose-report', icon: <EventBusyIcon /> }
    ]
};