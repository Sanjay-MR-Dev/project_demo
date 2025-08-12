import React, { useEffect } from "react";
import {
    Box, TextField, Typography, Table,
    TableHead, TableRow, IconButton, Paper,
    Stack
} from "@mui/material";
import colour from "css/colourFile";
import CustomDropDown from "components/DropDown/dropDowm";
import { useFormik } from "formik";
//import * as yup from "yup";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CustomButton from "components/Button/button";
import {
    ContinueButton, SaveButton, uniformButton, CloseButton, RemarksInputField, HeaderBox, DropDownBox,
    ButtonBox, EndButtonBox, StitchingRightTableBox, StitchingLeftTableBox, InsideTableBox,
    CenterBodyTableCell, LeftBodyTableCell, RightBodyTableCell, SnoHeaderTableCell,
    SizeHeaderTableCell, RateHeaderTableCell, AmountHeaderTableCell, QtyHeaderTableCell,
    TotalAmountHeaderTableCell, TotalMeterHeaderTableCell, FabricHeaderTableCell, SNoHeaderTableCell, AmountBottomTableCell,
    MeterBottomTableCell, TotalBottomTableCell, CommonThirdTableCell, CommonSecondTableCell, CommonFirstTableCell,
    FinalBodyTableCell, TableRowBackground, TableCellBorder, ValueBox, FirstRowTableBox, UniformBox, FirstTableInsideBox,
    UniformTypography, DropDownBoxs, FirstTableOutsideBox, TableBodyStyle, QtyBottomTableBox, AmountBottomTableBox,
    TotalBottomTableBox, SecondTableInsideBox, SecondTableOutsideBox, SecondRowTableBox, RemarksDateBox, RemarksBox, DateBox, TableContainerStyle,
    BothSecondTableBox, BothFirstTableBox,
} from "css/styles/jobWorkOrder_style";
import instance from "../axios/axiosinstance";
import CustomTextFields from "components/TextField/textfield";
import CustomDatePicker from "components/Date/date";
import dayjs, { Dayjs } from "dayjs";
/*
interface SchoolName {
    value: string;
    label: string;
}
interface TailorName {
    value: string;
    label: string;
}*/

interface StitchingRow {
    sno: number;
    size: number;
    qty: number;
    rate: number;
    amount: number;
}

interface FabricRow {
    sno: number;
    fabric: string;
    total_meters: number;
    total_amount: number;
}

interface StitchingRate {
    sno: number;
    uniform: string;
    rate: number;
}

interface StitchingFabric {
    sno: number;
    fabric: string;
    amount: number;
}

const initialData: StitchingRow[] = [
    { sno: 1, size: 24, qty: 0, rate: 120, amount: 0 },
    { sno: 2, size: 26, qty: 0, rate: 150, amount: 0 },
    { sno: 3, size: 27, qty: 0, rate: 160, amount: 0 },
    { sno: 4, size: 30, qty: 0, rate: 170, amount: 0 },
    { sno: 5, size: 32, qty: 0, rate: 180, amount: 0 },
]

const fabricInitialData: FabricRow[] = [
    { sno: 1, fabric: "Cotton", total_meters: 24, total_amount: 120 },
    { sno: 2, fabric: "Linen", total_meters: 24, total_amount: 120 },
]

const stitchingRateDetails: StitchingRate[] = [
    { sno: 1, uniform: "Academic Wear", rate: 930 },
    { sno: 2, uniform: "BrightPath Uniforms", rate: 930 },
]

const stitchingFabricDetails: StitchingFabric[] = [
    { sno: 1, fabric: "Cotton", amount: 240 },
    { sno: 2, fabric: "Linen", amount: 240 },
]


