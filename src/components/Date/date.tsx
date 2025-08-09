import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface Props {
    label: string;
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
}

const CustomDatePicker: React.FC<Props> = ({
    label, value, onChange, ...props
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Typography variant="inherit" fontFamily='"Outfit", sans-serif'>{label}</Typography>
                <DatePicker
                    value={value}
                    onChange={onChange}
                    format="DD-MM-YYYY"
                    sx={{ fontFamily: '"Outfit", sans-serif' }}
                    slotProps={{
                        textField: {
                            size: 'small',
                            fullWidth: true
                        }
                    }}
                    {...props}
                />
            </Box>
        </LocalizationProvider>

    )

}

export default CustomDatePicker;
