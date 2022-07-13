import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function EditProfile({ isOpen, onClose, userProfile }) {
  // userProfile : { username, first_name, last_name, email, gender, phone }
  const [user, setUser] = useState(userProfile);
  const { username, first_name, last_name, email, gender, phone } = user;

  const onHandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="username"
            type="text"
            value={username}
            disabled
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="first_name"
            type="text"
            value={first_name}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="last_name"
            type="text"
            value={last_name}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="email"
            type="text"
            value={email}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="gender"
            type="text"
            value={gender}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="phone"
            type="text"
            value={phone}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;
