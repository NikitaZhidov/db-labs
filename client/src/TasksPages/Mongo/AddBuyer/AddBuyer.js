import { Button, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { productApi } from '../../../api/product.api';
import { FromInput } from '../../../components/FromInput';
import { useFetching } from '../../../hooks/useFetching';
import Select from 'react-select';
import { Box } from '@mui/system';

export const AddBuyer = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [deliveryService, setDeliveryService] = useState('');
  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [fetchProducts, isLoadingProducts] = useFetching(async (category) => {
    const products = await productApi.getAll(category);
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
    setProducts(products);
  });

  const [fetchBuyers, isLoadingBuyers] = useFetching(async (productId) => {
    const buyers = await productApi.getBuyers(productId);
    setBuyers(buyers);
  });

  const [addBuyer, isLoadingBuyer] = useFetching(async (productId) => {
    const buyer = {
      name,
      date: new Date(),
      review,
      deliveryService,
    };

    await productApi.addBuyer(productId, buyer);
    setSelectedProduct({ ...selectedProduct });
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct?._id) {
      fetchBuyers(selectedProduct._id);
    }
  }, [selectedProduct]);

  const onSelectProduct = async (productId) => {
    if (productId) {
      setSelectedProduct(products.find((p) => productId === p._id));
    }
  };

  const onAddBuyer = async () => {
    await addBuyer(selectedProduct._id);
    setName('');
    setReview('');
    setDeliveryService('');
  };

  if (isLoadingProducts || isLoadingBuyers || isLoadingBuyer) {
    return <LinearProgress />;
  }

  return (
    <>
      {selectedProduct && (
        <Select
          onChange={(o) => onSelectProduct(o.value)}
          value={{ label: selectedProduct.name, value: selectedProduct._id }}
          options={products.map((p) => ({ label: p.name, value: p._id }))}
        />
      )}
      <FromInput label={'Имя'} value={name} onChangeValue={setName} />
      <FromInput label={'Отзыв'} value={review} onChangeValue={setReview} />
      <FromInput
        label={'Имя службы доставки'}
        value={deliveryService}
        onChangeValue={setDeliveryService}
      />
      {selectedProduct && (
        <Button onClick={() => onAddBuyer()} variant="contained">
          Добавить покупку
        </Button>
      )}
      {buyers.reverse().map((b, i) => {
        return (
          <Box
            key={b.name + i.toString()}
            margin={'40px 0'}
            border={'1px solid #000'}
            borderRadius="15px"
            padding={'20px'}
          >
            <div>Клиент: {b.name}</div>
            <div>Сервис доставки: {b.deliveryService}</div>
            <div>Отзыв: {b.review}</div>
            <div>Дата покупки: {b.date}</div>
          </Box>
        );
      })}
    </>
  );
};
