import React, { useEffect } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import {
    Box, Modal, Typography, Stack,
    IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import *  as yup from 'yup';
import ListIcon from '@mui/icons-material/Add';
import { CommonHeaderBox, CommonModalBox, CommonTypography, DropDownStyle, ErrorButton } from 'css/style';
import CustomTextFields from 'components/TextField/textfield';
import { CustomTable } from 'components/MaterialReactTable/materialReactTable';
import CustomDropDown from 'components/DropDown/dropDowm';
import CustomRadioGroup from 'components/RadioButton/radioButton'
import CustomCheckBox from 'components/CheckedBox/checkedBox';
import CustomButton from 'components/Button/button';
import instance from '../axios/axiosinstance';
import { useLoading } from 'components/Loader/loadingContext';
import { Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

interface RMItem {
    item: string;
    item_group: string;
    is_taxable: string;
    is_stockable: string;
    status: string;
}

interface ItemGroup {
    item_group: string
}

const MyFile: React.FC = () => {
    const { setLoading } = useLoading();
    const [open, setOpen] = React.useState<boolean>(false);
    const [tableData, setTableData] = React.useState<RMItem[]>([]);
    const [itemGroupOptions, setItemGroupOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openSnackBar, setOpenSnackar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [snackCondition, setSnackCondition] = React.useState<"info" | "success" | "error" | "warning">("info");
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [editRow, setEditRow] = React.useState<RMItem | null>(null);
    const [rowDelete, setRowDelete] = React.useState<RMItem | null>(null);



    const columns: MRT_ColumnDef<RMItem>[] = [
        { Cell: ({ row }) => row.index + 1, header: '#', id: 'serial-number' },
        {
            accessorKey: 'action', header: 'Action', Cell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        id = 'editItemMaster'
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(row.original)}
                    >
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton
                        id="deleteItemMaster"
                        color="error"
                        size="small"
                        onClick={() => {
                            setRowDelete(row.original);
                            setOpenDeleteModal(true);
                        }}
                    ><DeleteIcon /></IconButton>
                </Stack>
            ),
        },
        { accessorKey: 'item', header: 'Item' },
        { accessorKey: 'item_group', header: 'Item Group' },
        { accessorKey: 'is_taxable', header: 'Taxable' },
        { accessorKey: 'is_stockable', header: 'Stockable' },
        { accessorKey: 'status', header: 'Status' },


    ];

    const initialValue = {
        item: "",
        item_group: "",
        is_taxable: false,
        is_stockable: false,
        status: ""
    }

    const validationSchema = yup.object({
        item: yup.string().required("Item Name is Required"),
        item_group: yup.string().required("Item Group is Required"),
        status: yup.string().required("Status is Required"),
    });

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await instance.post(`/getitemmaster/list`);
                const values = (response.data as RMItem[])?.map((value) => ({
                    item: value.item,
                    item_group: value.item_group,
                    is_taxable: value.is_taxable,
                    is_stockable: value.is_stockable,
                    status: value.status
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

        const fetchItemGroups = async () => {
            try {
                const res = await instance.post(`/getitemgroup/value`);
                const options = (res.data)?.map((value: ItemGroup) => ({
                    value: value.item_group,
                    label: value.item_group,
                }));
                setItemGroupOptions(options);
            } catch (err) {
                console.error("Error fetching item groups", err);
            }
        };
        fetchItem();
        fetchItemGroups();
    }, [setLoading]);

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (!editMode) {
                    const isDuplicate = tableData.some((item) =>
                        item.item.toLowerCase() === values.item.toLowerCase()
                    );

                    if (isDuplicate) {
                        setSnackCondition("error");
                        setSnackBarMessage("Name Already Exists");
                        setOpenSnackar(true);
                        return;
                    }
                }

                let payload = {
                    item: values.item,
                    item_group: values.item_group,
                    is_taxable: values.is_taxable ? "Yes" : "No",
                    is_stockable: values.is_stockable ? "Yes" : "No",
                    status: values.status === 'active' ? "Active" : "Inactive"
                }

                if (editMode && editRow) {
                    await instance.put(`/updateitemmaster/updatevalue`, { ...payload, olditem: editRow.item });
                    setTableData((prev) =>
                        prev.map((row) =>
                            row.item === editRow.item ? { ...row, ...payload } : row
                        )
                    );

                    setSnackCondition("success");
                    setSnackBarMessage("Updated Successfully");

                } else {
                    let response = await instance.post(`/itemmaster/AllItemGroupList`, payload);
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
            item: row.item,
            item_group: row.item_group,
            is_taxable: row.is_taxable === "Yes",
            is_stockable: row.is_stockable === "Yes",
            status: row.status.toLowerCase(),
        });
        setOpen(true);
    };


    const handleDelete = async () => {
        if (rowDelete) {
            try {
                await instance.delete(`/deleteitemmaster/delete`, {data:{ item: rowDelete.item }});
                setTableData((prev) =>
                    prev.filter((row) => row.item !== rowDelete.item)
                );
                setSnackCondition("success");
                setSnackBarMessage("Deleted Successfully");
                setOpenSnackar(true);
            } catch (err) {
                setSnackCondition("error");
                setSnackBarMessage("Error while deleting");
                setOpenSnackar(true);
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
        <Box data-testid="file-container">
            <CommonHeaderBox>
                <CommonTypography
                    variant="inherit">
                    RM Item Master
                </CommonTypography>

                <CustomButton
                    id='AddRm-Button'
                    label='Add RM Item'
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
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={snackBarClose} severity={snackCondition} sx={{ width: '200%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Modal open={open} onClose={() => setOpen(false)}>
                <CommonModalBox id='AddRm-Modal'>
                    <Stack spacing={2}>
                        <Typography variant='h6' fontWeight='bold'>
                            Add RM Item
                        </Typography>

                        <CustomTextFields
                            name="item"
                            id="item"
                            label_name="Item"
                            autoComplete="off"
                            value={formik.values.item}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.item && Boolean(formik.errors.item)}
                            fullWidth
                        />

                        <CustomDropDown
                            name="item_group"
                            id="item_group"
                            label_name='Item Group'
                            value={formik.values.item_group}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.item_group && Boolean(formik.errors.item_group)}
                            fullWidth
                            size="medium"
                            Component={DropDownStyle}
                            options={itemGroupOptions}
                        />

                        <CustomCheckBox
                            options={[
                                { name: "is_taxable", label: "Taxable", checked: formik.values.is_taxable },
                                { name: "is_stockable", label: "Stockable", checked: formik.values.is_stockable }
                            ]}
                            onChange={formik.handleChange}
                            direction='row'
                            spacing={3}
                        />

                        <CustomRadioGroup spacing={3} direction='row'
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            label="Status"
                            options={[
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status ? formik.errors.status : ''}
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
                                id = 'cancel'
                                label="Cancel"
                                variant="contained"
                                onClick={() => setOpenDeleteModal(false)}
                                Component={ErrorButton}
                            />
                            <CustomButton
                                id ='delete'
                                label="Delete"
                                variant="contained"
                                onClick={handleDelete}
                            />
                        </Stack>
                    </Stack>
                </CommonModalBox>
            </Modal>


        </Box>
    );
}
export default MyFile;


