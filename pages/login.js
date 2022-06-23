import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import axiosInstance from "../services/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async () => {
    try {
      const resGetUsername = await axiosInstance.get("/users", {
        params: { username },
      });
      const resUsername = resGetUsername.data[0];
      if (resUsername) return alert("Username sudah digunakan");

      const resGetEmail = await axiosInstance.get("/users", {
        params: { email },
      });
      const resEmail = resGetEmail.data[0];
      if (resEmail) return alert("Email sudah digunakan");

      await axiosInstance.post("/users", { username, email, password });
      alert("Register berhasil");
    } catch (error) {
      console.log({ error });
      alert("Error nich ~");
    }
  };

  return (
    <Flex height="85vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.400" p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
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

        <Button colorScheme="teal" onClick={onLoginClick}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
