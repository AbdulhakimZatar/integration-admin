import { Routes, Route, Outlet } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { Home } from './pages/Home';
import { Teams } from './pages/Teams';

export const AppRoutes = () => (
  <Routes>
    <Route
      path={PAGES.HOME}
      element={
        <Shell>
          <Outlet />
        </Shell>
      }
    >
      <Route path={PAGES.HOME} element={<Home />} />
      <Route path={PAGES.TEAMS} element={<Teams />} />
    </Route>
  </Routes>
);

export const PAGES = {
  HOME: '/',
  TEAMS: '/teams',
};
