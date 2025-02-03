import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaEye } from 'react-icons/fa';
import PatientDetails from './PatientDetails';
import { toast } from 'react-toastify';

const patients = [
  {
    name: 'John Doe',
    diseases: 'Diabetes Type 2, Hypertension',
    allergies: 'Penicillin, Peanuts',
    floorNo: '3',
    roomNo: '304',
    bedNo: 'B2',
    age: 45,
    gender: 'Male',
    contactInformation: {
      phone: '(555) 123-4567',
      address: '123 Main St, City, State',
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543',
    },
    others: 'Patient requires wheelchair assistance',
    foodPlan: {
      morning: ['eggs', 'milk', 'banana'],
      afternoon: ['salad', 'rice', 'chicken'],
      evening: ['fish', 'rice', 'vegetable'],
      note: 'Patient is allergic to peanuts and seafood',
    },
  },
  {
    name: 'Shafayetur Rahman',
    diseases: ['Diabetes Type 1', 'Hypertension'],
    allergies: ['Penicillin', 'Peanuts'],
    floorNo: '1',
    roomNo: '314',
    bedNo: 'A2',
    age: 25,
    gender: 'Male',
    contactInformation: {
      phone: '(555) 123-4567',
      address: '123 Main St, City, State',
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543',
    },
    others: 'Patient requires wheelchair assistance',
    foodPlan: {
      morning: ['eggs', 'milk', 'banana'],
      afternoon: ['salad', 'rice', 'chicken'],
      evening: ['fish', 'rice', 'vegetable'],
      note: 'Patient is allergic to peanuts and seafood',
    },
  },
];

const PatientsTable = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const queryClient = useQueryClient();
  const [userRole, setUserRole] = useState(() => {
    const userString = localStorage.getItem('userData');
    if (!userString) return '';
    try {
      const user = JSON.parse(userString);
      return user.role || '';
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return '';
    }
  });

  const {
    data: patients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        return data.users || data.data || [];
      }
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (patientId) => {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:5000/api/users/${patientId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete staff member');
      }

      return staffId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      toast.success('Staff member deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete staff member');
    },
  });

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  const handleDeletePatient = (patientId) => {
    if (
      window.confirm("Are you sure you want to delete this patient's data?")
    ) {
      deleteMutation.mutate(patientId);
    }
  };

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      {showDetails && selectedPatient ? (
        <PatientDetails
          patient={selectedPatient}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-800">
                  <th className="table-header">Name</th>
                  <th className="table-header">Floor No.</th>
                  <th className="table-header">Room No.</th>
                  <th className="table-header">Bed No.</th>
                  <th className="table-header">Diseases</th>
                  <th className="table-header">Allergies</th>
                  <th className="table-header">Age</th>
                  <th className="table-header">Gender</th>
                  <th className="table-header text-center">Actions</th>
                  {userRole === 'manager' && (
                    <th className="table-header text-center">Delete</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {Array.isArray(patients) &&
                  patients.map((patient) => {
                    const {
                      _id,
                      name,
                      floorNo,
                      roomNo,
                      bedNo,
                      age,
                      gender,
                      diseases,
                      allergies,
                    } = patient;
                    return (
                      <tr key={_id} className="border-b border-gray-700">
                        <td className="table-body">{name}</td>
                        <td className="table-body">{floorNo}</td>
                        <td className="table-body">{roomNo}</td>
                        <td className="table-body">{bedNo}</td>
                        <td className="table-body">{diseases}</td>
                        <td className="table-body">{allergies}</td>
                        <td className="table-body">{age}</td>
                        <td className="table-body">{gender}</td>
                        <td className="table-body text-center">
                          <button
                            onClick={() => handleViewPatient(patient)}
                            className="rounded-full p-2 text-blue-500 hover:bg-gray-700 hover:text-blue-400"
                          >
                            <FaEye className="h-4 w-4" />
                          </button>
                        </td>
                        {userRole === 'manager' && (
                          <td className="table-body text-center">
                            <button
                              onClick={() => handleDeletePatient(_id)}
                              className="rounded-full p-2 text-red-500 hover:bg-gray-700 hover:text-red-400"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end p-4">
            <nav className="flex items-center space-x-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-md border border-gray-600 text-white
                    ${i === 0 ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientsTable;
