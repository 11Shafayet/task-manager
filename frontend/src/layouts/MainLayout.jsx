import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex-shrink-0 lg:w-[270px]">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
