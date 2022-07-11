import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { api_origin } from "../../constraint";
import axiosInstance from "../../services/axios";
import { useRouter } from "next/router";

function Transaction(props) {
  const { transactions } = props;

  const renderCart = () => {
    if (transactions)
      return transactions.map((transaction) => {
        const { transaction_id, total, product } = transaction;
        const { product_name, product_price, product_image } = product;
        return (
          <Flex
            key={transaction_id}
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
                  src={api_origin + product_image}
                  alt={product_name}
                  width={70}
                  height={70}
                />
              </Box>
            </Box>
            <Box borderLeft="1px solid gray" w="50%" p={5}>
              <Text fontWeight="bold" fontSize="1.2em">
                Variant : {product_name}
              </Text>
              <Text>${product_price}</Text>
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

    return <Text>Transaction is empty</Text>;
  };

  return (
    <Box>
      <Box>{renderCart()}</Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken } = session.user;

    const page = 1;
    const pageSize = 6;

    const config = {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const res = await axiosInstance.get("/transactions", config);

    const { result } = res.data.data;

    return {
      props: { transactions: result },
    };
  } catch (error) {
    console.log({ error, message: error.response });
    return { props: {} };
  }
}

export default Transaction;
