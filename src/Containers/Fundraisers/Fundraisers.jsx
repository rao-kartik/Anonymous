import React, { useEffect, useRef, useState } from 'react';
import Header from '../../Components/Common/Header/Header';
import { connectToContract } from './util';

const Fundraisers = () => {
  const contractFetched = useRef(false);
  const [contractData, setContractData] = useState();

  

  useEffect(() => {
    if (!contractFetched?.current) {
      setContractData(connectToContract());
      contractFetched.current = true;
    }
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default Fundraisers;
