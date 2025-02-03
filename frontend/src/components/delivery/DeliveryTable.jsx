import React, { useState } from 'react';
import DeliveryDetails from './DeliveryDetails';
import { FaEye } from 'react-icons/fa';

const deliveries = [
  {
    patientName: 'John Doe',
    floorNo: '1',
    roomNo: '314',
    bedNo: 'A2',
    morningStatus: 'Pending',
    eveningStatus: 'Delivered',
    nightStatus: 'Pending',
    assignedChef: 'unassigned',
    deliveryMan: 'John Doe',
  },
];

const DeliveryTable = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDetails(true);
  };

  return (
    <div className="w-full">
      {showDetails && selectedDelivery ? (
        <DeliveryDetails
          delivery={selectedDelivery}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-800">
                  <th className="table-header">Patient Name</th>
                  <th className="table-header">Floor No</th>
                  <th className="table-header">Room No</th>
                  <th className="table-header">Bed No</th>
                  <th className="table-header">Assigned Chef</th>
                  <th className="table-header">Delivery Man</th>
                  <th className="table-header">Morning Status</th>
                  <th className="table-header">Evening Status</th>
                  <th className="table-header">Night Status</th>
                  <th className="table-header text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {deliveries.map((delivery, index) => {
                  const {
                    patientName,
                    floorNo,
                    roomNo,
                    bedNo,
                    morningStatus,
                    eveningStatus,
                    nightStatus,
                    assignedChef,
                    deliveryMan,
                  } = delivery;

                  return (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="table-body">{patientName}</td>
                      <td className="table-body">{floorNo}</td>
                      <td className="table-body">{roomNo}</td>
                      <td className="table-body">{bedNo}</td>
                      <td
                        className={`table-body ${
                          !assignedChef || assignedChef === 'unassigned'
                            ? 'bg-red-600 bg-opacity-5 text-red-700'
                            : ''
                        }`}
                      >
                        {assignedChef}
                      </td>
                      <td
                        className={`table-body ${
                          !deliveryMan || deliveryMan === 'unassigned'
                            ? 'bg-red-600 bg-opacity-5 text-red-700'
                            : ''
                        }`}
                      >
                        {deliveryMan}
                      </td>
                      <td
                        className={`table-body ${
                          morningStatus === 'Pending'
                            ? 'bg-red-600 bg-opacity-5 text-red-700'
                            : 'bg-green-900 bg-opacity-5 text-green-700'
                        }`}
                      >
                        {morningStatus}
                      </td>
                      <td
                        className={`table-body ${
                          eveningStatus === 'Pending'
                            ? 'bg-red-600 bg-opacity-5 text-red-700'
                            : 'bg-green-900 bg-opacity-5 text-green-700'
                        }`}
                      >
                        {eveningStatus}
                      </td>
                      <td
                        className={`table-body ${
                          nightStatus === 'Pending'
                            ? 'bg-red-600 bg-opacity-5 text-red-700'
                            : 'bg-green-900 bg-opacity-5 text-green-700'
                        }`}
                      >
                        {nightStatus}
                      </td>

                      <td className="table-body text-center">
                        <button
                          onClick={() => handleViewDelivery(delivery)}
                          className="rounded-full p-2 text-xl text-blue-500 hover:bg-gray-700 hover:text-blue-400"
                        >
                          <FaEye />
                        </button>
                      </td>
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

export default DeliveryTable;
