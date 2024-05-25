import React from 'react';
import { EditIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  WrapItem,
} from '@chakra-ui/react';

export default function Settings({ userName, userEmail, userCourse, userDateOfBirth, userParent, userContactNo, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const showtoast = () => {
    toast({
      title: 'Updated',
      description: 'Updated details successfully',
      duration: 5000,
      isClosable: true,
      status: 'warning',
      position: 'top'
    });
    onUpdate(); // Call the onUpdate function passed as prop after updating
  };

  return (
    <>
      <SimpleGrid>
        <Card borderTop="8px" borderColor="purple.400" bg="white">
          <CardHeader bg="purple.100">
            <Flex gap={2}>
              <Box w="120px" h="100px">
                <WrapItem>
                  <Avatar size='xl' name={userName} src='https://bit.ly/code-beast' />
                </WrapItem>
              </Box>
              <Box>
                <Heading as="h3" size="sm">{userName}</Heading>
                <Text>{userEmail}</Text>
              </Box>
            </Flex>
          </CardHeader>

          <Divider borderColor="gray.400" />

          <CardBody bg="purple.50">
  <List spacing={3}>
    <ListItem>
      <ListIcon as={InfoIcon} color='green.500' />
      Name: {userName}
    </ListItem>
    <ListItem>
      <ListIcon as={InfoIcon} color='green.500' />
      Email: {userEmail}
    </ListItem>
    <ListItem>
      <ListIcon as={InfoIcon} color='green.500' />
      Course: {userCourse}
    </ListItem>
    <ListItem>
      <ListIcon as={InfoIcon} color='green.500' />
      Date of Birth: {userDateOfBirth}
    </ListItem>
    <ListItem>
      <ListIcon as={InfoIcon} color='green.500' />
      Parent: {userParent}
    </ListItem>
    <ListItem>
      <ListIcon as={InfoIcon} color='green.500' />
      Contact No.: {userContactNo}
    </ListItem>
    {/* Add more ListItem components for additional details */}
  </List>
</CardBody>


          <Divider borderColor="gray.400" />

          <CardFooter borderBottom="8px" borderColor="purple.400">
            <HStack>
              <Button onClick={onOpen} variant="ghost" leftIcon={<EditIcon />}>Edit Personal Details</Button>
            </HStack>
          </CardFooter>
        </Card>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Personal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxW="480px">
          <FormControl isRequired>
            <FormLabel>Name:</FormLabel>
            <Input type="text" name="name" defaultValue={userName} placeholder="User Name" />
            <FormHelperText>Input a valid name</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input type="email" name="email" defaultValue={userEmail} placeholder="user@example.com" />
            <FormHelperText>Input a valid email</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Course:</FormLabel>
            <Input type="text" name="course" defaultValue={userCourse} placeholder="Course" />
            <FormHelperText>Input the course</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date of Birth:</FormLabel>
            <Input type="date" name="dateOfBirth" defaultValue={userDateOfBirth} />
            <FormHelperText>Select the date of birth</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Parent:</FormLabel>
            <Input type="text" name="parent" defaultValue={userParent} placeholder="Parent's Name" />
            <FormHelperText>Input the parent's name</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Contact No.:</FormLabel>
            <Input type="tel" name="contactNo" defaultValue={userContactNo} placeholder="Contact Number" />
            <FormHelperText>Input the contact number</FormHelperText>
          </FormControl>
        </ModalBody>


          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" variant='ghost' onClick={showtoast}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
