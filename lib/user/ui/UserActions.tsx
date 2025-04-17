import { useRouter } from "next/router";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  Box,
} from "@ui/index";
import { FiUser } from "react-icons/fi";

export const UserActions = ({
  rowData,
  refetch,
}: {
  rowData: any;
  refetch: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonGroup
        spacing="0"
        colorScheme="green"
        variant="ghost"
        size="sm"
        float="left"
      >
        <Tooltip label="Details">
          <IconButton icon={<FiUser />} aria-label="Details" onClick={onOpen} />
        </Tooltip>
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={3}>
              <Box>
                <Text fontWeight="bold">Name:</Text>
                <Text>
                  {rowData.firstName} {rowData.lastName}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Email:</Text>
                <Text>{rowData.email}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Role:</Text>
                <Text>{rowData.role}</Text>
              </Box>
              {/* Add more user details as needed */}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
