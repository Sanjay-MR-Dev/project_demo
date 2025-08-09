import React, { useEffect, useMemo } from "react";
import {
    Box, TextField, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, IconButton, Paper,
    Stack
} from "@mui/material";
import colour from "css/colourFile";
import CustomDropDown from "components/DropDown/dropDowm";
import { useFormik } from "formik";
import * as yup from "yup";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CustomButton from "components/Button/button";
import { ContinueButton, SaveButton, uniformButton, CloseButton, RemarksInputField, HeaderBox, DropDownBox, ButtonBox } from "css/styles/jobWorkOrder_style";
import instance from "../axios/axiosinstance";
import CustomTextFields from "components/TextField/textfield";
import CustomDatePicker from "components/Date/date";
import dayjs, { Dayjs } from "dayjs";

interface SchoolName {
    value: string;
    label: string;
}
interface TailorName {
    value: string;
    label: string;
}

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
    const [schoolName, setSchoolName] = React.useState<SchoolName[]>([]);
    const [tailorName, setTailorName] = React.useState<TailorName[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [jobOrder, setJobOrder] = React.useState({ number: "", date: "" });
    const [stitchingData, setStitchingData] = React.useState<StitchingRow[]>(initialData);
    const [fabricData, setFabricData] = React.useState<FabricRow[]>(fabricInitialData);
    const [stitchingRate, setStitchingRate] = React.useState<StitchingRate[]>(stitchingRateDetails);
    const [stitchingFabric, setStitchingFabric] = React.useState<StitchingFabric[]>(stitchingFabricDetails);
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

    const formatDate = (dateString: string | number | Date) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString("en-GB");
    };

    useEffect(() => {
        const fetchJoborder = async () => {
            try {
                const response = await instance.post("");
                if (response.data) {
                    setJobOrder({
                        number: response.data.job_order_no,
                        date: formatDate(response.data.date)
                    });
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
                    <Typography variant="h4" fontWeight='bold'>09/08/2025</Typography>
                </Box>
            </HeaderBox>
            <Box
                sx={{
                    marginTop: '8px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'stretch', md: 'flex-start' },
                    borderRadius: '8px',
                    backgroundColor: colour.white,
                    padding: 4,
                    position: 'static',
                    boxShadow: 'unset'
                }}
            >
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
                    <IconButton sx={{
                        mr: 0,
                        p: 0,
                        color: colour.primary
                    }}>
                        <MapsUgcIcon fontSize="large" />
                    </IconButton>
                    <CustomButton
                        label="Add Uniforms"
                        variant="contained"
                        onClick={() => setOpen(true)}
                        Component={uniformButton}
                    />
                </ButtonBox>
            </Box>

            <Box
                sx={{
                    marginTop: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    borderRadius: '8px',
                    backgroundColor: colour.white,
                    padding: 4,
                    boxShadow: 'unset',
                    gap: 3,
                    borderTop: "4px solid blue",

                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    marginLeft: '12px',
                    marginBottom: { xs: 2, md: 0, lg: 3 },
                    width: { xs: "100%", md: "35%", lg: "25%" }

                }}>
                    <Typography
                        variant="body1"
                        fontFamily='"Outfit", sans-serif'
                        sx={{
                            minWidth: '80px',
                            fontWeight: 500,
                            mr: { sm: 2, xs: 0 },
                            mb: { xs: '6px' }
                        }}
                    >
                        Uniform<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
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
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        gap: 3,
                        width: "100%",
                    }}
                >
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <AssignmentIcon sx={{ mr: 1, color: "#a4a4a4ff" }} />
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                Size Details
                            </Typography>
                        </Box>
                        <TableContainer
                            component={Paper}
                            sx={{
                                border: "1px solid #d1d1d1",
                                borderRadius: "8px",
                                overflow: "hidden",

                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f5f5f5", width: "20%" }}>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '10px'
                                            }}
                                        >
                                            S.No.
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '80px'

                                            }}
                                        >
                                            Size
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "30%"
                                            }}
                                        >
                                            Qty
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "20%"
                                            }}
                                        >
                                            Stitchig Rate
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "20%"
                                            }}
                                        >
                                            Amount
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody sx={{
                                    "& td": {
                                        fontWeight: 500,
                                        fontSize: "16px"
                                    }
                                }}>
                                    {stitchingData.map((row) => (
                                        <TableRow key={row.sno}>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "center" }}>
                                                {row.sno}
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "center" }}>
                                                {row.size}
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "center" }}>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={row.qty || ""}
                                                    onChange={(e) => handleQtyChange(row.sno, e.target.value)}
                                                    inputProps={{
                                                        min: 0,
                                                        style: { textAlign: "center", padding: "10px" },
                                                    }}
                                                    sx={{
                                                        maxWidth: "150px",
                                                        "& input": { fontSize: "16px", fontFamily: '"Outfit", sans-serif' },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    textAlign: "right",
                                                    paddingRight: "16px",
                                                }}
                                            >
                                                {row.rate}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    textAlign: "right",
                                                    paddingRight: "16px",
                                                }}
                                            >
                                                {row.amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                        <TableCell sx={{ border: "1px solid #e0e0e0" }}></TableCell>
                                        <TableCell
                                            colSpan={1}
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px"
                                            }}
                                        >
                                            <strong>Total</strong>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <strong>{totalQty}</strong>
                                        </TableCell>
                                        <TableCell sx={{ border: "1px solid #e0e0e0" }}></TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                paddingRight: "16px",
                                            }}
                                        >
                                            <strong>{totalAmount}</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", width: '100%' }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <ListAltIcon sx={{ mr: 1, color: "#a4a4a4ff" }} />
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                Fabric Details
                            </Typography>
                        </Box>

                        <TableContainer
                            component={Paper}
                            sx={{
                                border: "1px solid #d1d1d1",
                                borderRadius: "8px",
                                overflow: "hidden",
                                marginLeft: 0,
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '80px'
                                            }}
                                        >S.No.</TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "Left",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '50%'
                                            }}
                                        >Fabric</TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "Right",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "20%"
                                            }}
                                        >Total Meters</TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "Right",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "20%"
                                            }}
                                        >Total Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody
                                    sx={{
                                        "& td": {
                                            fontWeight: 500,
                                            fontSize: "16px",
                                        }
                                    }}
                                >
                                    {fabricData.map((row) => (
                                        <TableRow key={row.sno}>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "center" }}>
                                                {row.sno}
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "Left" }}>
                                                {row.fabric}
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "right" }}>
                                                {row.total_meters}
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #e0e0e0", textAlign: "right", paddingRight: "16px" }}>
                                                {row.total_amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                        <TableCell sx={{ border: "1px solid #e0e0e0" }}></TableCell>
                                        <TableCell
                                            colSpan={1}
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                fontWeight: 700,
                                                textAlign: "left",
                                                fontSize: "14px",
                                            }}
                                        >
                                            <strong>Total</strong>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <strong>{fabricData.reduce((sum, row) => sum + row.total_meters, 0)}</strong>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                paddingRight: "16px",
                                            }}
                                        >
                                            <strong>{fabricData.reduce((sum, row) => sum + row.total_amount, 0)}</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "8px",
                    backgroundColor: colour.white,
                    padding: 4,
                    boxShadow: "unset",
                    gap: 3,
                    width: "100%",
                    borderTop: "4px solid green",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        gap: 3,
                        width: "100%",
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                mt: 4,
                                width: "100%",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <AssignmentIcon sx={{ mr: 1, color: "#a4a4a4ff" }} />
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    Stitching Rate Details
                                </Typography>
                            </Box>

                            <TableContainer
                                component={Paper}
                                sx={{
                                    border: "1px solid #d1d1d1",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    marginLeft: 0,
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableCell sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '80px'
                                            }}>S.No.</TableCell>
                                            <TableCell sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "left",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "80%"
                                            }}>Uniform</TableCell>
                                            <TableCell sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '20%'
                                            }}>Rate</TableCell>
                                        </TableRow>

                                    </TableHead>
                                    <TableBody
                                        sx={{ "& td": { fontWeight: 500, fontSize: "16px" } }}
                                    >
                                        {stitchingRateDetails.map((row) => (
                                            <TableRow key={row.sno}>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid #e0e0e0",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {row.sno}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid #e0e0e0",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {row.uniform}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid #e0e0e0",
                                                        textAlign: "right",
                                                        paddingRight: "16px",
                                                    }}
                                                >
                                                    {row.rate}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableCell sx={{ border: "1px solid #e0e0e0" }}></TableCell>
                                            <TableCell
                                                colSpan={1}
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    fontWeight: 700,
                                                    textAlign: "left",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <strong>Total</strong>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    textAlign: "right",
                                                    fontWeight: "bold",
                                                    paddingRight: "16px",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: colour.lightGreens,
                                                        color: "black",
                                                        padding: "8px 16px",
                                                        borderRadius: "8px",
                                                        border: '2px solid',
                                                        borderColor: colour.lightGreen,
                                                        display: "inline-block"
                                                    }}
                                                ><strong>{stitchingRateDetails.reduce((sum, row) => sum + row.rate, 0)}</strong></Box>

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>


                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                mt: 4,
                                width: "100%",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <ListAltIcon sx={{ mr: 1, color: "#a4a4a4ff" }} />
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    Stitching Fabric Details
                                </Typography>
                            </Box>

                            <TableContainer
                                component={Paper}
                                sx={{
                                    border: "1px solid #d1d1d1",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    marginLeft: 0,
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableCell sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: '80px'

                                            }}>S.No.</TableCell>
                                            <TableCell sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "left",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "80%"
                                            }}>Fabric</TableCell>
                                            <TableCell sx={{
                                                border: "1px solid #e0e0e0",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "20%"
                                            }}>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody
                                        sx={{ "& td": { fontWeight: 500, fontSize: "16px" } }}
                                    >
                                        {stitchingFabricDetails.map((row) => (
                                            <TableRow key={row.sno}>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid #e0e0e0",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.sno}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid #e0e0e0",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {row.fabric}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid #e0e0e0",
                                                        textAlign: "right",
                                                        paddingRight: "16px",
                                                    }}
                                                >
                                                    {row.amount}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableCell sx={{ border: "1px solid #e0e0e0" }}></TableCell>
                                            <TableCell
                                                colSpan={1}
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    fontWeight: 700,
                                                    textAlign: "Left",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <strong>Total</strong>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    textAlign: "right",
                                                    fontWeight: "bold",
                                                    paddingRight: "16px",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: colour.lightGreens,
                                                        color: "black",
                                                        padding: "8px 16px",
                                                        borderRadius: "8px",
                                                        border: '2px solid',
                                                        borderColor: colour.lightGreen,
                                                        display: "inline-block"
                                                    }}
                                                ><strong>{stitchingFabricDetails.reduce((sum, row) => sum + row.amount, 0)}</strong></Box>

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mt: 4,
                        flexDirection: { xs: "column", lg: "row", md: "column" },
                        width: { lg: "80%", xs: "25%", md: "80%" },
                        alignItems: "flex-start",
                    }}
                >
                    <Box sx={{
                        flex: { xs: "100%", lg: "50%", md: "100%" },
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <CustomTextFields
                            name="remarks"
                            id="remarks"
                            label_name="Remarks"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            multiline
                            rows={5}
                            Component={RemarksInputField}

                        />
                    </Box>

                    <Box sx={{
                        flex: { xs: "100%", lg: "25%", md: "100%" },
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <CustomDatePicker
                            label="Due Date"
                            value={todate}
                            onChange={setTodate}
                        />
                    </Box>
                </Box>
            </Box>



            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end', marginBottom: 5 }}>
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
            </Box>
        </Box>


    )
}

export default UniformMaster