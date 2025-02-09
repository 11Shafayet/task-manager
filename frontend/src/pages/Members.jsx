import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const members = [
  {
    _id: '1',
    name: 'Shafayet',
    email: '11shafayet@gmail.com',
    role: 'admin',
    taskAssigned: 5,
  },
  {
    _id: '1',
    name: 'Shafayet',
    email: '11shafayet@gmail.com',
    role: 'admin',
    taskAssigned: 5,
  },
  {
    _id: '1',
    name: 'Shafayet',
    email: '11shafayet@gmail.com',
    role: 'admin',
    taskAssigned: 5,
  },
  {
    _id: '1',
    name: 'Shafayet',
    email: '11shafayet@gmail.com',
    role: 'admin',
    taskAssigned: 5,
  },
  {
    _id: '1',
    name: 'Shafayet',
    email: '11shafayet@gmail.com',
    role: 'admin',
    taskAssigned: 5,
  },
];

const Members = () => {
  const queryClient = useQueryClient();

  // // Fetch all members
  // const {
  //   data: users,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_SERVER_URL}/api/users`
  //     );
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     if (!Array.isArray(data)) {
  //       return data.users || data.data || [];
  //     }
  //     return data;
  //   },
  // });

  // // delete member
  // const deleteMutation = useMutation({
  //   mutationFn: async (userId) => {
  //     const token = localStorage.getItem('token');

  //     const response = await fetch(
  //       `${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to delete user');
  //     }

  //     return userId;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['users'] });
  //     toast.success('User deleted successfully');
  //   },
  //   onError: (error) => {
  //     toast.error(error.message || 'Failed to delete user');
  //   },
  // });

  // const handleDeleteUser = (userId) => {
  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //     deleteMutation.mutate(userId);
  //   }
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   toast.error(error.message);
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <header className="bg-gray-800 p-4 mt-1 md:mt-0 mb-6 text-center">
        <h2 className="text-3xl font-semibold">All Users!</h2>
      </header>

      <div className="m-2 max-h-[88vh] overflow-y-auto">
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Task Assigned</th>
                <th className="table-header text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {members.map((member) => {
                const { _id, name, email, taskAssigned, role } = member;
                return (
                  <tr key={_id} className="border-b border-gray-700">
                    <td className="table-body">{name}</td>
                    <td className="table-body">{email}</td>
                    <td
                      className={`table-body ${
                        role === 'admin' && 'text-emerald-400'
                      }`}
                    >
                      {role}
                    </td>
                    <td className="table-body">{taskAssigned}</td>
                    <td className="table-body text-center">
                      {role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(_id)}
                          className="rounded-full p-2 text-red-500 hover:bg-gray-700 hover:text-red-400"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Members;
