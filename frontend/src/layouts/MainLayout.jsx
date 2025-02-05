import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
