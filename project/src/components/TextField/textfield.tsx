import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ChangeEvent, ElementType, FocusEvent, ReactNode } from 'react';
import colour from 'css/colourFile';
import { styled } from '@mui/material/styles';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur'> {

    name: string;
    id: string;
    label?: string,
    label_name?: string,
    onChange: (e: ChangeEvent<any>) => void;
    onBlur?: (e: FocusEvent<any>) => void;
    error?: boolean;
    helperText?: ReactNode;
    multiline?: boolean;
    rows?: number;
    Component?: ElementType;
};

const DefaultTextFieldStyles = styled(TextField)(() => ({
    borderRadius: 4,
    width: '100%',
    marginBottom: 32,
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    },
}));

const CustomTextFields: React.FC<CustomTextFieldProps> = ({
    name, id, label, label_name, onChange, onBlur, error, helperText, multiline, rows, Component = DefaultTextFieldStyles
}) => {
    return (
        <Box>
            {label_name && (
                <Typography variant='inherit'>{label_name}</Typography>
            )}
            <Component
                name={name}
                label={label}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
                multiline={multiline}
                rows={rows}
            />
        </Box>
    );
};

export default CustomTextFields;

