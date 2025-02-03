import React from 'react';

const DeliveryDetails = ({ isOpen, onClose, delivery }) => {
  const deliveryData = delivery || {
    patientName: 'John Doe',
    floorNo: '1',
    roomNo: '314',
    bedNo: 'A2',
    morningStatus: 'Pending',
    eveningStatus: 'Delivered',
    nightStatus: 'Pending',
    assignedChef: 'unassigned',
    deliveryMan: 'John Doe',
  };

  if (!isOpen) return null;

  const DetailItem = ({ label, value }) => (
    <div className="w-full p-2 md:w-1/2">
      <div className="rounded-lg bg-white bg-opacity-10 p-4">
        <h3 className="text-sm font-medium text-theme">{label}</h3>
        <div className="mt-1 text-base">
          {Array.isArray(value) ? value.join(', ') : value}
        </div>
      </div>
    </div>
  );

  const handleStatusChange = (field, value) => {
    console.log(`Updating ${field} to ${value}`);
  };

  const StatusSelector = ({ label, value, onChange }) => (
    <div className="flex items-center gap-2">
      <span className="font-medium">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[150px] rounded bg-gray-800 p-2.5"
      >
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );

  const StaffSelector = ({ label, value, onChange }) => (
    <div className="w-full p-2 md:w-1/2">
      <div
        className={`rounded-lg bg-white bg-opacity-10 p-4 ${
          value === 'unassigned' ? 'bg-red-900 bg-opacity-30' : ''
        }`}
      >
        <h3 className="text-sm font-medium text-theme">{label}</h3>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded bg-gray-800 p-2.5"
        >
          <option value="unassigned">Unassigned</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          {/* Add more staff options as needed */}
        </select>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-90 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl rounded-lg bg-gray-900 text-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Delivery Details</h2>
            {/* close button */}
            <button
              onClick={onClose}
              className="text-xl font-bold duration-300 hover:rotate-90 hover:scale-125"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
            <div className="-m-2 flex flex-wrap">
              <DetailItem
                label="Patient Name"
                value={deliveryData.patientName}
              />
              <DetailItem label="Floor Number" value={deliveryData.floorNo} />
              <DetailItem label="Room Number" value={deliveryData.roomNo} />
              <DetailItem label="Bed Number" value={deliveryData.bedNo} />
              <StaffSelector
                label="Assigned Chef"
                value={deliveryData.assignedChef}
                onChange={(value) => handleStatusChange('assignedChef', value)}
              />
              <StaffSelector
                label="Delivery Person"
                value={deliveryData.deliveryMan}
                onChange={(value) => handleStatusChange('deliveryMan', value)}
              />

              {/* Status Controls */}
              <div className="w-full p-2">
                <div className="rounded-lg bg-white bg-opacity-10 p-4">
                  <h3 className="mb-3 text-sm font-medium text-theme">
                    Delivery Status
                  </h3>
                  <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
                    <StatusSelector
                      label="Morning"
                      value={deliveryData.morningStatus}
                      onChange={(value) =>
                        handleStatusChange('morningStatus', value)
                      }
                    />
                    <StatusSelector
                      label="Evening"
                      value={deliveryData.eveningStatus}
                      onChange={(value) =>
                        handleStatusChange('eveningStatus', value)
                      }
                    />
                    <StatusSelector
                      label="Night"
                      value={deliveryData.nightStatus}
                      onChange={(value) =>
                        handleStatusChange('nightStatus', value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="w-full p-2">
                <button
                  onClick={() => console.log('Update delivery details')}
                  className="w-full rounded-lg bg-theme px-4 py-2 font-medium text-white transition-colors hover:bg-theme/80"
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
