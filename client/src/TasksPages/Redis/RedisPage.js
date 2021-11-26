import { Tabs, Tab, Box } from '@mui/material';
import React, { useState } from 'react';
import { TaskTitle } from '../../ui/TaskTitle';
import { CompetitionMonitor } from './CompetitionMonitor/CompetitionMonitor';
import { FontSettings } from './FontSettings/FontSettings';

const tabs = [
  {
    label: 'Настройки текстового сообщения',
    value: 0,
    component: <FontSettings />,
  },
  {
    label: 'Мониторинг соревнований',
    value: 1,
    component: <CompetitionMonitor />,
  },
];

export const RedisPage = () => {
  const [activeTabItem, setActiveTabItem] = useState(0);

  return (
    <div>
      <TaskTitle text={'Лабораторная работа #1: Redis'} />
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
    </div>
  );
};
