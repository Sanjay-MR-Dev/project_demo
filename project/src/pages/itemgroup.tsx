import React, { useEffect, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import {
    Box, Modal, Typography, Stack
} from '@mui/material';
import { useFormik } from 'formik';
import *  as yup from 'yup';
import ListIcon from '@mui/icons-material/Add';
import { CommonHeaderBox, CommonModalBox, CommonTypography, DropDownStyle, ErrorButton } from 'css/style';
import CustomTextFields from 'components/TextField/textfield';
import CustomTable from 'components/MaterialReactTable/materialReactTable';
import CustomButton from 'components/Button/button';
import instance from '../axios/axiosinstance';
import { useLoading } from 'components/Loader/loadingContext';

interface RMItem {
    item_group: string;
    status: string;
}

const ItemGroup: React.FC = () => {
    const { setLoading } = useLoading();
    const [open, setOpen] = React.useState<boolean>(false);
    const [tableData, setTableData] = React.useState<RMItem[]>([]);

    const columns: MRT_ColumnDef<RMItem>[] = [
        {Cell:({row})=> row.index +1, header:'#', id:'serial-number'},
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
                const values = response.data?.map((value: any) => ({
                    item_group: value.item_group,
                }));
                setTableData(values);
            } catch (error) {
                console.error("Error Submitting Value", error)
            } finally {
                setLoading(false);
            }
        }
        fetchItem();
    }, []);

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let payload = {
                    item_group: values.item_group,
                }

                let response = await instance.post(`/itemgroup/value`, payload);
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
        <>
            <CommonHeaderBox>
                <CommonTypography
                    variant="inherit">
                    RM Item Group
                </CommonTypography>

                <CustomButton
                    label='Add RM Group'
                    variant="contained"
                    startIcon={<ListIcon />}
                    onClick={() => setOpen(true)}
                />
            </CommonHeaderBox>
            <Box marginTop='15px'>
                <CustomTable columns={columns} data={tableData} />
            </Box>

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

        </>
    );
}
export default ItemGroup;


