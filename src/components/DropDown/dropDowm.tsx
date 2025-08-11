import React from 'react';
import { FormControl, Select, MenuItem, Typography, Box, SelectChangeEvent } from '@mui/material';
import type { FocusEvent, ReactNode, ElementType } from 'react';

import { styled } from '@mui/styles';
import colour from 'css/colourFile';

interface DropDowProps {
    name: string;
    id: string;
    value?: string;
    label?: string,
    label_name?: string;
    options: { value: string, label: string }[];
    onChange: (e: SelectChangeEvent<string>) => void;
    onBlur: (e: FocusEvent<HTMLElement>) => void;
    error?: boolean;
    helperText?: ReactNode;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    Component?: ElementType;
};

const DefaultStyles = styled(FormControl)(() => ({
    '& .MuiInputBase-root': {
        backgroundColor: colour.ghostWhite,
    }
}));

const CustomDropDown: React.FC<DropDowProps> = ({
    name, id, value, label_name, label, options, onChange, onBlur, error, helperText, fullWidth, size, Component = DefaultStyles }) => {

    return (
        <Box>
            <Typography variant='inherit' fontFamily='"Outfit", sans-serif' sx={{ marginBottom: '4px' }}>{label_name}</Typography>
            <Component fullWidth={fullWidth} size={size} error={error}>
                <Select
                    name={name}
                    id={id}
                    value={value}
                    label={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error}
                    sx={{
                        fontFamily: '"Outfit", sans-serif',
                        '& .MuiSelect-select': {
                            padding: '10px 8px', }, }}
                >
                                <MenuItem value=""><b>None</b></MenuItem>
                    {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value} sx={{ fontFamily: '"Outfit", sans-serif' }}>
                                        {option.label}</MenuItem>
                                ))}
                </Select>
            {
                error && helperText && (
                    <Typography variant='caption' color='error' sx={{ ml: 1 }}>
                        {helperText}
                    </Typography>
                )
            }
        </Component>
        </Box >


    );

};

export default CustomDropDown;