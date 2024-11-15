import Web3 from 'web3';
// import CarbonFootprint from '.../truffle/contracts/CarbonFootprint.json'; // Path to Truffle contract JSON
import CarbonFootprint from '../contracts/CarbonFootprint.json';

let web3;
let contract;

export const initializeWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CarbonFootprint.networks[networkId];
        contract = new web3.eth.Contract(
            CarbonFootprint.abi,
            deployedNetwork && deployedNetwork.address
        );
        return { web3, contract };
    } else {
        console.log("Please install MetaMask to interact with this application.");
    }
};

export const getContractInstance = () => {
    return contract;
};