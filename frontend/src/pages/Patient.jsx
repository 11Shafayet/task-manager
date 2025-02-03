import { useState } from 'react';
import Heading from '../components/common/Heading';
import PatientsTable from '../components/patients/PatientsTable';
import AddPatient from '../components/patients/AddPatient';
import { useAuth } from '../Provider/AuthProvider';

const Patient = () => {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="container py-10">
      <Heading title="Patients Details" />

      {user?.role === 'manager' && (
        <div className="my-5 flex justify-end">
          <button
            onClick={() => setIsAddPatientOpen(true)}
            className={`rounded-md bg-theme px-8 py-3 text-white duration-300 hover:bg-opacity-90`}
          >
            Add Patient
          </button>
        </div>
      )}

      <div className="mt-5">
        <PatientsTable />
      </div>

      {isAddPatientOpen && (
        <AddPatient
          isOpen={isAddPatientOpen}
          onClose={() => setIsAddPatientOpen(false)}
        />
      )}
    </div>
  );
};

export default Patient;
