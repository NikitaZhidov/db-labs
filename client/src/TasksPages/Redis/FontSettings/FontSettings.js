import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fontApi } from '../../../api/font.api';
import { useFetching } from '../../../hooks/useFetching';

const getOptionsItem = (text) => ({ label: text, value: text });

const fontOptions = ['Arial', 'Georgia', 'Impact', 'Roboto'].map((v) => ({
  label: v,
  value: v,
}));
const fontSizeOptions = ['10px', '14px', '18px', '24px', '28px'].map((v) => ({
  label: v,
  value: v,
}));
const colorOptions = ['black', 'tomato', 'green', 'blue'].map((v) => ({
  label: v,
  value: v,
}));
const fontStyleOptions = ['normal', 'italic'].map((v) => ({
  label: v,
  value: v,
}));
const textDecorationOptions = ['none', 'underline'].map((v) => ({
  label: v,
  value: v,
}));

export const FontSettings = () => {
  const [users, setUsers] = useState([]);
  const [fetchUsers, isLoadingUsers] = useFetching(async () => {
    const users = await fontApi.getAllUsers();
    setUsers(users.map((user) => ({ label: user, value: user })));
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserSettings, setSelectedUserSettings] = useState(null);
  const [fetchUserSettings, isLoadingSettings] = useFetching(
    async (selectedUser) => {
      const settings = await fontApi.getUserFontSettings(selectedUser);
      setSelectedUserSettings(settings);
    }
  );

  const [testingText, setTestingText] = useState('Test text');

  const [isSavingSettings, setIsSavingSettings] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const currentSelectedUser = users[0];
      setSelectedUser(currentSelectedUser);
    }
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      fetchUserSettings(selectedUser.value);
    }
  }, [selectedUser]);

  const saveFontSettings = async () => {
    setIsSavingSettings(true);
    await fontApi.updateFontSettings(selectedUser.value, selectedUserSettings);
    setIsSavingSettings(false);
  };

  if (isLoadingUsers) {
    return <LinearProgress />;
  }

  return (
    <div>
      {isLoadingUsers ? (
        <LinearProgress />
      ) : (
        <>
          <Typography
            style={{ textAlign: 'center', margin: '20px 0' }}
            variant="h4"
            component="h4"
          >
            Пользователь
          </Typography>
          <Select
            options={users}
            onChange={setSelectedUser}
            defaultValue={selectedUser}
          />
        </>
      )}
      {isLoadingSettings ||
      selectedUserSettings === null ||
      isSavingSettings ? (
        <LinearProgress />
      ) : (
        <>
          <Typography
            style={{ textAlign: 'center', margin: '20px 0' }}
            variant="h4"
            component="h4"
          >
            Настройки текста
          </Typography>
          <Select
            options={fontOptions}
            onChange={(opt) =>
              setSelectedUserSettings({
                ...selectedUserSettings,
                font: opt.value,
              })
            }
            defaultValue={getOptionsItem(selectedUserSettings.font)}
          />
          <Select
            options={fontSizeOptions}
            onChange={(opt) =>
              setSelectedUserSettings({
                ...selectedUserSettings,
                fontSize: opt.value,
              })
            }
            defaultValue={getOptionsItem(selectedUserSettings.fontSize)}
          />
          <Select
            options={colorOptions}
            onChange={(opt) =>
              setSelectedUserSettings({
                ...selectedUserSettings,
                color: opt.value,
              })
            }
            defaultValue={getOptionsItem(selectedUserSettings.color)}
          />
          <Select
            options={fontStyleOptions}
            onChange={(opt) =>
              setSelectedUserSettings({
                ...selectedUserSettings,
                fontStyle: opt.value,
              })
            }
            defaultValue={getOptionsItem(selectedUserSettings.fontStyle)}
          />
          <Select
            options={textDecorationOptions}
            onChange={(opt) =>
              setSelectedUserSettings({
                ...selectedUserSettings,
                textDecoration: opt.value,
              })
            }
            defaultValue={getOptionsItem(selectedUserSettings.textDecoration)}
          />
          <TextField
            label="Протестируйте текст..."
            variant="filled"
            fullWidth
            margin="normal"
            value={testingText}
            onChange={(e) => setTestingText(e.target.value)}
          />
          <Typography>Результат: </Typography>
          <p
            style={{
              fontFamily: selectedUserSettings.font,
              fontSize: selectedUserSettings.fontSize,
              color: selectedUserSettings.color,
              fontStyle: selectedUserSettings.fontStyle,
              textDecoration: selectedUserSettings.textDecoration,
            }}
          >
            {testingText}
          </p>
          <Button variant="contained" onClick={saveFontSettings}>
            Сохранить
          </Button>
        </>
      )}
    </div>
  );
};
