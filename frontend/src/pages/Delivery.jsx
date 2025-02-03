import { useState } from 'react';
import Heading from '../components/common/Heading';
import DeliveryTable from '../components/delivery/DeliveryTable';

const Delivery = () => {
  return (
    <div className="container py-10">
      <Heading title="Delivery Details" />

      <div className="my-12 flex flex-col items-center justify-center gap-4 text-lg font-medium md:flex-row md:justify-between">
        <h4>Date: {new Date().toLocaleDateString()}</h4>
        <h4>
          Progress: M: 80%(80/100) <span className="text-red-500">||</span> E:
          80%(80/100) <span className="text-red-500">||</span> N: 80%(80/100)
        </h4>
      </div>

      <DeliveryTable />
    </div>
  );
};

export default Delivery;
