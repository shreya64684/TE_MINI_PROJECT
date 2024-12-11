import React from 'react';

const userTypes = [
    'Admin',
    'Company',
    'RawMaterialProvider',
    'FuelProvider',
    'GoodsSupplier',
    'LogisticsPartner',
    'ElectricitySupplier' 
];

const UserTypeDropdown = ({ selectedType, setSelectedType }) => {
    return (
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
            <option value="" disabled>Select User Type</option>
            {userTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
            ))}
        </select>
    );
};

export default UserTypeDropdown;
