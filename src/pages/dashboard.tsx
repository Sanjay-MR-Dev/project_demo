import React from 'react';
import {CustomTable} from 'components/MaterialReactTable/materialReactTable';
import { MRT_ColumnDef } from 'material-react-table';
import { Box } from '@mui/material';

interface user{
    name : string;
    status : string;
} 

const data : user[] = [
    {name:"sanjay", status : "pass"},
    {name:"logan", status : "pass"},
]

const columns : MRT_ColumnDef<user>[] = [
    {accessorKey: 'name', header : "Name"},
    {accessorKey: 'status', header : "Status"}      
]

const Dashboard: React.FC = () => {  
    return(
        <Box data-testid = "dashboard-container">
            <CustomTable<user> columns={columns} data={data}/>
        </Box>
        
    )};

export default Dashboard;