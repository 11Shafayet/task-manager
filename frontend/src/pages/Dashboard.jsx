import DDelivery from '../components/dashboard/DDelivery';
import DPatient from '../components/dashboard/DPatient';
import DStaff from '../components/dashboard/DStaff';

const Dashboard = () => {
  return (
    <div>
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <DPatient />
          <DStaff />
          <DDelivery />
          <DStaff />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
