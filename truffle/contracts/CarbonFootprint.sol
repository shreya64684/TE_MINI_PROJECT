// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonFootprint {
    struct ElectricityData {
        string companyName;
        uint256 consumption; // in MWH
        string billHash;     // IPFS hash of the bill
        uint256 timestamp;
    }

    mapping(address => ElectricityData[]) public electricityData;

    event ElectricityDataAdded(address indexed company, uint256 consumption, string billHash, uint256 timestamp);

    function addElectricityData(string memory _companyName, uint256 _consumption, string memory _billHash) public {
        electricityData[msg.sender].push(ElectricityData(_companyName, _consumption, _billHash, block.timestamp));
        emit ElectricityDataAdded(msg.sender, _consumption, _billHash, block.timestamp);
    }
}
