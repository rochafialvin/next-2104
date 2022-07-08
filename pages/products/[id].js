import { Box, HStack, Text, Button } from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { api_origin } from "../../constraint";

function ProductDetail(props) {
  const { product } = props;
  const { variant, image, price, origin, description } = product;
  // image : /public/product/default-noodle.jpg
  // api_origin : http://localhost:2104
  // imageSource : http://localhost:2104/public/product/default-noodle.jpg
  const imageSource = api_origin + image;

  return (
    <HStack>
      <Image src={imageSource} alt={variant} width={550} height={368} />
      <Box p={2}>
        <Text mb={3}>{variant}</Text>
        <Text mb={3}>{origin}</Text>
        <Text mb={2}>{description}</Text>
        <Text>Rp. {price.toLocaleString("id")}</Text>
        <Button variant="ghost">Add</Button>
      </Box>
    </HStack>
  );
}

// getServerSideProps akan dijalankan di server, sehingga tidak mengenali alert
export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const { id } = context.params;

    const res = await axiosInstance.get(`/products/${id}`, config);

    return {
      props: { product: res.data.data.result },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: { product: {} },
    };
  }
}

export default ProductDetail;
