import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRoutes } from './AppRoutes/AppRoutes';
import { MainTheme } from './material-theme/theme.js';
import 'normalize.css';
import { Link, Route, Routes } from 'react-router-dom';
import { RedisPage } from './TasksPages/Redis/RedisPage';
import { TaskTitle } from './ui/TaskTitle';

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <AppBar position="static" color="primaryDark">
        <Container>
          <Toolbar>
            <Link to={AppRoutes.RedisPage}>
              <Button variant="contained" color="primary">
                Redis
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <TaskTitle text={'Лабораторные работы по БД'} />
        <Routes>
          <Route path={AppRoutes.RedisPage} element={<RedisPage />}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
