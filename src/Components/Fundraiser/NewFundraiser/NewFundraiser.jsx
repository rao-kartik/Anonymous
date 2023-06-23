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
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startFundRaiserThunk } from '../../../Containers/Fundraisers/fundraiserThunk';

const categoryOptions = [
  'EDUCATION',
  'MEDICAL',
  'WOMANANDGIRLS',
  'ANIMALS',
  'CREATIVE',
  'FOODANDHUNGER',
  'ENVIRONMENT',
  'CHILDREN',
  'MEMORIAL',
  'COMMUNITYDEVELOPMENT',
  'OTHERS',
];

const NewFundraiser = (props) => {
  const { open, onClose, contractDetails } = props;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState();

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(startFundRaiserThunk({ data: formData, contractDetails }));
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
                  <Input type="text" name="raisedFor" onChange={handleFormDataChange} />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Amount to Raise (in Wei)</FormLabel>
                  <Input type="number" name="amount" onChange={handleFormDataChange} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>About Fundraiser</FormLabel>
                  <Textarea type="number" name="about" onChange={handleFormDataChange} />
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
                    {categoryOptions?.map((_opt) => (
                      <option key={_opt} value={_opt} style={{ textTransform: 'capitalize' }}>
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
          <Button onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewFundraiser;
