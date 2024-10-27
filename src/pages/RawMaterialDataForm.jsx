// RawMaterialDataForm.js
import React, { useState } from 'react';

const RawMaterialDataForm = () => {
  const [formData, setFormData] = useState({
    providerId: '',
    materialType: '',
    quantitySupplied: '',
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
      <div className="text-3xl font-medium text-green-700">Raw Material Data Form</div>
      <div className="mb-4">
        <label htmlFor="providerId" className="block text-sm font-medium text-green-700">Provider ID</label>
        <input
          type="text"
          name="providerId"
          id="providerId"
          placeholder="Enter Provider ID"
          value={formData.providerId}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="materialType" className="block text-sm font-medium text-green-700">Material Type</label>
        <input
          type="text"
          name="materialType"
          id="materialType"
          placeholder="Enter Material Type"
          value={formData.materialType}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantitySupplied" className="block text-sm font-medium text-green-700">Quantity Supplied</label>
        <input
          type="number"
          name="quantitySupplied"
          id="quantitySupplied"
          placeholder="Enter Quantity Supplied"
          value={formData.quantitySupplied}
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

export default RawMaterialDataForm;