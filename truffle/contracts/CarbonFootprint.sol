// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./UserRoleManagement.sol";

contract CarbonFootprint {
    struct ElectricityData {
        uint256 consumption; // in MWH
        string billHash;     // IPFS hash of the bill
        uint256 timestamp;   // Timestamp of the data addition
    }

    // Mapping to store electricity data for each company (by their wallet address)
    mapping(address => ElectricityData[]) public electricityData;

    // Event to notify when electricity data is added
    event ElectricityDataAdded(address indexed company, uint256 consumption, string billHash, uint256 timestamp);

    function addElectricityData(uint256 _consumption, string memory _billHash) public {
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
}
