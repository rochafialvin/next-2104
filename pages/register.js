import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import axiosInstance from "../services/axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterProcess, setisRegisterProcess] = useState(false);

  const onRegisterClick = async () => {
    try {
      setisRegisterProcess(true);
      const body = {
        username,
        email,
        password,
      };
      const res = await axiosInstance.post("/users", body);
      alert(res.data.message);
    } catch (error) {
      console.log({ error });
      alert(error.response.data.message);
    } finally {
      // akan dijalankan di akhir, terlepas proses di try berhasil ataupun gagal lalu masuk ke catch
      setisRegisterProcess(false);
    }
  };

  return (
    <Flex height="85vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.400" p={12} rounded={6}>
        <Heading mb={6}>Register</Heading>
        <Input
          type="text"
          value={username}
          placeholder="yourname"
          variant="filled"
          mb={3}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          type="text"
          value={email}
          placeholder="your@mail.com"
          variant="filled"
          mb={3}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="**************"
          variant="filled"
          mb={6}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          isLoading={isRegisterProcess}
          colorScheme="teal"
          onClick={onRegisterClick}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
}

export default Register;
