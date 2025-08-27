import React, { useEffect } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import {
    Box, Modal, Typography, Stack,
    IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import *  as yup from 'yup';
import ListIcon from '@mui/icons-material/Add';
import { CommonHeaderBox, CommonModalBox, CommonTypography, ErrorButton } from 'css/style';
import CustomTextFields from 'components/TextField/textfield';
import { CustomTable } from 'components/MaterialReactTable/materialReactTable';
import CustomButton from 'components/Button/button';
import instance from '../axios/axiosinstance';
import { useLoading } from 'components/Loader/loadingContext';
import { Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import colour from 'css/colourFile';

interface RMItem {
    item_group: string;
    status?: string;
}

const ItemGroup: React.FC = () => {
    const { setLoading } = useLoading();
    const [open, setOpen] = React.useState<boolean>(false);
    const [tableData, setTableData] = React.useState<RMItem[]>([]);
    const [openSnackBar, setOpenSnackar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [snackCondition, setSnackCondition] = React.useState<"info" | "success" | "error" | "warning">("info");
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [editRow, setEditRow] = React.useState<RMItem | null>(null);
    const [rowDelete, setRowDelete] = React.useState<RMItem | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);


    const columns: MRT_ColumnDef<RMItem>[] = [
        { Cell: ({ row }) => row.index + 1, header: '#', id: 'serial-number' },
        {
            accessorKey: 'action', header: 'Action', Cell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        id="editItemGroup"
                        onClick={() => handleEdit(row.original)}
                    >
                        <ModeEditOutlineIcon  sx={{colors : colour.primary , fontSize : 20}}/>
                    </IconButton>
                    <IconButton
                        id="deleteItemGroup"
                        onClick={() => {
                            setRowDelete(row.original);
                            setOpenDeleteModal(true);
                        }}
                    ><DeleteIcon sx={{colors : colour.red , fontSize : 20}}/></IconButton>
                </Stack>
            ),
        },
        { accessorKey: 'item_group', header: 'Item Group' },
        { accessorKey: 'status', header: 'Status' }
    ];

    const initialValue = {
        item_group: "",
        status: "Active"
    }

    const validationSchema = yup.object({
        item_group: yup.string().required("Item Group is Required"),
    });

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await instance.post(`/getitemgroup/value`);
                const values = response.data?.map((value: RMItem) => ({
                    item_group: value.item_group,
                    status: value.status || "Active",
                }));
                setTableData(values);
            } catch (error) {
                console.error("Error Submitting Value", error)
                setSnackCondition("error");
                setSnackBarMessage("Server Unreachable");
                setOpenSnackar(true);
            } finally {
                setLoading(false);
            }
        }
        fetchItem();
    }, [setLoading]);

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (!editMode) {
                    const isDuplicate = tableData.some((item) =>
                        item.item_group.toLowerCase() === values.item_group.toLowerCase()
                    );

                    if (isDuplicate) {
                        setSnackCondition("error");
                        setSnackBarMessage("Name Already Exists");
                        setOpenSnackar(true);
                        return;
                    }
                }

                let payload = {
                    item_group: values.item_group,
                }

                if (editMode && editRow) {
                    await instance.put(`/updateitemgroup/updatevalue`, { item_group: values.item_group, olditem: editRow.item_group });
                    setTableData((prev) =>
                        prev.map((row) =>
                            row.item_group === editRow.item_group ? { ...row, ...payload } : row
                        )
                    );
                    setSnackCondition("success");
                    setSnackBarMessage("Updated Successfully");

                } else {
                    let response = await instance.post(`/itemgroup/value`, payload);
                    if (response.data?.[0]) {
                        setTableData(prev => [response.data[0], ...prev]);
                    }
                    setSnackCondition("success");
                    setSnackBarMessage("Saved Successfully");
                }

                setOpenSnackar(true);
                resetForm();
                setOpen(false);
                setEditMode(false);
                setEditRow(null);

            } catch (err) {
                console.error("Error Submitting Value", err);
                setSnackCondition("error");
                setSnackBarMessage("Error");
                setOpenSnackar(true);
            }
        }
    });

    const handleEdit = (row: RMItem) => {
        setEditMode(true);
        setEditRow(row);
        formik.setValues({
            item_group: row.item_group,
            status: row.status || "Active",
        });
        setOpen(true);
    };

    const handleDelete = async () => {
        if (rowDelete) {
            try {
                await instance.delete(`/deleteitemgroup/delete`, { data:{item_group: rowDelete.item_group }});
                setTableData((prev) =>
                    prev.filter((row) => row.item_group !== rowDelete.item_group)
                );
                setSnackCondition("success");
                setSnackBarMessage("Deleted Successfully");
                setOpenSnackar(true);
            } catch (err) {
                setSnackCondition("error");
                setSnackBarMessage("Error while deleting");
                setOpenSnackar(true);
                console.log("Error in delete",err);
            }
        }
        setOpenDeleteModal(false);
        setRowDelete(null);
    };

    const handleClose = () => {
        formik.resetForm();
        setOpen(false);
    }

    const snackBarClose = () => {
        setOpenSnackar(false);
    }

    return (
        <>
            <CommonHeaderBox>
                <CommonTypography
                    variant="inherit">
                    RM Item Group
                </CommonTypography>

                <CustomButton
                    id='AddRmGroup'
                    label='Add RM Group'
                    variant="contained"
                    startIcon={<ListIcon />}
                    onClick={() => setOpen(true)}
                />
            </CommonHeaderBox>
            <Box marginTop='15px'>
                <CustomTable<RMItem> columns={columns} data={tableData} />
            </Box>

            <Snackbar
                open={openSnackBar}
                onClose={snackBarClose}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleClose} severity={snackCondition} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Modal open={open} onClose={() => setOpen(false)}>
                <CommonModalBox>
                    <Stack spacing={2}>
                        <Typography variant='h6' fontWeight='bold'>
                            Add RM Group
                        </Typography>

                        <CustomTextFields
                            name="item_group"
                            id="item_group"
                            label_name='Item Group'
                            value={formik.values.item_group}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.item_group && Boolean(formik.errors.item_group)}
                            fullWidth
                        />

                        <Stack spacing={2} direction='row'>
                            <CustomButton
                                id='submit'
                                label='Sumbit'
                                variant='contained'
                                onClick={() => formik.handleSubmit()}
                            />
                            <CustomButton
                                label='Close'
                                variant='contained'
                                onClick={handleClose}
                                Component={ErrorButton}
                            />
                        </Stack>
                    </Stack>
                </CommonModalBox>
            </Modal>

            <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <CommonModalBox>
                    <Stack spacing={2} >
                        <Typography variant="h6" fontWeight="bold" alignItems='center' >
                            Are You Sure?
                        </Typography>
                        <Typography variant='subtitle1'>
                            Do you really want to delete the RM Item Group ? This process cannot be undone?
                        </Typography>

                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 8 }}>
                            <CustomButton
                                id='cancel'
                                label="Cancel"
                                variant="contained"
                                onClick={() => setOpenDeleteModal(false)}
                                Component={ErrorButton}
                            />
                            <CustomButton
                                id='delete'
                                label="Delete"
                                variant="contained"
                                onClick={handleDelete}
                            />
                        </Stack>
                    </Stack>
                </CommonModalBox>
            </Modal>

        </>
    );
}
export default ItemGroup;


