import React from "react";
import {
    FormLabel, RadioGroup,
    Radio, Typography, FormControlLabel, Stack,
    FormControl
} from "@mui/material";
import type { ChangeEvent, ElementType } from "react";
import { styled } from "@mui/styles";


interface RadioOption {
    value: string;
    label: string;
}

interface CustomRadioGroupProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    options: RadioOption[];
    error?: boolean;
    spacing?: number;
    direction: 'row' | 'column';
    helperText?: string;
    fullWidth?: boolean;
    Component?: ElementType;
}

const defaultStyles = styled(RadioGroup)(() => ({
    marginBottom: '16px'
}));

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
    name, value, onChange, label, options, error, helperText, spacing, direction, Component = defaultStyles,
}) => {

    return (
        <Stack spacing={spacing} direction={direction}>
            <FormControl component="fieldset" error={error} fullWidth>
                {label && <FormLabel>{label}</FormLabel>}
                <Component
                    name={name}
                    value={value}
                    onChange={onChange}
                    sx={{
                        fontFamily: '"Outfit", sans-serif',
                        '& .MuiFormControlLabel-label': {
                            fontFamily: '"Outfit", sans-serif',
                        },
                    }}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    ))}
                </Component>
                {error && helperText && (
                    <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                        {helperText}
                    </Typography>
                )}
            </FormControl>
        </Stack>

    );
};

export default CustomRadioGroup;