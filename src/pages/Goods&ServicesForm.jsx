// GoodsAndServicesForm.js
import React, { useState } from 'react';
import "./Form.css";

const GoodsServicesForm = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    itemType: '',
    quantityOrVolume: '',
    reportingPeriod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg border border-green-500">
      <div className="text-3xl font-medium text-green-700">Goods & Services Data Form</div>
      <div className="mb-4">
        <label htmlFor="supplierId" className="block text-sm font-medium text-green-700">Supplier ID</label>
        <input
          type="text"
          name="supplierId"
          id="supplierId"
          placeholder="Enter Supplier ID"
          value={formData.supplierId}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="itemType" className="block text-sm font-medium text-green-700">Item Type</label>
        <input
          type="text"
          name="itemType"
          id="itemType"
          placeholder="Enter Item Type"
          value={formData.itemType}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantityOrVolume" className="block text-sm font-medium text-green-700">Quantity or Volume</label>
        <input
          type="number"
          name="quantityOrVolume"
          id="quantityOrVolume"
          placeholder="Enter Quantity or Volume"
          value={formData.quantityOrVolume}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reportingPeriod" className="block text-sm font-medium text-green-700">Reporting Period</label>
        <input
          type="text"
          name="reportingPeriod"
          id="reportingPeriod"
          placeholder="Enter Reporting Period"
          value={formData.reportingPeriod}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default GoodsServicesForm;
