import { ethers } from 'ethers';

export const getEtherSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();

  const _signer = provider.getSigner(accounts[0]);

  return { signer: _signer, account: accounts[0] };
};
