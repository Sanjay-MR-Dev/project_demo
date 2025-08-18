import React, { useEffect } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import {
    Box, Modal, Typography, Stack
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


    const columns: MRT_ColumnDef<RMItem>[] = [
        { Cell: ({ row }) => row.index + 1, header: '#', id: 'serial-number' },
        { accessorKey: 'item', header: 'Item' },
        { accessorKey: 'item_group', header: 'Item Group' },
        { accessorKey: 'is_taxable', header: 'Taxable' },
        { accessorKey: 'is_stockable', header: 'Stockable' },
        { accessorKey: 'status', header: 'Status' }
    ];

    const initialValue = {
        item: "",
        name: "",
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
        onSubmit: async (values, { resetForm }) => {
            try {
                let payload = {
                    item: values.item,
                    item_group: values.item_group,
                    is_taxable: values.is_taxable ? "Yes" : "No",
                    is_stockable: values.is_stockable ? "Yes" : "No",
                    status: values.status === 'active' ? "Active" : "Inactive"
                }

                let response = await instance.post(`/itemmaster/AllItemGroupList`, payload);
                if (response.data?.[0]) {
                    setTableData(prev => [response.data[0], ...prev]);
                }
                console.log("Submit Value", response.data);
                resetForm();
                setOpen(false);

            } catch (err) {
                console.error("Error Submitting Value", err)
            }
            resetForm();
            setOpen(false);
        }
    });

    const handleClose = () => {
        formik.resetForm();
        setOpen(false);
    }

    return (
        <Box data-testid = "file-container">
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
                                id= 'submit'
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

        </Box>
    );
}
export default MyFile;


