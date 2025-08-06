import React from "react";
import {
    PurchaseFormSection, PurchasePageLayout,VoucherLabelText, ResponsiveFormGroup, 
    LocationDropDown, CommonInputField, CashInputField,ItemEntryRow,
    CashBox, LeftColumnBox, ActionButtonContainer,RemarksInputField, ItemListContainer,
    TaxInputField,TaxSummaryBox
} from "css/styles/purchase_style";
import CustomDropDown from "components/DropDown/dropDowm";
import { useFormik } from "formik";
import CustomTextFields from "components/TextField/textfield";
import CustomDatePicker from "components/Date/date";
import dayjs, { Dayjs } from "dayjs";
import CustomButton from "components/Button/button";
import { Typography, Stack} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import { CommonHeaderBox,CommonTypography,ErrorButton, SuccessButton } from "css/style";

const Purchase: React.FC = () => {
    const today = dayjs();.
    const [invoiceDate, setInvoiceDate] = React.useState<Dayjs | null>(today);
    const [voucherDate, setVoucherDate] = React.useState<Dayjs | null>(today);
    const initialValue = {

    };
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit(values, { resetForm }) {
            resetForm();
        }
    });

    const handleClose = () => {
        formik.resetForm();
    }

    return (
        <>
            <CommonHeaderBox>
                <CommonTypography variant="inherit">
                    Purchase
                </CommonTypography>
                <VoucherLabelText variant="inherit">
                    Voucher No:
                </VoucherLabelText>
            </CommonHeaderBox>

            <PurchaseFormSection>
                <ResponsiveFormGroup>
                    <LocationDropDown>
                        <CustomDropDown
                            name="location_name"
                            id='location_name'
                            label_name="Location Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            options={[
                                { label: "All", value: 'All' }
                            ]}
                        />
                    </LocationDropDown>
                    <CustomTextFields
                        name="supplier_name"
                        id="supplier_name"
                        label_name="Supplier Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        Component={CommonInputField}
                    />
                    <CustomTextFields
                        name="invoice_no"
                        id="invoice_no"
                        label_name="Invoice No"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        Component={CommonInputField}
                    />
                    <CustomDatePicker
                        label="Invoice Date"
                        value={invoiceDate}
                        onChange={setInvoiceDate}
                    />
                    <CustomDatePicker
                        label="Voucher Date"
                        value={voucherDate}
                        onChange={setVoucherDate}
                    />
                </ResponsiveFormGroup>
            </PurchaseFormSection>
            <PurchasePageLayout>
                <LeftColumnBox>
                    <ItemEntryRow>
                        <CustomTextFields
                            name="item_code"
                            id="item_code"
                            label="Item Code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            Component={CommonInputField}
                        />

                        <CustomTextFields
                            name="rate"
                            id="rate"
                            label="Rate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            Component={CommonInputField}
                        />
                        <CustomTextFields
                            name="quantity"
                            id="item_code"
                            label="Item Code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            Component={CommonInputField}
                        />
                        <CustomTextFields
                            name="discount"
                            id="item_code"
                            label="Item Code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            Component={CommonInputField}
                        />
                        <CustomTextFields
                            name="total"
                            id="item_code"
                            label="Item Code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            Component={CommonInputField}
                        />

                        <CustomButton
                            label="Add"
                            variant="contained"
                            onClick={formik.handleSubmit} />
                        <CustomButton
                            label="Clear"
                            variant="contained"
                            onClick={handleClose}
                            Component={ErrorButton}
                        />
                    </ItemEntryRow>
                    <ItemListContainer>

                    </ItemListContainer>
                    <TaxSummaryBox>
                        <Stack spacing={2} width="100%" direction='row'>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant='h6' width="100px">Total Items</Typography>
                                <CustomTextFields
                                    name="total_items"
                                    id="total_items"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    Component={TaxInputField}
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant='h6' width="100px">CGST</Typography>
                                <CustomTextFields
                                    name="cgst"
                                    id="cgst"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    Component={TaxInputField}
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="h6" width="100px">SGST</Typography>
                                <CustomTextFields
                                    name="sgst"
                                    id="sgst"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    Component={TaxInputField}
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="h6" width="100px">Sub Total</Typography>
                                <CustomTextFields
                                    name="sub_total"
                                    id="sub_total"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    Component={TaxInputField}
                                />
                            </Stack>
                        </Stack>
                    </TaxSummaryBox>
                </LeftColumnBox>

                <CashBox>
                    <Typography variant="inherit">Freight</Typography>
                    <CustomTextFields
                        name="freight"
                        id="freight"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        Component={CashInputField}
                    />
                    <Typography variant="inherit">Discount</Typography>
                    <CustomTextFields
                        name="discount"
                        id="discount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        Component={CashInputField}
                    />

                    <CustomTextFields
                        name="discount"
                        id="discount"
                        label_name="Remarks"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        multiline
                        rows={4}
                        Component={RemarksInputField}
                    />

                    <ActionButtonContainer>
                        <CustomButton
                            variant="contained"
                            startIcon={<ClearIcon />}
                            onClick={handleClose}
                            Component={ErrorButton}
                        />
                        <CustomButton
                            variant="contained"
                            startIcon={<CancelPresentationIcon />}
                            onClick={handleClose}
                            
                        />
                        <CustomButton
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleClose}
                            Component={SuccessButton}
                        />
                    </ActionButtonContainer>
                </CashBox>
            </PurchasePageLayout>

        </>
    )
};

export default Purchase

