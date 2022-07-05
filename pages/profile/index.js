import React from "react";
import { getSession } from "next-auth/react";
import axiosInstance from "../../services/axios";
import { Text } from "@chakra-ui/react";
import Image from "next/image";
import { api_origin } from "../../constraint";

function Profile(props) {
  const { username, first_name, last_name, email, gender, phone, image } =
    props.user;
  const imgSource = api_origin + image;
  return (
    <>
      <Image src={imgSource} width={200} height={200} />
      <Text>Username : {username}</Text>
      <Text>First name : {first_name}</Text>
      <Text>Last name : {last_name}</Text>
      <Text>Email : {email}</Text>
      <Text>Gender : {gender}</Text>
      <Text>Phone : {phone}</Text>
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
