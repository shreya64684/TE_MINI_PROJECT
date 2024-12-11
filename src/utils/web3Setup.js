import Web3 from 'web3';
// import CarbonFootprint from '.../truffle/contracts/CarbonFootprint.json'; // Path to Truffle contract JSON
import CarbonFootprint from '../contracts/CarbonFootprint.json';

let web3;
let contract;


export const initializeWeb3 = async () => {
    try {
        // Check if the browser has MetaMask or any Ethereum provider
        if (window.ethereum) {
            // Create a Web3 instance
            web3 = new Web3(window.ethereum);
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // const accounts = await web3.eth.getAccounts();
        // console.log('Accounts detected:', accounts);

        // if (!accounts || accounts.length < 2) {
        //     alert("Ganache may not be connected properly or Metamask is not switched to Ganache's Localhost network.");
        // }

        // const networkId = 5777; 
        // console.log("Using Ganache Network ID:", networkId);

        // Get the network ID of the connected Ethereum network
        const networkId = await web3.eth.net.getId();
        console.log("Network ID:", networkId);

        const deployedNetwork = CarbonFootprint.networks[networkId.toString()];
        if (!deployedNetwork) {
            throw new Error(`No deployed contract found for Ganache network with ID ${networkId}`);
        }
        console.log("Deployed Network: ",deployedNetwork);

        console.log("CarbonFootprint networks: ", CarbonFootprint.networks);
        console.log("Network ID: ", networkId);
        contract = new web3.eth.Contract(
            CarbonFootprint.abi,
            deployedNetwork.address
        );
        console.log("Contract initialized at address: ", contract.options.address);
      
        return { web3, contract };
    } else {
        console.log("Please install MetaMask to interact with this application.");
    }
    } catch (error) {
        console.error("Failed to initialize Web3:", error);
        throw error;
    }
};

export const switchToGanacheNetwork = async () => {
    const GANACHE_CHAIN_ID = '0x539'; // Hexadecimal for 1337 (Ganache default chain ID)

    try {
        // Request Metamask to switch to the Ganache network
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: GANACHE_CHAIN_ID }],
        });
        console.log("Switched to Ganache network!");
    } catch (error) {
        // If the network is not added to Metamask, add it
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: GANACHE_CHAIN_ID,
                            chainName: "Ganache Localhost",
                            rpcUrls: ["http://127.0.0.1:7545"],
                            nativeCurrency: {
                                name: "Ethereum",
                                symbol: "ETH",
                                decimals: 18,
                            },
                        },
                    ],
                });
                console.log("Ganache network added and switched!");
            } catch (addError) {
                console.error("Failed to add Ganache network", addError);
            }
        } else {
            console.error("Failed to switch to Ganache network", error);
        }
    }
};


export const getContractInstance = () => {
    if (!contract) {
        throw new Error("Contract is not initialized yet. Call initializeWeb3 first.");    
    }
    return contract;
};

export const getWeb3Instance = () => {
    if (!web3) {
        throw new Error("Web3 is not initialized. Call initializeWeb3 first.");
    }
    return web3;
};