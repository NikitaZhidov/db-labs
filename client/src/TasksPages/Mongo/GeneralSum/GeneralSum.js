import { LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { productApi } from '../../../api/product.api';
import { useFetching } from '../../../hooks/useFetching';

export const GeneralSum = () => {
  const [sum, setSum] = useState(0);

  const [fetchSum, isLoadingSum] = useFetching(async () => {
    const sum = await productApi.getGeneralSum();
    setSum(sum);
  });

  useEffect(() => {
    fetchSum();
  }, []);

  if (isLoadingSum) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Typography variant="h2">{sum}</Typography>
    </div>
  );
};
