// FuelDataForm.js
import React, { useState } from 'react';

const FuelDataForm = () => {
  const [formData, setFormData] = useState({
    providerId: '',
    suppliedto: '',
    fuelType: '',
    quantitySupplied: '',
    lowerHeatingValue: '',
    carbonContent: '',
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
      <div className="text-3xl font-medium text-green-700">Fuel Data Form</div>
      <div className="mb-4 flex justify-between">
        <div className='block'>
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
        <div className='block'>
          <label htmlFor="suppliedto" className="block text-sm font-medium text-green-700">Supplied To</label>
          <input
            type="text"
            name="suppliedto"
            id="suppliedto"
            placeholder="Enter Supplier To company"
            value={formData.suppliedto}
            onChange={handleChange}
            className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="fuelType" className="block text-sm font-medium text-green-700">Fuel Type</label>
        <input
          type="text"
          name="fuelType"
          id="fuelType"
          placeholder="Enter Fuel Type"
          value={formData.fuelType}
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
        <label htmlFor="lowerHeatingValue" className="block text-sm font-medium text-green-700">Lower Heating Value</label>
        <input
          type="number"
          name="lowerHeatingValue"
          id="lowerHeatingValue"
          placeholder="Enter Lower Heating Value"
          value={formData.lowerHeatingValue}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="carbonContent" className="block text-sm font-medium text-green-700">Carbon Content</label>
        <input
          type="number"
          name="carbonContent"
          id="carbonContent"
          placeholder="Enter Carbon Content"
          value={formData.carbonContent}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
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

export default FuelDataForm;
