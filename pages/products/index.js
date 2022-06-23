import { Box, HStack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import ProductItem from "../../components/product-item";
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";

function Products(props) {
  const { products, session } = props;

  const renderProducts = () => {
    return products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  };

  return (
    <HStack>
      <Head>
        <title>Product List</title>
        <meta name="description" content="We have everything you want" />
      </Head>
      <Box>{session?.user.email}</Box>
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

    const res = await axiosInstance.get("/products");

    if (!session) return { redirect: { destination: "/login" } };

    return {
      props: { products: res.data, session },
    };
  } catch (error) {
    console.log({ error });
  }
}

export default Products;
