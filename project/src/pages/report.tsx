import React, { useEffect } from 'react';
import { Box, IconButton, Typography, Collapse, Stack } from '@mui/material';
import {
    CollapseStack, OutletBox, StyledFlexBox, StyledSpaceBox
} from 'css/styles/report_style';
import { CommonCollapseBox, CommonHeaderBox, CommonTypography, ErrorButton } from 'css/style';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomDropDown from 'components/DropDown/dropDowm';
import CustomCheckBox from 'components/CheckedBox/checkedBox';
import { useFormik } from 'formik';
import CustomDatePicker from 'components/Date/date';
import CustomButton from 'components/Button/button';
import { MRT_ColumnDef } from 'material-react-table';
import CustomTable from 'components/MaterialReactTable/materialReactTable';
import dayjs, { Dayjs } from 'dayjs';
import instance from '../axios/axiosinstance';
import { useLoading } from "components/Loader/loadingContext";

interface RMItem {
    item: string;
    item_group: string;
    is_taxable: string;
    is_stockable: string;
    status: string;
}

const data: RMItem[] = [
    { item: "Potato", item_group: "Vegetable", is_taxable: "Yes", is_stockable: "Yes", status: "Active" },
    { item: "Tomato", item_group: "Vegetable", is_taxable: "Yes", is_stockable: "Yes", status: "Active" },
    { item: "Onion", item_group: "Vegetable", is_taxable: "No", is_stockable: "No", status: "Active" },
    { item: "Apple", item_group: "Fruit", is_taxable: "Yes", is_stockable: "Yes", status: "In Active" },
]

const columns: MRT_ColumnDef<RMItem>[] = [
    { accessorKey: 'item', header: 'Item' },
    { accessorKey: 'item_group', header: 'Item Group' },
    { accessorKey: 'is_taxable', header: 'Taxable' },
    { accessorKey: 'is_stockable', header: 'Stockable' },
    { accessorKey: 'status', header: 'Status' }
];

const Report: React.FC = () => {
    const { setLoading } = useLoading();
    const [open, setOpen] = React.useState(false);
    const today = dayjs();
    const [datas, setDatas] = React.useState([]);
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(today);
    const [toDate, setToDate] = React.useState<Dayjs | null>(today);

    const formik = useFormik({
        initialValues: {
            outlet: "",
            order_type: false,
            tax_details: false
        },
        onSubmit: async (values, { resetForm }) => {
            await filterFetch();
            resetForm();
        },
    });

    useEffect(() => {
        const initialFetch = async () => {
            setLoading(true);
            try {
                const response = await instance.post('api/date-report');
                setDatas(response.data)
            } catch (err) {
                console.log("Fetch Date Report Error", err);
            } finally {
                setLoading(false);
            }
        };
        initialFetch();
    }, [setLoading]);


    const filterFetch = async () => {

        const payload = {
            fromDate: fromDate?.format('YYYY-MM-DD'),
            toDate: fromDate?.format('YYYY-MM-DD'),
            outlet: formik.values.outlet
        }
        try {
            const response = await instance.post('api/date-report', payload);
            setDatas(response.data)
        } catch (err) {
            console.log("Fetch Date Report Error", err);
        }
    }

    const handleClose = () => {
        formik.resetForm();
    };

    return (
        <Box>
            <CommonHeaderBox collapseOpen={open}>
                <CommonTypography
                    variant='inherit'
                >
                    Date Base Consolidated Sales
                </CommonTypography>
                <IconButton onClick={() => setOpen(!open)}  >
                    <FilterListIcon />
                </IconButton>
            </CommonHeaderBox>

            <Collapse in={open}>
                <CommonCollapseBox>
                    <StyledSpaceBox >
                        <CollapseStack>
                            <StyledFlexBox>
                                <CustomDatePicker
                                    label='From Date'
                                    value={fromDate}
                                    onChange={setFromDate}
                                />
                                <CustomDatePicker
                                    label='To Date'
                                    value={toDate}
                                    onChange={setToDate}
                                />
                            </StyledFlexBox>

                            <OutletBox>
                                <CustomDropDown
                                    label_name='Outlet'
                                    name='outlet'
                                    id='outlet'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    options={[
                                        { value: "All", label: "All" },
                                        { value: "Madurai", label: "Madurai" }
                                    ]}
                                />
                            </OutletBox>
                            <Box >
                                <Typography variant='subtitle2'>View By</Typography>
                                <CustomCheckBox
                                    options={[
                                        { name: "order_type", label: "OrderType", checked: formik.values.order_type },
                                        { name: "tax_details", label: "Tax Details", checked: formik.values.tax_details },
                                    ]}
                                    onChange={formik.handleChange}
                                    direction='row'
                                    spacing={3}
                                />
                            </Box>
                        </CollapseStack>
                        <Box display='flex' justifyContent='end' >
                            <Stack spacing={2} direction='row'>
                                <CustomButton
                                    label='Apply'
                                    variant='contained'
                                    onClick={() => formik.handleSubmit}
                                />
                                <CustomButton
                                    label='Clear'
                                    variant='contained'
                                    onClick={handleClose}
                                    Component={ErrorButton}
                                />
                            </Stack>
                        </Box>
                    </StyledSpaceBox>
                </CommonCollapseBox >
            </Collapse >
            <Box marginTop='15px'>
                <CustomTable data={datas} columns={columns} />
            </Box>

        </Box>
    )
};

export default Report;