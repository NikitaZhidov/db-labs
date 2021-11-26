import { Typography } from '@mui/material';
import React from 'react';

export const TaskTitle = ({ text }) => {
  return (
    <Typography
      style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}
      variant="h2"
      component="h2"
    >
      {text}
    </Typography>
  );
};
