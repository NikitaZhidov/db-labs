import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRoutes } from './AppRoutes/AppRoutes';
import { MainTheme } from './material-theme/theme.js';
import 'normalize.css';
import { Link, Route, Routes } from 'react-router-dom';
import { RedisPage } from './TasksPages/Redis/RedisPage';
import { TaskTitle } from './ui/TaskTitle';
import { MongoPage } from './TasksPages/Mongo/MongoPage';

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <AppBar position="static" color="primaryDark">
        <Container>
          <Toolbar>
            <Link className="nav-link" to={AppRoutes.RedisPage}>
              <Button variant="contained" color="primary">
                Redis
              </Button>
            </Link>
            <Link className="nav-link" to={AppRoutes.MongoPage}>
              <Button variant="contained" color="primary">
                Mongo
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
        <Routes>
          <Route path={AppRoutes.MongoPage} element={<MongoPage />}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
