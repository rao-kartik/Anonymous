import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { triggerAlert } from '../../../utils/common';
import { categoryOptions } from '../../../Containers/Fundraisers/util';
import { useDispatch, useSelector } from 'react-redux';
import { setFundraiserReducer } from '../../../Containers/Fundraisers/fundraiserSlice';
import { REDUCERS } from '../../../constants';
import { spinnerConfig } from '../../../styles/varaibles';

const NewFundraiser = (props) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state[REDUCERS.fundraiser]);

  const { open, onClose, contract } = props;

  const [formData, setFormData] = useState();
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!transactionDetails) {
      try {
        dispatch(setFundraiserReducer({ loader: { newFundraiser: true } }));
        const tx = await contract.startFundRaiser(
          formData?.raisedFor,
          formData?.amount,
          formData?.toBeRaisedInDays,
          formData?.about,
          formData?.category,
          { gasLimit: 400000 }
        );

        setTransactionDetails(tx);
        triggerAlert('success', 'Fundraiser Started Successfully');
        setFormData(null);
        dispatch(setFundraiserReducer({ loader: { newFundraiser: false } }));
        onClose();
        window?.location?.reload();
        return;
      } catch (err) {
        triggerAlert('error', err.message, 3000);
        dispatch(setFundraiserReducer({ loader: { newFundraiser: false } }));
        return;
      }
    } else {
      onClose();
      setFormData(null);
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={700} maxW={700} maxH="auto">
        <ModalHeader>Start Fundraiser</ModalHeader>

        <ModalBody>
          <form>
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Raising For (address)</FormLabel>
                  <Input
                    type="text"
                    name="raisedFor"
                    onChange={handleFormDataChange}
                    value={formData?.raisedFor}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Amount to Raise (in Wei)</FormLabel>
                  <Input
                    type="number"
                    name="amount"
                    onChange={handleFormDataChange}
                    value={formData?.amount}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>About Fundraiser</FormLabel>
                  <Textarea
                    type="number"
                    name="about"
                    onChange={handleFormDataChange}
                    value={formData?.about}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Time Required to Raise (in days)</FormLabel>
                  <Input type="number" name="toBeRaisedInDays" onChange={handleFormDataChange} />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select Category"
                    name="category"
                    onChange={handleFormDataChange}
                  >
                    {categoryOptions?.map((_opt, _i) => (
                      <option key={_opt} value={_i} style={{ textTransform: 'capitalize' }}>
                        {_opt?.toLowerCase()}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            </Grid>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit}>
            {loader?.newFundraiser ? <Spinner {...spinnerConfig} /> : 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewFundraiser;
