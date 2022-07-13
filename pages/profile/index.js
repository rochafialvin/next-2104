import React, { useState } from "react";
import { getSession } from "next-auth/react";
import axiosInstance from "../../services/axios";
import { Text, VStack, Button, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { api_origin } from "../../constraint";
import EditProfile from "../../components/edit-profile";

function Profile(props) {
  const [avatar, setAvatar] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgSource, setimgSource] = useState(api_origin + props.user.image);

  const { username, first_name, last_name, email, gender, phone } = props.user;

  const onFileChange = (event) => {
    setAvatar(event.target.files[0]);
    setimgSource(URL.createObjectURL(event.target.files[0]));
  };

  const onSaveButton = async () => {
    try {
      const session = await getSession();

      const { accessToken } = session.user;

      const body = new FormData();

      body.append("hendra", avatar);
      // body.append("namaProduct", "Pop Mie")
      // body.append("stock", 1000)

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const res = await axiosInstance.patch("/users/avatar", body, config);

      alert(res.data.message);
    } catch (error) {
      console.log({ Error });
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <VStack>
        <Image src={imgSource} width={200} height={200} />
        <input type={"file"} onChange={onFileChange} />
        <Button variant={"ghost"} onClick={onSaveButton}>
          Save
        </Button>
      </VStack>
      <Text>Username : {username}</Text>
      <Text>First name : {first_name}</Text>
      <Text>Last name : {last_name}</Text>
      <Text>Email : {email}</Text>
      <Text>Gender : {gender}</Text>
      <Text>Phone : {phone}</Text>
      <Button variant={"ghost"} onClick={onOpen}>
        Edit Profile
      </Button>
      <EditProfile isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const res = await axiosInstance.get("/users/profile", config);

    return {
      props: { user: res.data.data.result, session },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Profile;
