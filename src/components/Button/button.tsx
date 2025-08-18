import React from 'react';
import { Button } from '@mui/material';
import type { ElementType, ReactNode } from 'react';
import themes from 'css/colour';
import { styled } from '@mui/styles';

interface Props {
    label?: string;
    id?: string;
    onClick?: () => void;
    variant?: 'contained' | 'text' | 'outlined';
    startIcon?: ReactNode;
    Component?: ElementType;
    type?: 'reset' | 'submit' | 'button';
}

const DefaultStyles = styled(Button)(() => ({
    backgroundColor: themes.palette.primary.main,
    '&:hover': {
        backgroundColor: themes.palette.primary.main,
    },
}));

const CustomButton: React.FC<Props> = ({
    label,id, onClick, variant, startIcon, Component = DefaultStyles,type
}) => {
    return (
        <Component
            id={id}
            variant={variant}
            startIcon={startIcon}
            onClick={onClick}
            type={type}
        >
            {label}
        </Component>
    )
}

export default CustomButton;

