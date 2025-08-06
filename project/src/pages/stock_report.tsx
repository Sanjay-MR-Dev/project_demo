import CustomTable from 'components/MaterialReactTable/materialReactTable';
import {
    CollapseStack,SrDropDown, StyledSpaceBox, ViewByContainer,
    ViewByCheckGroup, ViewByButtonGroup
} from 'css/styles/stock_report_style';
import { CommonCollapseBox, CommonHeaderBox, CommonTypography,ErrorButton } from 'css/style';
import { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect } from 'react';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomDatePicker from 'components/Date/date';
import dayjs, { Dayjs } from 'dayjs';
import CustomDropDown from 'components/DropDown/dropDowm';
import { useFormik } from 'formik';
import CustomCheckBox from 'components/CheckedBox/checkedBox';
import CustomButton from 'components/Button/button';
import instance from '../axios/axiosinstance';


interface StockItems {
    item_code: string,
    item_name: string,
    op: string,
    purchase: string,
    outward: string,
    adjustment_increase: string,
    adjustment_decrease: string,
    closing: string,
    purchase_rate: string,
    stock_value: string,
};

const columns: MRT_ColumnDef<StockItems>[] = [
    { accessorKey: "item_code", header: "Item Code" },
    { accessorKey: "item_name", header: "Item Name" },
    { accessorKey: "op", header: "OP" },
    { accessorKey: "purchase", header: "Purchase" },
    { accessorKey: "outward", header: "Outward" },
    { accessorKey: "adjustment_increase", header: "Increase" },
    { accessorKey: "adjustment_decrease", header: "Decrease" },
    { accessorKey: "closing", header: "Closing" },
    { accessorKey: "purchase_rate", header: "Purchase Rate" },
    { accessorKey: "stock_value", header: "Stock Value" },
];

const dataa: StockItems[] = [
    {
        item_code: "",
        item_name: "stock 1",
        op: "100kgs",
        purchase: "-",
        outward: "-",
        adjustment_increase: "-",
        adjustment_decrease: "-",
        closing: "100kgs",
        purchase_rate: "300",
        stock_value: "30000",
    },
    {
        item_code: "",
        item_name: "stock 2",
        op: "100kgs",
        purchase: "-",
        outward: "-",
        adjustment_increase: "-",
        adjustment_decrease: "-",
        closing: "100kgs",
        purchase_rate: "300",
        stock_value: "30000",
    },
    {
        item_code: "",
        item_name: "stock 3",
        op: "100kgs",
        purchase: "-",
        outward: "-",
        adjustment_increase: "-",
        adjustment_decrease: "-",
        closing: "100kgs",
        purchase_rate: "300",
        stock_value: "30000",
    },
]

const Stockreport: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const today = dayjs();
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(today);



    const formik = useFormik({
        initialValues: {
            item_group: "",
            item_name: "",
            location_name: "",
            op: false,
            purchase: false,
            outward: false,
            adjustment_increase: false,
            adjustment_decrease: false,
            purchase_rate: false,
            stock_value: false,
        },
        onSubmit: async (values, { resetForm }) => {
            await filterFetch();
            resetForm();
        }
    });
    useEffect(() => {
        const initialFetch = async () => {
            try {
                const response = await instance.get('/api/stock-report');
                setData(response.data);
            }
            catch (err) {
                console.error("Fetch Error", err);
            }
        };
        initialFetch();
    },[]);

    const filterFetch = async () => {
        const payload = {
            date: fromDate?.format('YYYY-MM-DD'),
            item_group: formik.values.item_group,
            item_name: formik.values.item_name,
            location: formik.values.location_name,
        }
        try {
            const response = await instance.post('/api/stock-report', payload);
            setData(response.data)
        } catch (err) {
            console.error("Fetch Error", err);
        }
    }

    const handleClose = () => {
        formik.resetForm();
    }

    const dynamicColumns = columns.filter((col) => {
        if (
            col.accessorKey === 'item_code' ||
            col.accessorKey === 'item_name' ||
            col.accessorKey === 'closing'
        ) {
            return true
        }
        if (col.accessorKey === 'op' && formik.values.op) return true;
        if (col.accessorKey === 'purchase' && formik.values.purchase) return true;
        if (col.accessorKey === 'outward' && formik.values.outward) return true;
        if (col.accessorKey === 'adjustment_increase' && formik.values.adjustment_increase) return true;
        if (col.accessorKey === 'adjustment_decrease' && formik.values.adjustment_decrease) return true;
        if (col.accessorKey === 'purchase_rate' && formik.values.purchase_rate) return true;

        return false;
    });

    return (
        <Box>
            <CommonHeaderBox collapseOpen={open}>
                <CommonTypography
                    variant='inherit'>
                    Date Wise Stock Report
                </CommonTypography>
                <IconButton onClick={() => setOpen(!open)} >
                    <FilterListIcon />
                </IconButton>
            </CommonHeaderBox>

            <Collapse in={open}>
                <CommonCollapseBox>
                    <CollapseStack>
                        <StyledSpaceBox>
                            <CustomDatePicker
                                label="Date"
                                value={fromDate}
                                onChange={setFromDate}
                            />
                        </StyledSpaceBox>
                        <SrDropDown>
                            <CustomDropDown
                                name="Item Group"
                                id="item_group"
                                label_name='Item Group'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                options={[
                                    { value: "All", label: "All" }
                                ]}
                            />
                        </SrDropDown>
                        <SrDropDown>
                            <CustomDropDown
                                name="Item Name"
                                id="item_name"
                                label_name='Item Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                options={[
                                    { value: "All", label: "All" }
                                ]}
                            />
                        </SrDropDown>
                        <SrDropDown>
                            <CustomDropDown
                                name="Location"
                                id="location"
                                label_name='Location'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                options={[
                                    { value: "All", label: "All" }
                                ]}
                            />
                        </SrDropDown>
                    </CollapseStack>
                    <ViewByContainer>
                        <ViewByCheckGroup>
                            <Typography variant="subtitle2">View By</Typography>
                            <Grid container>
                                {[
                                    { name: "op", label: "OP", checked: formik.values.op },
                                    { name: "purchase", label: "Purchase", checked: formik.values.purchase },
                                    { name: "outward", label: "Outward", checked: formik.values.outward },
                                    { name: "adjustment_increase", label: "Adjustment(+)", checked: formik.values.adjustment_increase },
                                    { name: "adjustment_decrease", label: "Adjustment(-)", checked: formik.values.adjustment_decrease },
                                    { name: "purchase_rate", label: "Purchase Rate", checked: formik.values.purchase_rate },
                                    { name: "stock_value", label: "Stock Value", checked: formik.values.stock_value },
                                ].map((opt) => (
                                    <CustomCheckBox
                                        options={[{
                                            name: opt.name,
                                            label: opt.label,
                                            checked: opt.checked
                                        }]}
                                        onChange={formik.handleChange}
                                        direction="row"
                                    />
                                ))}
                            </Grid>
                        </ViewByCheckGroup>
                        <ViewByButtonGroup>
                            <CustomButton
                                label='Apply'
                                variant='contained'
                                onClick={() => formik.handleSubmit()} />

                            <CustomButton
                                label='Clear'
                                variant='contained'
                                onClick={handleClose}
                                Component={ErrorButton}
                            />

                        </ViewByButtonGroup>
                    </ViewByContainer>
                </CommonCollapseBox >
            </Collapse >

            <Box marginTop='15px'>
                <CustomTable data={dataa} columns={dynamicColumns} />
            </Box>
        </Box >


    )
};

export default Stockreport;