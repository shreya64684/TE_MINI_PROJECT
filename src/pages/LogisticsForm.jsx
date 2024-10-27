// LogisticsDataForm.js
import React, { useState } from 'react';

const LogisticsDataForm = () => {
  const [formData, setFormData] = useState({
    partnerId: '',
    transportType: '',
    distanceCovered: '',
    loadVolume: '',
    fuelType: '',
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
      <div className="text-3xl font-medium text-green-700">Logistics Partner Data Form</div>
      <div className="mb-4">
        <label htmlFor="partnerId" className="block text-sm font-medium text-green-700">Partner ID</label>
        <input
          type="text"
          name="partnerId"
          id="partnerId"
          placeholder="Enter Partner ID"
          value={formData.partnerId}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="transportType" className="block text-sm font-medium text-green-700">Transport Type</label>
        <input
          type="text"
          name="transportType"
          id="transportType"
          placeholder="Enter Transport Type"
          value={formData.transportType}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="distanceCovered" className="block text-sm font-medium text-green-700">Distance Covered</label>
        <input
          type="number"
          name="distanceCovered"
          id="distanceCovered"
          placeholder="Enter Distance Covered (km/miles)"
          value={formData.distanceCovered}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="loadVolume" className="block text-sm font-medium text-green-700">Load Volume</label>
        <input
          type="number"
          name="loadVolume"
          id="loadVolume"
          placeholder="Enter Load Volume (weight)"
          value={formData.loadVolume}
          onChange={handleChange}
          className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          required
        />
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

export default LogisticsDataForm;
