import { FormLabel, Input } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const FromInput = ({ type, label, onChangeValue, value }) => {
  return (
    <div className="form-input">
      <Box display={'flex'} flexDirection={'column'}>
        <FormLabel title={label}>{label}</FormLabel>
        <Input
          type={type}
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
        />
      </Box>
    </div>
  );
};
