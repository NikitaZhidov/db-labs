import { FormLabel, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { productApi } from '../../../api/product.api';
import { useFetching } from '../../../hooks/useFetching';
import Select from 'react-select';

export const ProductByColor = () => {
  const [colorsOptions, setColorsOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const [products, setProducts] = useState([]);

  const [fetchColors, isLoadingColors] = useFetching(async () => {
    const colors = await productApi.getAllColors();
    setColorsOptions(colors.map((c) => ({ label: c, value: c })));
    if (colors.length > 0) {
      setSelectedOption(colors.map((c) => ({ label: c, value: c }))[0]);
    }
  });

  const [fetchProducts, isLoadingProducts] = useFetching(async (color) => {
    const products = await productApi.getProductsByColor(color);
    setProducts(products);
  });

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      fetchProducts(selectedOption.value);
    }
  }, [selectedOption]);

  if (isLoadingColors || isLoadingProducts) {
    return <LinearProgress />;
  }

  return (
    <>
      <FormLabel>Цвет</FormLabel>
      <Select
        options={colorsOptions}
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.data.value,
          }),
        }}
        value={selectedOption}
        onChange={setSelectedOption}
      />

      {products.map((p, i) => (
        <div
          style={{
            padding: '15px',
            border: '1px solid #000',
            margin: '15px 0',
          }}
          key={p.name + i.toString()}
        >
          <div>Название: {p.name}</div>
          <div>Цена: {p.price}</div>
          <div>Производитель: {p.producer}</div>
        </div>
      ))}
    </>
  );
};
