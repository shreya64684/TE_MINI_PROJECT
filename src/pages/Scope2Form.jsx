import React from 'react';
import './Form.css';  // Reuse the same CSS file for consistent styling

const Scope2Form = () => {
  return (
    <div className="form-container">
      <form className="custom-form">
        <h1>Scope 2 Emissions</h1>
        <label>Electricity (metric tons CO2e)</label>
        <input type="number" placeholder="Enter electricity usage" />

        <label>Heat (metric tons CO2e)</label>
        <input type="number" placeholder="Enter heat usage" />

        <label>Steam (metric tons CO2e)</label>
        <input type="number" placeholder="Enter steam usage" />

        <label>Cooling (metric tons CO2e)</label>
        <input type="number" placeholder="Enter cooling usage" />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Scope2Form;
