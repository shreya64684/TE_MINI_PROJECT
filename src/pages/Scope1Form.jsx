import React from 'react';
import './Form.css';  // Reuse this CSS file for all Scope forms

const Scope1Form = () => {
  return (
    <div className="form-container">
      <form className="custom-form">
        <h1>Scope 1 Emissions</h1>
        <label>Fuel Consumption (metric tons CO2e)</label>
        <input type="number" placeholder="Enter fuel consumption" />

        <label>Owned Transport Emission (metric tons CO2e)</label>
        <input type="number" placeholder="Enter transport emission" />

        <label>Process Emission (metric tons CO2e)</label>
        <input type="number" placeholder="Enter process emission" />

        <label>Fugitive Emissions (metric tons CO2e)</label>
        <input type="number" placeholder="Enter fugitive emissions" />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Scope1Form;
