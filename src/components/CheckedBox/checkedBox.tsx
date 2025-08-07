import React from 'react';
import {
  FormGroup, FormControlLabel, Checkbox, Stack
} from '@mui/material';
import type { ChangeEvent,ElementType } from 'react';
import { styled } from '@mui/styles';

interface CheckBoxOption {
  name: string;
  label: string;
  checked: boolean;
}

interface CheckBoxProps {
  options: CheckBoxOption[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  direction: 'row' | 'column';
  spacing?: number;
  Component?: ElementType
}

const defaultStyles = styled(Checkbox)(() => ({
  marginBottom: '16px',
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
}));

const CustomCheckBox: React.FC<CheckBoxProps> = ({
  options, onChange, direction, spacing, Component = defaultStyles }
) => {
 
  return (
    <FormGroup>
      <Stack spacing={spacing} direction={direction}>
        {options.map((option) => (
          <FormControlLabel
            key={option.name}
            control={
              <Component
                name={option.name}
                checked={option.checked}
                onChange={onChange}
              />
            }
            label={option.label}
          />
        ))}
      </Stack>
    </FormGroup>
  );
};


export default CustomCheckBox;
