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
            ElectricityData(_consumption, _billHash, block.timestamp, co2Equivalent)
        );
        emit ElectricityDataAdded(msg.sender, _consumption, co2Equivalent, _billHash, block.timestamp);
    }

     // Function to get electricity data for the caller
    function getElectricityData() public view returns (ElectricityData[] memory) {
        return electricityData[msg.sender];
    }

    // Function to get electricity data for a specific address
    function getElectricityDataByAddress(address _company) public view returns (ElectricityData[] memory) {
        return electricityData[_company];
    }
 
 //------------------------------------------------------------------------------------------------------------------------

  struct Material {
        string materialType;
        uint256 quantitySupplied;
    }

    struct RawMaterialData {
        address supplier; // The company adding raw material data
        Material[] materials;
        string billHash; // IPFS hash of the bill
        uint256 timestamp;
    }

    // Mapping to store raw material data for each company (by their wallet address)
    mapping(address => RawMaterialData[]) private rawMaterialRecords;

    // Event to notify when raw material data is added
    event RawMaterialDataAdded(
        address indexed company,
        string billHash,
        uint256 timestamp
    );

    // Function to add raw material data
    function addRawMaterialData(
        string[] memory _materialTypes,
        uint256[] memory _quantities,
        string memory _billHash
    ) public {
        require(_materialTypes.length == _quantities.length, "Mismatched array lengths");
        require(_materialTypes.length > 0, "Materials list cannot be empty");
        require(bytes(_billHash).length > 0, "Invalid bill hash");

        // Create an array in storage
        RawMaterialData storage newData = rawMaterialRecords[msg.sender].push();
        newData.supplier = msg.sender;
        newData.billHash = _billHash;
        newData.timestamp = block.timestamp;

        // Store each material individually
        for (uint256 i = 0; i < _materialTypes.length; i++) {
            newData.materials.push(Material({
                materialType: _materialTypes[i],
                quantitySupplied: _quantities[i]
            }));
        }

        emit RawMaterialDataAdded(msg.sender, _billHash, block.timestamp);
    }

    // Function to get raw material data for the caller
    function getRawMaterialData() public view returns (RawMaterialData[] memory) {
        return rawMaterialRecords[msg.sender];
    }

    // Function to get raw material data for a specific address
    function getRawMaterialDataByAddress(address _company) public view returns (RawMaterialData[] memory) {
        return rawMaterialRecords[_company];
    }

//---------------------------------------------------------------------------------------------------------------------------

    struct Fuel {
        string fuelType; // coal, natural gas, etc.
        uint256 quantitySupplied; // in metric tons or cubic meters
        uint256 lowerHeatingValue; // MJ/kg or BTU/lb
        uint256 carbonContent; // kg of carbon per unit
    }

    struct FuelData {
        address supplier; // The company adding fuel data
        Fuel[] fuels;
        string fuelBill; // IPFS hash of the fuel bill
        uint256 timestamp;
    }

    // Mapping to store fuel data for each company (by their wallet address)
    mapping(address => FuelData[]) private fuelRecords;

    // Event to notify when fuel data is added
    event FuelDataAdded(
        address indexed company,
        string fuelBill,
        uint256 timestamp
    );

    // Function to add fuel data
    function addFuelData(
        string[] memory _fuelTypes,
        uint256[] memory _quantities,
        uint256[] memory _lowerHeatingValues,
        uint256[] memory _carbonContents,
        string memory _fuelBill
    ) public {
        require(_fuelTypes.length == _quantities.length, "Mismatched array lengths");
        require(_fuelTypes.length > 0, "Fuel list cannot be empty");
        require(bytes(_fuelBill).length > 0, "Invalid bill hash");

        // Create a new fuel data entry in storage
        FuelData storage newData = fuelRecords[msg.sender].push();
        newData.supplier = msg.sender;
        newData.fuelBill = _fuelBill;
        newData.timestamp = block.timestamp;

        // Store each fuel type individually
        for (uint256 i = 0; i < _fuelTypes.length; i++) {
            newData.fuels.push(Fuel({
                fuelType: _fuelTypes[i],
                quantitySupplied: _quantities[i],
                lowerHeatingValue: _lowerHeatingValues[i],
                carbonContent: _carbonContents[i]
            }));
        }

        emit FuelDataAdded(msg.sender, _fuelBill, block.timestamp);
    }

    // Function to get fuel data for the caller
    function getFuelData() public view returns (FuelData[] memory) {
        return fuelRecords[msg.sender];
    }

    // Function to get fuel data for a specific address
    function getFuelDataByAddress(address _company) public view returns (FuelData[] memory) {
        return fuelRecords[_company];
    }


}
