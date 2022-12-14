import { Routes, Route, Outlet } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { Home } from './pages/Home';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={PAGES.HOME}
        element={
          <Shell>
            <Outlet />
          </Shell>
        }
      >
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export const PAGES = {
  HOME: '/',
  TEAMS: '/teams',
};
