import React from 'react';
import './Form.css';  // Reuse the same CSS file for consistent styling

const Scope3Form = () => {
  return (
    <div className="form-container">
      <form className="custom-form">
        <h1>Scope 3 Emissions</h1>
        <label>Purchased goods and services (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Capital goods (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Fuel and energy-related activities (not included in Scopes 1 or 2) (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Upstream transportation and distribution (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Waste generated in operations (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Business travel (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Employee commuting (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Upstream leased assets (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Downstream transportation and distribution (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Processing of sold products (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Use of sold products (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>End of life treatment of sold products (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Downstream leased assets (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Franchises (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Investments (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Other (upstream) (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <label>Other (downstream) (metric tons CO2e)</label>
        <input type="number" placeholder="Enter value" />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Scope3Form;
