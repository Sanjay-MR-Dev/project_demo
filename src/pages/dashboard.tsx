import React from 'react';
import CustomTable from 'components/MaterialReactTable/materialReactTable';
import { MRT_ColumnDef } from 'material-react-table';

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
        <CustomTable columns={columns} data={data}/>
    )};

export default Dashboard;