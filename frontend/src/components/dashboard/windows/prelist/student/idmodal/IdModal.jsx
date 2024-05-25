import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';

export default function IdModal({ isOpen, onClose, studentName, studentCourse, studentId, studentContactNo, studentAddress }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePrintID = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: 'ID Printed',
        description: `ID for ${studentName} has been printed successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{studentName} - Student ID: {studentId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card maxW='sm' bg="gold" border="2px">
            <CardBody>
              <Image
                src='https://bit.ly/code-beast'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                rounded="full"
                p="20px"
              />
              <Stack mt='2' spacing='1' align='center' justify='center' bg="purple.800" p="10px" rounded="lg">
                <Heading size='md' color="white">{studentName}</Heading>
                <Text fontSize='xs' color="white">ID No. {studentId}</Text>
                <Text fontWeight="50px" fontSize='2xl' textAlign='center' color="white">
                  {studentCourse}
                </Text>
                <Text fontSize='xs' color="white">Contact No. : {studentContactNo}</Text>
                <Text fontSize='xs' color="white">Address: {studentAddress}</Text> {/* Display the address */}
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter bg="purple.800" align='center' justify='center' p="10px">
              <Text fontSize='xs' color="white">Course: {studentCourse}</Text>
            </CardFooter>
          </Card>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing='2'>
            <Button
              variant='solid'
              colorScheme='blue'
              onClick={handlePrintID}
              isLoading={isLoading}
              loadingText='Printing...'
            >
              Print ID
            </Button>
            <Button variant='ghost' colorScheme='blue' onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
