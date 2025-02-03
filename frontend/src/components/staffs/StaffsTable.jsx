import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaEye } from 'react-icons/fa';
import StaffDetails from './StaffDetails';
import { toast } from 'react-toastify';

const StaffsTable = () => {
  const queryClient = useQueryClient();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
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
    data: staffs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['staffs'],
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
    mutationFn: async (staffId) => {
      const token = localStorage.getItem('token');
      console.log(token);

      const response = await fetch(
        `http://localhost:5000/api/users/${staffId}`,
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

  const handleViewStaff = (staff) => {
    setSelectedStaff(staff);
    setShowDetails(true);
  };

  const handleDeleteStaff = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      deleteMutation.mutate(staffId);
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
      {showDetails && selectedStaff ? (
        <StaffDetails
          staff={selectedStaff}
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
                  <th className="table-header">Age</th>
                  <th className="table-header">Gender</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Duty Time</th>
                  <th className="table-header">Assigned Duty</th>
                  <th className="table-header text-center">Actions</th>
                  {userRole === 'manager' && (
                    <th className="table-header text-center">Delete</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {Array.isArray(staffs) &&
                  staffs.map((staff, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="table-body">{staff.name}</td>
                      <td className="table-body">{staff.age}</td>
                      <td className="table-body">{staff.gender}</td>
                      <td className="table-body">{staff.phone}</td>
                      <td className="table-body">{staff.role}</td>
                      <td className="table-body">{staff.dutyTime}</td>
                      <td
                        className={`table-body ${
                          !staff.assignedDuty ? 'bg-red-600 bg-opacity-20' : ''
                        }`}
                      >
                        <span className="capitalize">
                          {staff.assignedDuty || 'No duties assigned'}
                        </span>
                      </td>
                      <td className="table-body text-center">
                        <button
                          onClick={() => handleViewStaff(staff)}
                          className="rounded-full p-2 text-blue-500 hover:bg-gray-700 hover:text-blue-400"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                      </td>
                      {userRole === 'manager' && (
                        <td className="table-body text-center">
                          <button
                            onClick={() => handleDeleteStaff(staff._id)}
                            className="rounded-full p-2 text-red-500 hover:bg-gray-700 hover:text-red-400"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
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

export default StaffsTable;
