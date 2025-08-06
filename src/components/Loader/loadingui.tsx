import React from "react";
import logo from 'assets/shortcut.png';
import { CircularProgress, Box } from "@mui/material";
import { useLoading } from "./loadingContext";


export const LoadingUI: React.FC = () => {

    const { loading } = useLoading();

    if (!loading) return null;

    return (

        <Box
            position="fixed"
            top={0}
            bottom={0}
            width='100%'
            height='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            zIndex={1300}
        >
            <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                <CircularProgress
                    size={80}
                    thickness={1}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 30,
                        height: 30,
                    }}
                />
            </Box>
        </Box>
    )
}