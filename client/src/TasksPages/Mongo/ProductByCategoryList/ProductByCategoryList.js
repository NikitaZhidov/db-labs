import { FormLabel, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { productApi } from '../../../api/product.api';
import { categoryTypes } from '../../../constants/categoryTypes';
import { useFetching } from '../../../hooks/useFetching';
import Select from 'react-select';

export const ProductByCategoryList = () => {
  const [categoriesOptions, setCategoriesOptions] = useState(
    Object.entries(categoryTypes).map(([key, value]) => ({ label: key, value }))
  );

  const [selectedOption, setSelectedOption] = useState(
    Object.entries(categoryTypes).map(([key, value]) => ({
      label: key,
      value,
    }))[0]
  );

  const [titles, setTitles] = useState([]);
  const [properties, setProperties] = useState([]);

  const [fetchProductTitles, isLoadingTitles] = useFetching(
    async (category) => {
      const productTitles = await productApi.getProductTitles(category);
      setTitles(productTitles.map((p) => p.name));
    }
  );

  const [fetchProductProperties, isLoadingProperties] = useFetching(
    async (category) => {
      const productProperties = await productApi.getProductProperties(category);
      setProperties(productProperties.map((p) => p.specialProperties));
    }
  );

  useEffect(() => {
    fetchProductTitles(selectedOption.value);
    fetchProductProperties(selectedOption.value);
  }, [selectedOption]);

  if (isLoadingTitles) {
    return <LinearProgress />;
  }

  return (
    <>
      <FormLabel>Категория</FormLabel>
      <Select
        options={categoriesOptions}
        value={selectedOption}
        onChange={setSelectedOption}
      />
      {titles.length > 0 && (
        <Typography style={{ marginTop: '50px' }} variant="h5">
          Названия:{' '}
        </Typography>
      )}
      {titles.map((t) => (
        <div
          style={{
            padding: '15px',
            border: '1px solid #000',
            margin: '15px 0',
          }}
          key={t}
        >
          {t}
        </div>
      ))}
      {properties.length > 0 && (
        <Typography style={{ marginTop: '50px' }} variant="h5">
          Харктеристики:{' '}
        </Typography>
      )}
      {properties.map((p) => {
        return p.map((v) => (
          <div
            style={{
              padding: '15px',
              border: '1px solid #000',
              margin: '15px 0',
            }}
            key={v}
          >
            {v}
          </div>
        ));
      })}

      <Typography style={{ marginTop: '50px' }} variant="h5">
        Количество товаров:{titles.length}
      </Typography>
    </>
  );
};
