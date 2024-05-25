require('dotenv').config();
const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

const provider = new Web3.providers.HttpProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);
const web3 = new Web3(provider);

const contractAbiPath = path.resolve(
  __dirname,
  '../contracts/contractAbi.json'
);
const contractABI = JSON.parse(fs.readFileSync(contractAbiPath, 'utf8'));

const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(contractABI, contractAddress);

const getContractBalance = async () => {
  try {
    const balance = await web3.eth.getBalance(contractAddress);
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('Error retrieving balance: ', error);
    throw new Error('Failed to retrieve balance');
  }
};

module.exports = {
  contract,
  getContractBalance,
};
