import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextFields from '../components/TextField/textfield';
import { CustomTextFieldStyles} from '../css/style';
import { Stack} from '@mui/material';
import CustomButton from 'components/Button/button';


const Masters: React.FC = () => {
    const initialValue = {
        item: "",
        item_subgroup: "",
        item_group: "",
    };

    const validationSchema = yup.object({
        item: yup.string().required("Item_name required"),
        item_subgroup: yup.string().required("Item_subgroup required"),
        item_group: yup.string().required("Item_group required"),

    });

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit(values, { resetForm }) {
            formik.resetForm();
        },

    });

    return (
        <>
            <Stack direction='column' spacing={2}>
                <CustomTextFields
                    name='item'
                    id='item'
                    label_name='Item'
                    value={formik.values.item}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.item && Boolean(formik.errors.item)}
                    helperText={formik.touched.item && formik.errors.item}
                    Component={CustomTextFieldStyles}
                />

                <CustomTextFields
                    name='item_subgroup'
                    id='item_subgroup'
                    label_name='Item SubGroup'
                    value={formik.values.item_subgroup}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.item_subgroup && Boolean(formik.errors.item_subgroup)}
                    helperText={formik.touched.item_subgroup && formik.errors.item_subgroup}
                    Component={CustomTextFieldStyles}
                />

                <CustomTextFields
                    name='item_group'
                    id='item_group'
                    label_name='Item Group'
                    value={formik.values.item_group}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.item_group && Boolean(formik.errors.item_group)}
                    helperText={formik.touched.item_group && formik.errors.item_group}
                    Component={CustomTextFieldStyles}
                />
                <div>
                    <CustomButton
                        label='Submit'
                        variant='contained'
                        onClick={() => formik.handleSubmit()}
                    />
                </div>
            </Stack>
        </>
    )
};

export default Masters;

