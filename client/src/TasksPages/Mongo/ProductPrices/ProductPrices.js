import { Button, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { productApi } from '../../../api/product.api';
import { FromInput } from '../../../components/FromInput';
import { useFetching } from '../../../hooks/useFetching';

export const ProductPrices = () => {
  const [userName, setUserName] = useState('');
  const [pricesAndTitles, setPricesAndTitles] = useState([]);

  const [fetchPrices, isLoading] = useFetching(async (userName) => {
    const prices = await productApi.getProductPrices(userName);
    setPricesAndTitles(prices);
  });

  const onClickWatch = async () => {
    fetchPrices(userName);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <FromInput
        label={'Имя пользователя'}
        value={userName}
        onChangeValue={setUserName}
      />

      <Button onClick={onClickWatch} variant="contained">
        Просмотреть
      </Button>

      {pricesAndTitles.map((p, i) => {
        return (
          <div
            style={{
              margin: '20px 0',
              border: '1px solid #000',
              padding: '15px',
            }}
            key={`${p.name}_${i}`}
          >
            <div>Название: {p.name}</div>
            <div>Цена: {p.price}</div>
          </div>
        );
      })}
    </>
  );
};
