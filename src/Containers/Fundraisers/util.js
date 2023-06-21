import fundraiser from './Fundraiser.json';
import { ethers } from 'ethers';

export const connectToContract = () => {
  const abi = fundraiser?.abi;

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_PLATFORM_URL + (process.env.REACT_APP_PLATFORM_KEY || '')
  );

  const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDR, abi, provider);
  return contract;
};
