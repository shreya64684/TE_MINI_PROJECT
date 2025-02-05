// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./UserRoleManagement.sol";

contract CarbonFootprint {
    struct ElectricityData {
        uint256 consumption; // in MWH
        string billHash;     // IPFS hash of the bill
        uint256 timestamp;   // Timestamp of the data addition
        uint256 equivalentCO2; // in kg
    }

    // Mapping to store electricity data for each company (by their wallet address)
    mapping(address => ElectricityData[]) public electricityData;

    // Event to notify when electricity data is added
    event ElectricityDataAdded(address indexed company, uint256 consumption,  uint256 equivalentCO2, string billHash, uint256 timestamp);

    // Function to calculate equivalent CO2 emissions from electricity consumption
    function calculateEquivalentCO2(uint256 _consumption) public pure returns (uint256) {
        uint256 kwh = _consumption * 1000; // Convert MWh to KWh
        return (kwh * 82) / 100; // Emission factor: 1 KWh = 0.82 kg CO2
    }

    function addElectricityData(uint256 _consumption, string memory _billHash) public {
        require(_consumption > 0, "Electricity consumption must be greater than 0");

        // Calculate equivalent CO2 using the separate function
        uint256 co2Equivalent = calculateEquivalentCO2(_consumption);

         // Add data to the mapping
        electricityData[msg.sender].push(
            ElectricityData(_consumption, _billHash, block.timestamp)
        );
        emit ElectricityDataAdded(msg.sender, _consumption, _billHash, block.timestamp);
    }

     // Function to get electricity data for the caller
    function getElectricityData() public view returns (ElectricityData[] memory) {
        return electricityData[msg.sender];
    }

    // Function to get electricity data for a specific address
    function getElectricityDataByAddress(address _company) public view returns (ElectricityData[] memory) {
        return electricityData[_company];
    }


    struct Material {
        string materialType; // e.g., limestone, clay, etc.
        uint256 quantitySupplied; // in metric tons
    }

    struct RawMaterialData {
        Material[] materials; // List of supplied materials
        string billHash; // IPFS hash of the raw material bill
        uint256 timestamp; // Timestamp of the data addition
    }

}
