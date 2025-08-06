import React from "react";
import { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import CustomTextFields from "components/TextField/textfield";
import CustomButton from "components/Button/button";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axiosinstance";
import restaurant from '../assets/res.png';
import AppLogo from 'assets/logo.png';
import * as yup from 'yup';
import { useFormik } from "formik";
import { FormBox, GridBox, ImageBox, LoginImageStyle, PaperModal, Typograph } from "css/style";


const Login: React.FC = () => {
    
    const [error, setError] = React.useState<string>('');
    const navigate = useNavigate();
    const initialValue = {
        username: "",
        password: "",
    };
    const validationSchema = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is Required"),
    });

    useEffect(() => {
        instance.get('/CSRF-Token')
            .then(() => console.log("Get Csrf Token"))
            .catch((err) => console.log("Error Csrf Token", err));

        const token = localStorage.getItem('accessToken');
        const tokenError = localStorage.getItem('tokenError');

        if (tokenError) {
            setError(tokenError);
            localStorage.removeItem('tokenError');
        }
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setError('');
            try {
                const response = await instance.post('/login', values, { validateStatus: () => true });
                console.log("Login Attempt", response);

                if (response.status === 200 && response.data.accessToken && response.data.refreshToken) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    navigate('/dashboard');
                } else {
                    setError(response.data.message || "Invalid Credentials");
                }

            } catch (err) {
                console.error('Login Error:', err);
                setError("Invalid Credentials");
            }
        }
    });

    return (
        <Box>
            <GridBox container component='main'>
                <PaperModal elevation={6}>
                    <ImageBox
                        sx={{
                            backgroundImage: `url(${restaurant})`,
                        }}>
                    </ImageBox>

                    <FormBox>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2} sx={{ maxWidth: 400, margin: 'auto' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <LoginImageStyle src={AppLogo} alt="Company Logo" />
                                    <Typograph variant="h5">SIGN IN</Typograph>

                                </Box>


                                <CustomTextFields
                                    name='username'
                                    id='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label_name="UserName"
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                />

                                <CustomTextFields
                                    name="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="password"
                                    label_name="Password"
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                />
                                <Box sx={{ textAlign: 'center' }}>
                                    {error && <Typography color="error">{error}</Typography>}
                                    <CustomButton
                                        variant="contained"
                                        label="Login"
                                        type="submit"
                                    />
                                </Box>
                            </Stack>
                        </form>
                    </FormBox>
                </PaperModal>
            </GridBox>
        </Box>

    );
}

export default Login;