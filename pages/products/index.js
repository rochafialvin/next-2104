import { Box, HStack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import ProductItem from "../../components/product-item";
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";

function Products(props) {
  const { products, session } = props;

  const renderProducts = () => {
    return products.map((product) => (
      <ProductItem key={product.product_id} product={product} />
    ));
  };

  return (
    <HStack>
      <Head>
        <title>Product List</title>
        <meta name="description" content="We have everything you want" />
      </Head>
      <Flex
        w="80%"
        wrap="wrap"
        bg="blackAlpha.400"
        justifyContent={"space-between"}
        padding={3}
      >
        {renderProducts()}
      </Flex>
    </HStack>
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

    const res = await axiosInstance.get("/products", config);

    return {
      props: { products: res.data.data.result, session },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: { products: [] },
    };
  }
}

export default Products;
