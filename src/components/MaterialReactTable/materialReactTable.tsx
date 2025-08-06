import React from 'react';
import { MaterialReactTable, MaterialReactTableProps, MRT_ColumnDef } from 'material-react-table';
import colour from 'css/colourFile';


interface CustomMRTProps<T extends Record<string, any>> {
    columns: MRT_ColumnDef<T>[];
    data: T[];
    options?: Partial<MaterialReactTableProps<T>>
}

const CustomTable = <T extends Record<string, any>>({
    columns, data, ...options
}: CustomMRTProps<T>) => {
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableColumnActions={false}
            enableHiding={false}
            muiTableHeadCellProps={{
                sx: {
                    backgroundColor: colour.lightGrey,
                    color: colour.black,
                    fontFamily: '"Fredoka", sans-serif'

                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    backgroundColor: colour.white,
                    fontFamily: '"Fredoka", sans-serif'
                }
            }}
            muiTopToolbarProps={{
                sx: {
                    backgroundColor: colour.white,
                },
            }}
            muiBottomToolbarProps={{
                sx: {
                    backgroundColor: colour.white,
                },
            }}

            {...options}
        />
    )
}

export default CustomTable;
