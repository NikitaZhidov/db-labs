import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { TaskTitle } from '../../ui/TaskTitle';
import { AddBuyer } from './AddBuyer/AddBuyer';
import { AddProduct } from './AddProduct/AddProduct';
import { GeneralSum } from './GeneralSum/GeneralSum';
import { ProductByCategoryList } from './ProductByCategoryList/ProductByCategoryList';
import { ProductByColor } from './ProductByColor/ProductByColor';
import { ProductPrices } from './ProductPrices/ProductPrices';

const tabs = [
  {
    label: 'Добавить продукт',
    value: 0,
    component: <AddProduct />,
  },
  {
    label: 'Добавить покупку',
    value: 1,
    component: <AddBuyer />,
  },
  {
    label: 'Список товаров по категории, количество',
    value: 2,
    component: <ProductByCategoryList />,
  },
  {
    label: 'Список названий и стоимостей по покупателю',
    value: 3,
    component: <ProductPrices />,
  },
  {
    label: 'Список продуктов по цвету',
    value: 4,
    component: <ProductByColor />,
  },
  {
    label: 'Общая сумма',
    value: 5,
    component: <GeneralSum />,
  },
];

export const MongoPage = () => {
  const [activeTabItem, setActiveTabItem] = useState(0);

  return (
    <Box display="flex" flexDirection="column">
      <TaskTitle text={'Лабораторная работа #2: MongoDB'} />
      <Tabs value={activeTabItem} centered variant="fullWidth">
        {tabs.map((tab, i) => (
          <Tab
            label={tab.label}
            key={`${i}${tab.value}`}
            value={tab.value}
            onClick={() => setActiveTabItem(tab.value)}
          />
        ))}
      </Tabs>
      <Box padding={'30px'}>
        {tabs.filter((tab, i) => tab.value === activeTabItem)[0].component}
      </Box>
    </Box>
  );
};
