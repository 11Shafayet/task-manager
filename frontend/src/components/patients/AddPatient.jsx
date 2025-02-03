import React, { useState } from 'react';

const patients = [
  {
    name: 'John Doe',
    diseases: ['Diabetes Type 2', 'Hypertension'],
    allergies: ['Penicillin', 'Peanuts'],
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

const AddPatient = ({ isOpen, onClose }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    diseases: [],
    allergies: [],
    floorNo: '',
    roomNo: '',
    bedNo: '',
    age: '',
    gender: '',
    contactInformation: {
      phone: '',
      address: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    others: '',
    foodPlan: {
      morning: [],
      afternoon: [],
      evening: [],
      note: '',
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(patientData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPatientData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setPatientData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 text-white">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-slate-900">
        {/* Fixed header */}
        <div className="sticky top-0 z-10 bg-slate-900 p-8 pb-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Patient</h2>
            <button
              onClick={onClose}
              className="text-xl font-bold duration-300 hover:rotate-90 hover:scale-125"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable form content */}
        <div className="max-h-[calc(90vh-160px)] overflow-y-auto p-8 pt-0">
          <form
            id="patientForm"
            onSubmit={handleSubmit}
            className="mb-10 space-y-4"
          >
            {/* Basic Information */}
            <div>
              <label className="input-label">Name</label>
              <input
                type="text"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Diseases */}
            <div>
              <label className="input-label">Diseases (comma-separated)</label>
              <input
                type="text"
                name="diseases"
                value={patientData.diseases.join(', ')}
                onChange={(e) =>
                  setPatientData((prev) => ({
                    ...prev,
                    diseases: e.target.value
                      .split(',')
                      .map((item) => item.trim()),
                  }))
                }
                className="input-field"
              />
            </div>

            {/* Allergies */}
            <div>
              <label className="input-label">Allergies (comma-separated)</label>
              <input
                type="text"
                name="allergies"
                value={patientData.allergies.join(', ')}
                onChange={(e) =>
                  setPatientData((prev) => ({
                    ...prev,
                    allergies: e.target.value
                      .split(',')
                      .map((item) => item.trim()),
                  }))
                }
                className="input-field"
              />
            </div>

            {/* Room Information */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="input-label">Floor No</label>
                <input
                  type="text"
                  name="floorNo"
                  value={patientData.floorNo}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="input-label">Room No</label>
                <input
                  type="text"
                  name="roomNo"
                  value={patientData.roomNo}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="input-label">Bed No</label>
                <input
                  type="text"
                  name="bedNo"
                  value={patientData.bedNo}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="input-label">Phone</label>
              <input
                type="tel"
                name="contactInformation.phone"
                value={patientData.contactInformation.phone}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Address</label>
              <textarea
                name="contactInformation.address"
                value={patientData.contactInformation.address}
                onChange={handleChange}
                rows="2"
                className="input-field"
                required
              />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold">Emergency Contact</h3>
              <div>
                <label className="input-label">Name</label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={patientData.emergencyContact.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="input-label">Relationship</label>
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={patientData.emergencyContact.relationship}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="input-label">Phone</label>
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={patientData.emergencyContact.phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Others */}
            <div>
              <label className="input-label">Additional Notes</label>
              <textarea
                name="others"
                value={patientData.others}
                onChange={handleChange}
                rows="2"
                className="input-field"
              />
            </div>

            {/* Food Plan */}
            <div className="space-y-4">
              <h3 className="font-semibold">Food Plan</h3>
              <div>
                <label className="input-label">Morning (comma-separated)</label>
                <input
                  type="text"
                  name="foodPlan.morning"
                  value={patientData.foodPlan.morning.join(', ')}
                  onChange={(e) =>
                    setPatientData((prev) => ({
                      ...prev,
                      foodPlan: {
                        ...prev.foodPlan,
                        morning: e.target.value
                          .split(',')
                          .map((item) => item.trim()),
                      },
                    }))
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">
                  Afternoon (comma-separated)
                </label>
                <input
                  type="text"
                  name="foodPlan.afternoon"
                  value={patientData.foodPlan.afternoon.join(', ')}
                  onChange={(e) =>
                    setPatientData((prev) => ({
                      ...prev,
                      foodPlan: {
                        ...prev.foodPlan,
                        afternoon: e.target.value
                          .split(',')
                          .map((item) => item.trim()),
                      },
                    }))
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Evening (comma-separated)</label>
                <input
                  type="text"
                  name="foodPlan.evening"
                  value={patientData.foodPlan.evening.join(', ')}
                  onChange={(e) =>
                    setPatientData((prev) => ({
                      ...prev,
                      foodPlan: {
                        ...prev.foodPlan,
                        evening: e.target.value
                          .split(',')
                          .map((item) => item.trim()),
                      },
                    }))
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Food Plan Note</label>
                <textarea
                  name="foodPlan.note"
                  value={patientData.foodPlan.note}
                  onChange={handleChange}
                  rows="2"
                  className="input-field"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Fixed footer */}
        <div className="sticky bottom-0 z-10 bg-slate-900 p-8 pt-4">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="patientForm"
              className="rounded-md bg-theme px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-opacity-90"
            >
              Add Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
