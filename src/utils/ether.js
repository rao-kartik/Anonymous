import { BrowserProvider, Contract } from 'ethers';
import { Buffer } from 'buffer';
import { triggerAlert } from './common';
import fundraiser from './configs/Fundraiser.json';

export const checkAccountConnectivity = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });

  return accounts?.length > 0;
};

export const getEtherSigner = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const accounts = await provider.listAccounts();

  return { provider, signer: accounts?.[0]?.provider, account: accounts?.[0]?.address };
};

export const signTransaction = async (message, from) => {
  if (typeof window !== 'undefined') {
    let address = from;
    message = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

    if (!from) {
      address = await getEtherSigner();
      address = address?.account;
    }

    await window?.ethereum?.request({
      method: 'personal_sign',
      params: [message, address],
    });
  }
};

export const connectToContract = async () => {
  try {
    const abi = fundraiser?.abi;

    const { signer } = await getEtherSigner();

    const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDR, abi, signer);
    return contract;
  } catch (err) {
    triggerAlert('error', err?.message);
    throw err;
  }
};
