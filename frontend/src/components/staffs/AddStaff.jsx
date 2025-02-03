import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const generateRandomPassword = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return Array.from({ length: 15 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};

const AddStaff = ({ isOpen, onClose }) => {
  const [staffData, setStaffData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    dutyTime: '',
    role: '',
    email: '',
    password: generateRandomPassword(),
    assignedDuty: '',
  });

  const addStaffMutation = useMutation({
    mutationFn: async (newStaff) => {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStaff),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to add staff: ${response.status}`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Staff added successfully');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add staff');
      console.log('Staff data being sent:', staffData);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaffMutation.mutate(staffData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 text-white">
      <div className="w-full max-w-2xl rounded-lg bg-slate-900 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Staff</h2>
          {/* close button */}
          <button
            onClick={onClose}
            className="text-xl font-bold duration-300 hover:rotate-90 hover:scale-125"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div>
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              value={staffData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          {/* age and gender */}
          <div className="grid grid-cols-2 gap-4">
            {/* age */}
            <div>
              <label className="input-label">Age</label>
              <input
                type="number"
                name="age"
                value={staffData.age}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* gender */}
            <div>
              <label className="input-label">Gender</label>
              <select
                name="gender"
                value={staffData.gender}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* phone */}
          <div>
            <label className="input-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={staffData.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          {/* email and password */}
          <div className="grid grid-cols-2 gap-4">
            {/* email */}
            <div>
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={staffData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* password */}
            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <input
                  type="text"
                  name="password"
                  value={staffData.password}
                  onChange={handleChange}
                  className="input-field pr-24"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setStaffData((prev) => ({
                      ...prev,
                      password: generateRandomPassword(),
                    }))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-theme px-2 py-1 text-xs text-white hover:bg-opacity-90"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* address */}
          <div>
            <label className="input-label">Address</label>
            <textarea
              name="address"
              value={staffData.address}
              onChange={handleChange}
              rows="2"
              className="input-field"
              required
            />
          </div>

          {/* duty time */}
          <div>
            <label className="input-label">Duty Time</label>
            <input
              type="text"
              name="dutyTime"
              value={staffData.dutyTime}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g.: 9:00 AM - 5:00 PM"
              required
            />
          </div>

          {/* role */}
          <div>
            <label className="input-label">Role</label>
            <select
              name="role"
              value={staffData.role}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="" hidden>
                Select Role
              </option>
              <option value="manager">Manager</option>
              <option value="supervisor">Supervisor</option>
              <option value="deliveryMan">Delivery Man</option>
              <option value="chef">Chef</option>
            </select>
          </div>

          {/* assigned duty */}
          <div>
            <label className="input-label">Assigned Duty</label>
            <input
              type="text"
              name="assignedDuty"
              value={staffData.assignedDuty}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter assigned duties"
              required
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-theme px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-opacity-90"
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
