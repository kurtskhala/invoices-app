import { Outlet } from 'react-router-dom';
import Header from './components/header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
