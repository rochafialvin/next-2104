import { Box, HStack, Text, Button, Input } from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { api_origin } from "../../constraint";
import { useState } from "react";

function ProductDetail(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const { product_id, variant, image, price, origin, description } = product;
  const imageSource = api_origin + image;

  const onAddToCart = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const body = {
        product_id,
        quantity,
      };
      await axiosInstance.post("/carts", body, config);
      alert("Add to cart Success");
    } catch (error) {
      if (error.response.data) return alert(error.response.data.message);
      alert(error.message);
    }
  };

  return (
    <HStack>
      <Image src={imageSource} alt={variant} width={550} height={368} />
      <Box p={2}>
        <Text mb={3}>{variant}</Text>
        <Text mb={3}>{origin}</Text>
        <Text mb={2}>{description}</Text>
        <Text>Rp. {price.toLocaleString("id")}</Text>
        <Input
          variant="outline"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button variant="ghost" onClick={onAddToCart}>
          Add
        </Button>
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
