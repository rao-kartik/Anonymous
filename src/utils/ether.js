import { ethers } from 'ethers';

export const checkAccountConnectivity = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });

  return accounts?.length > 0;
};

export const getEtherSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();

  const _signer = provider.getSigner(accounts[0]);

  return { signer: _signer, account: accounts[0] };
};
