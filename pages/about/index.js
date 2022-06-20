import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import axiosInstance from "../../services/axios";

function About(props) {
  const renderChiefs = () => {
    return props.chiefs.map((chief) => (
      <Box key={chief.id} w="30%" p={2} rounded={6}>
        <img style={{ width: "100%", height: "73.5%" }} src={chief.image} />
        <Text fontSize="lg">{chief.name}</Text>
        <Text fontSize="md">{chief.position}</Text>
      </Box>
    ));
  };

  return (
    <Box>
      <Heading mb={5}>About Us</Heading>
      <Text mb={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque
        habitant morbi tristique senectus et netus et malesuada. Eleifend donec
        pretium vulputate sapien nec. Adipiscing bibendum est ultricies integer
        quis auctor elit sed vulputate. Convallis a cras semper auctor neque
        vitae tempus quam pellentesque. Ut etiam sit amet nisl purus in mollis
        nunc sed. Tempus quam pellentesque nec nam aliquam sem et tortor. Tellus
        integer feugiat scelerisque varius morbi enim nunc. Eu facilisis sed
        odio morbi quis. Adipiscing diam donec adipiscing tristique. Ut tellus
        elementum sagittis vitae et leo duis ut. Lacus sed viverra tellus in hac
        habitasse. Fringilla est ullamcorper eget nulla. Placerat vestibulum
        lectus mauris ultrices eros in. Ut placerat orci nulla pellentesque
        dignissim enim. Magna sit amet purus gravida quis. Duis tristique
        sollicitudin nibh sit amet. Odio eu feugiat pretium nibh ipsum
        consequat. Nunc sed blandit libero volutpat sed cras ornare.
      </Text>
      <Text>
        Enim nunc faucibus a pellentesque. Odio ut sem nulla pharetra diam sit.
        At imperdiet dui accumsan sit amet nulla. Eget magna fermentum iaculis
        eu non diam phasellus vestibulum lorem. Tempor nec feugiat nisl pretium.
        Id porta nibh venenatis cras sed felis eget velit aliquet. Dictumst
        vestibulum rhoncus est pellentesque elit ullamcorper. Lorem sed risus
        ultricies tristique. Aliquam ut porttitor leo a diam sollicitudin tempor
        id eu. Rhoncus est pellentesque elit ullamcorper dignissim cras
        tincidunt lobortis. Sit amet aliquam id diam maecenas ultricies mi eget.
        Viverra justo nec ultrices dui sapien. Scelerisque mauris pellentesque
        pulvinar pellentesque habitant morbi. Orci a scelerisque purus semper
        eget duis at. Ut sem viverra aliquet eget sit. Massa vitae tortor
        condimentum lacinia quis vel eros. Nunc sed augue lacus viverra vitae
        congue eu consequat. Urna id volutpat lacus laoreet non curabitur
        gravida arcu.
      </Text>
      <Flex justifyContent="space-around">{renderChiefs()}</Flex>
    </Box>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await axiosInstance.get("/chiefs");
    return {
      props: { chiefs: res.data },
    };
  } catch (error) {
    throw error;
  }
}

export default About;