const UniformMaster: React.FC = () => {
    //const [schoolName, setSchoolName] = React.useState<SchoolName[]>([]);
    //const [tailorName, setTailorName] = React.useState<TailorName[]>([]);
    //const [open, setOpen] = React.useState<boolean>(false);
    //const [jobOrder, setJobOrder] = React.useState({ number: "", date: "" });
    const [stitchingData, setStitchingData] = React.useState<StitchingRow[]>(initialData);
    const [fabricData] = React.useState<FabricRow[]>(fabricInitialData);
    //const [stitchingRate, setStitchingRate] = React.useState<StitchingRate[]>(stitchingRateDetails);
    //const [stitchingFabric, setStitchingFabric] = React.useState<StitchingFabric[]>(stitchingFabricDetails);
    const today = dayjs();
    const [todate, setTodate] = React.useState<Dayjs | null>(today);

    const initialValue = {

    };
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (Values, { resetForm }) => {
            resetForm();
        }

    });

    const handleQtyChange = (id: number, value: string) => {
        const qty = Number(value) || 0;
        setStitchingData((Rows) =>
            Rows.map((row) =>
                row.sno === id
                    ? { ...row, qty, amount: qty * row.rate }
                    : row
            )
        );
    };

    const totalQty = stitchingData.reduce((sum, row) => sum + row.qty, 0);
    const totalAmount = stitchingData.reduce((sum, row) => sum + row.amount, 0);

    /*const formatDate = (dateString: string | number | Date) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString("en-GB");
    };*/

    useEffect(() => {
        const fetchJoborder = async () => {
            try {
                const response = await instance.post("");
                if (response.data) {
                    /*setJobOrder({
                        number: response.data.job_order_no,
                        date: formatDate(response.data.date)
                    });*/
                }
            }
            catch (error) {
                console.error("Error Fetching Job Order", error)
            }
        }
        fetchJoborder();
    }, []);

    return (
        <Box>
            <HeaderBox>
                <Typography variant="h5" fontWeight='bold'>Job Work Order</Typography>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" fontWeight='bold'>Job Order No.: 1 </Typography>
                    <Typography variant="h4" fontWeight='bold' alignItems="right">09/08/2025</Typography>
                </Box>
            </HeaderBox>
            <ValueBox>
                <DropDownBox>
                    <CustomDropDown
                        name="school_name"
                        id="school_name"
                        label_name="School Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        size="medium"
                        options={[
                            { label: "Kvs", value: "kvs" },
                            { label: "Sakthi", value: "sakthi" }
                        ]}
                    />
                </DropDownBox>

                <DropDownBox>
                    <CustomDropDown
                        name="tailor_name"
                        id="tailor_name"
                        label_name="Tailor Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        size="medium"
                        options={[
                            { label: "Sanjay", value: "sanjay" },
                            { label: "Logesh", value: "logesh" }
                        ]}
                    />
                </DropDownBox>

                <ButtonBox>
                    <IconButton sx={{ color: colour.primary }}>
                        <MapsUgcIcon fontSize="large" />
                    </IconButton>
                    <CustomButton
                        label="Add Uniforms"
                        variant="contained"
                        //onClick={() => setOpen(true)}
                        Component={uniformButton}
                    />
                </ButtonBox>
            </ValueBox>

            <FirstRowTableBox>
                <UniformBox>
                    <UniformTypography
                        variant="body1"
                    >
                        Uniform<span style={{ color: 'red' }}>*</span>
                    </UniformTypography>
                    <DropDownBoxs>
                        <CustomDropDown
                            name="uniform"
                            id="uniform"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            size="medium"
                            fullWidth
                            options={[
                                { label: "Academic Wear", value: "academic_wear" },
                                { label: "Sports Wear", value: "sports_wear" }
                            ]}
                        />
                    </DropDownBoxs>
                </UniformBox>
                <BothFirstTableBox>
                    <FirstTableOutsideBox>
                        <FirstTableInsideBox>
                            <AssignmentIcon sx={{ mr: 1, color: colour.iconColour }} />
                            <Typography variant="h4" fontWeight="bold">
                                Size Details
                            </Typography>
                        </FirstTableInsideBox>
                        <TableContainerStyle component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRowBackground>
                                        <SnoHeaderTableCell>S.No.</SnoHeaderTableCell>
                                        <SizeHeaderTableCell>
                                            Size
                                        </SizeHeaderTableCell>
                                        <QtyHeaderTableCell>
                                            Qty
                                        </QtyHeaderTableCell>
                                        <RateHeaderTableCell>
                                            Stitchig Rate
                                        </RateHeaderTableCell>
                                        <AmountHeaderTableCell>
                                            Amount
                                        </AmountHeaderTableCell>
                                    </TableRowBackground>
                                </TableHead>

                                <TableBodyStyle>
                                    {stitchingData.map((row) => (
                                        <TableRow key={row.sno}>
                                            <CenterBodyTableCell>
                                                {row.sno}
                                            </CenterBodyTableCell>
                                            <CenterBodyTableCell>
                                                {row.size}
                                            </CenterBodyTableCell>
                                            <CenterBodyTableCell>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={row.qty || ""}
                                                    onChange={(e) => handleQtyChange(row.sno, e.target.value)}
                                                    inputProps={{
                                                        min: 0,
                                                        max: 100,
                                                        style: { textAlign: "center", padding: "2px", },
                                                    }}
                                                    sx={{
                                                        borderRadius: '8px',
                                                        "& .MuiInputBase-root": {
                                                            padding: '12px 32px',
                                                            height: "35px",
                                                        },
                                                        "& input": {
                                                            fontSize: "16px",
                                                            fontFamily: '"Outfit", sans-serif',
                                                        },
                                                    }}
                                                />
                                            </CenterBodyTableCell>
                                            <RightBodyTableCell>
                                                {row.rate}
                                            </RightBodyTableCell>
                                            <RightBodyTableCell>
                                                {row.amount}
                                            </RightBodyTableCell>
                                        </TableRow>
                                    ))}


                                    <TableRowBackground>
                                        <TableCellBorder></TableCellBorder>
                                        <TotalBottomTableBox
                                            colSpan={1}>
                                            <strong>Total</strong>
                                        </TotalBottomTableBox>
                                        <QtyBottomTableBox>
                                            <strong>{totalQty}</strong>
                                        </QtyBottomTableBox>
                                        <TableCellBorder></TableCellBorder>
                                        <AmountBottomTableBox>
                                            <strong>{totalAmount}</strong>
                                        </AmountBottomTableBox>
                                    </TableRowBackground>
                                </TableBodyStyle>
                            </Table>
                        </TableContainerStyle>
                    </FirstTableOutsideBox>

                    <SecondTableOutsideBox>
                        <SecondTableInsideBox>
                            <ListAltIcon sx={{ mr: 1, color: colour.iconColour }} />
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                Fabric Details
                            </Typography>
                        </SecondTableInsideBox>

                        <TableContainerStyle
                            component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRowBackground>
                                        <SNoHeaderTableCell
                                        >S.No.</SNoHeaderTableCell>
                                        <FabricHeaderTableCell
                                        >Fabric</FabricHeaderTableCell>
                                        <TotalMeterHeaderTableCell
                                        >Total Meters</TotalMeterHeaderTableCell>
                                        <TotalAmountHeaderTableCell
                                        >Total Amount</TotalAmountHeaderTableCell>
                                    </TableRowBackground>
                                </TableHead>

                                <TableBodyStyle>
                                    {fabricData.map((row) => (
                                        <TableRow key={row.sno}>
                                            <CenterBodyTableCell>{row.sno}</CenterBodyTableCell>
                                            <LeftBodyTableCell >{row.fabric}</LeftBodyTableCell>
                                            <RightBodyTableCell >{row.total_meters}</RightBodyTableCell>
                                            <RightBodyTableCell>
                                                {row.total_amount}
                                            </RightBodyTableCell>
                                        </TableRow>
                                    ))}


                                    <TableRowBackground>
                                        <TableCellBorder></TableCellBorder>
                                        <TotalBottomTableCell
                                            colSpan={1}
                                        >
                                            <strong>Total</strong>
                                        </TotalBottomTableCell>
                                        <MeterBottomTableCell
                                        >
                                            <strong>{fabricData.reduce((sum, row) => sum + row.total_meters, 0)}</strong>
                                        </MeterBottomTableCell>
                                        <AmountBottomTableCell
                                        >
                                            <strong>{fabricData.reduce((sum, row) => sum + row.total_amount, 0)}</strong>
                                        </AmountBottomTableCell>
                                    </TableRowBackground>
                                </TableBodyStyle>
                            </Table>
                        </TableContainerStyle>
                    </SecondTableOutsideBox>
                </BothFirstTableBox>
            </FirstRowTableBox>

            <SecondRowTableBox>
                <BothSecondTableBox>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <StitchingLeftTableBox>
                            <FirstTableInsideBox>
                                <AssignmentIcon sx={{ mr: 1, color: colour.iconColour }} />
                                <Typography variant="h4" fontWeight="bold">
                                    Stitching Rate Details
                                </Typography>
                            </FirstTableInsideBox>

                            <TableContainerStyle
                                component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRowBackground>
                                            <CommonFirstTableCell >S.No.</CommonFirstTableCell>
                                            <CommonSecondTableCell >Uniform</CommonSecondTableCell>
                                            <CommonThirdTableCell >Rate</CommonThirdTableCell>
                                        </TableRowBackground>
                                    </TableHead>
                                    <TableBodyStyle>
                                        {stitchingRateDetails.map((row) => (
                                            <TableRow key={row.sno}>
                                                <CenterBodyTableCell>
                                                    {row.sno}
                                                </CenterBodyTableCell>
                                                <LeftBodyTableCell>
                                                    {row.uniform}
                                                </LeftBodyTableCell>
                                                <RightBodyTableCell>
                                                    {row.rate}
                                                </RightBodyTableCell>
                                            </TableRow>
                                        ))}
                                        <TableRowBackground>
                                            <TableCellBorder></TableCellBorder>
                                            <TotalBottomTableCell
                                                colSpan={1}>
                                                <strong>Total</strong>
                                            </TotalBottomTableCell>
                                            <AmountBottomTableBox>
                                                <InsideTableBox
                                                ><strong>{stitchingRateDetails.reduce((sum, row) => sum + row.rate, 0)}</strong></InsideTableBox>
                                            </AmountBottomTableBox>
                                        </TableRowBackground>
                                    </TableBodyStyle>
                                </Table>
                            </TableContainerStyle>
                        </StitchingLeftTableBox>
                    </Box>


                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <StitchingRightTableBox>
                            <SecondTableInsideBox>
                                <ListAltIcon sx={{ mr: 1, color: colour.iconColour }} />
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    Stitching Fabric Details
                                </Typography>
                            </SecondTableInsideBox>

                            <TableContainerStyle
                                component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRowBackground>
                                            <CommonFirstTableCell >S.No.</CommonFirstTableCell>
                                            <CommonSecondTableCell >Fabric</CommonSecondTableCell>
                                            <CommonThirdTableCell>Amount</CommonThirdTableCell>
                                        </TableRowBackground>
                                    </TableHead>
                                    <TableBodyStyle>
                                        {stitchingFabricDetails.map((row) => (
                                            <TableRow key={row.sno}>
                                                <CenterBodyTableCell>
                                                    {row.sno}
                                                </CenterBodyTableCell>
                                                <LeftBodyTableCell>
                                                    {row.fabric}
                                                </LeftBodyTableCell>
                                                <FinalBodyTableCell>
                                                    {row.amount}
                                                </FinalBodyTableCell>
                                            </TableRow>
                                        ))}
                                        <TableRowBackground>
                                            <TableCellBorder></TableCellBorder>
                                            <TotalBottomTableCell
                                                colSpan={1}>
                                                <strong>Total</strong>
                                            </TotalBottomTableCell>
                                            <AmountBottomTableCell
                                            >
                                                <InsideTableBox>
                                                    <strong>{stitchingFabricDetails.reduce((sum, row) => sum + row.amount, 0)}</strong></InsideTableBox>

                                            </AmountBottomTableCell>
                                        </TableRowBackground>
                                    </TableBodyStyle>
                                </Table>
                            </TableContainerStyle>
                        </StitchingRightTableBox>
                    </Box>
                </BothSecondTableBox>

                <RemarksDateBox
                >
                    <RemarksBox>
                        <CustomTextFields
                            name="remarks"
                            id="remarks"
                            label_name="Remarks"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            multiline
                            rows={3}
                            size="small"
                            Component={RemarksInputField}

                        />
                    </RemarksBox>

                    <DateBox>
                        <CustomDatePicker
                            label="Due Date"
                            value={todate}
                            onChange={setTodate}
                        />
                    </DateBox>
                </RemarksDateBox>
            </SecondRowTableBox>

            <EndButtonBox>
                <Stack spacing={2} direction='row'>
                    <CustomButton
                        label="Close"
                        variant="contained"
                        onClick={() => formik.handleSubmit}
                        Component={CloseButton} />
                    <CustomButton
                        label="Save"
                        variant="contained"
                        onClick={() => formik.handleSubmit}
                        Component={SaveButton} />
                    <CustomButton
                        label="Save & Continue"
                        variant="contained"
                        onClick={() => formik.handleSubmit}
                        Component={ContinueButton} />

                </Stack>
            </EndButtonBox>
        </Box>
    )
}

export default UniformMaster