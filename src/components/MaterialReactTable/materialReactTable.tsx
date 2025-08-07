import React, { JSX } from 'react';
import { MaterialReactTable, MaterialReactTableProps, MRT_ColumnDef } from 'material-react-table';
import colour from 'css/colourFile';


interface CustomMRTProps<T extends object> {
    columns: MRT_ColumnDef<T>[];
    data: T[];
    options?: Partial<MaterialReactTableProps<T>>
}

export function CustomTable<T extends object>({
    columns,
    data,
    ...options
}: CustomMRTProps<T>): JSX.Element {
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

