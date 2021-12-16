import { useState } from 'react';
import { FromInput } from '../../../components/FromInput';
import { categoryTypes } from '../../../constants/categoryTypes';
import Select from 'react-select';
import { Button, FormLabel, LinearProgress, Typography } from '@mui/material';
import { productApi } from '../../../api/product.api';
import { Box } from '@mui/system';
import { useFetching } from '../../../hooks/useFetching';

export const AddProduct = () => {
  const [name, setName] = useState('');
  const [producer, setProducer] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(Object.values(categoryTypes)[0]);
  const [specialProperties, setSpecialProperties] = useState([]);
  const [curSpecialPropertyText, setCurSpecialPropertyText] = useState('');

  const [saveProductAsync, isSavingProduct] = useFetching(async (product) => {
    await productApi.createProduct(product);
  });

  const onClickSave = async () => {
    const product = {
      name,
      producer,
      price,
      category,
      specialProperties,
    };
    setName('');
    setProducer('');
    setPrice('');
    setCategory('');
    setSpecialProperties([]);
    setCurSpecialPropertyText('');

    await saveProductAsync(product);
  };

  const onAddSpecialProperty = () => {
    if (curSpecialPropertyText.trim()) {
      setSpecialProperties([...specialProperties, curSpecialPropertyText]);
      setCurSpecialPropertyText('');
    }
  };

  if (isSavingProduct) {
    return <LinearProgress />;
  }

  return (
    <>
      <FromInput
        label={'Имя продукта'}
        value={name}
        onChangeValue={setName}
        type={'text'}
      />
      <FromInput
        label={'Имя поставщика'}
        value={producer}
        onChangeValue={setProducer}
        type={'text'}
      />
      <FromInput
        label={'Цена'}
        value={price}
        onChangeValue={setPrice}
        type={'number'}
      />
      <FromInput
        label={'Специальное свойство'}
        value={curSpecialPropertyText}
        onChangeValue={setCurSpecialPropertyText}
        type={'text'}
      />
      <Button
        onClick={onAddSpecialProperty}
        style={{ marginBottom: '30px' }}
        variant="outlined"
      >
        Добавить
      </Button>
      <br />

      <Box marginBottom={'20px'}>
        {specialProperties.length > 0 && (
          <Typography variant="h6">Спец. свойства: </Typography>
        )}
        {specialProperties.map((p) => {
          return <Typography key={p}>{p}</Typography>;
        })}
      </Box>
      <FormLabel>Тип</FormLabel>
      <Select
        defaultValue={
          Object.entries(categoryTypes).map(([key, value]) => ({
            label: key,
            value,
          }))[0]
        }
        onChange={(e) => setCategory(e.value)}
        options={Object.entries(categoryTypes).map(([key, value]) => ({
          label: key,
          value,
        }))}
      />
      <Button
        onClick={() => onClickSave()}
        style={{ marginTop: '15px' }}
        variant="contained"
      >
        Сохранить
      </Button>
    </>
  );
};
