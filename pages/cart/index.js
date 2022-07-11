import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { api_origin } from "../../constraint";
import axiosInstance from "../../services/axios";
import { useRouter } from "next/router";

function Cart(props) {
  const { carts, total } = props;
  const router = useRouter();

  const onCheckoutClick = async () => {
    try {
      const body = {
        total,
        products: carts,
      };
      const session = await getSession();

      const { accessToken } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const res = await axiosInstance.post("/transactions", body, config);

      alert(res.data.message);

      router.replace("/transaction");
    } catch (error) {
      console.log({ error });
    }
  };

  const renderCart = () => {
    if (carts)
      return carts.map((cart) => {
        const { cart_id, quantity, variant, price, origin, image, total } =
          cart;
        return (
          <Flex
            key={cart_id}
            w="100%"
            border="1px solid gray"
            borderRadius={6}
            marginBlock={3}
          >
            <Box
              w="25%"
              display={"flex"}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                border="1px solid gray"
                width={70}
                height={70}
                rounded={6}
                overflow="hidden" // agar image tidak keluar dari border
              >
                <Image
                  src={api_origin + image}
                  alt={variant}
                  width={70}
                  height={70}
                />
              </Box>
            </Box>
            <Box borderLeft="1px solid gray" w="50%" p={5}>
              <Text fontWeight="bold" fontSize="1.2em">
                Variant : {variant}
              </Text>
              <Text>Origin : {origin}</Text>
              <Text>Quantity : {quantity}</Text>
              <Text>${price}</Text>
            </Box>
            <Box
              borderLeft="1px solid gray"
              w="25%"
              p={5}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold" fontSize="1.2em">
                Total
              </Text>
              <Text fontWeight="bold" fontSize="1em">
                ${total}
              </Text>
            </Box>
          </Flex>
        );
      });

    return <Text>Cart is empty</Text>;
  };

  return (
    <Box>
      <Box>{renderCart()}</Box>
      <Flex justifyContent={"space-around"}>
        <Text fontWeight="bold" fontSize="1.5em">
          Total : ${total}
        </Text>
        <Button variant="ghost" w="50%" onClick={onCheckoutClick}>
          Checkout
        </Button>
      </Flex>
    </Box>
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

    const res = await axiosInstance.get("/carts", config);

    const { result, total } = res.data.data;

    return {
      props: { carts: result, total },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Cart;
