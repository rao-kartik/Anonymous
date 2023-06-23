import { ethers } from 'ethers';
import { Buffer } from 'buffer';

export const checkAccountConnectivity = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });

  return accounts?.length > 0;
};

export const getEtherSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();

  const _signer = provider.getSigner(accounts[0]);

  return { provider, signer: _signer, account: accounts[0] };
};

export const signTransaction = async (message, from) => {
  if (typeof window !== 'undefined') {
    let address = from;
    message = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

    if (!from) {
      address = await getEtherSigner();
      address = address.account;
    }
    await window?.ethereum?.request({
      method: 'personal_sign',
      params: [message, address],
    });
  }
};
