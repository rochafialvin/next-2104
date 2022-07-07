import { Box, HStack, Flex, Button } from "@chakra-ui/react";
import Head from "next/head";
import ProductItem from "../../components/product-item";
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Products(props) {
  const [products, setProducts] = useState(props.products);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    getProducts();
  }, [page]);

  const getProducts = async () => {
    const session = await getSession();

    const { accessToken } = session.user;

    const config = {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const res = await axiosInstance.get("/products", config);

    setProducts(res.data.data.result);
  };

  const onPrevClick = () => {
    setPage(page - 1);
  };

  const onNextClick = () => {
    setPage(page + 1);
  };

  const renderProducts = () => {
    return products.map((product) => (
      <ProductItem key={product.product_id} product={product} />
    ));
  };

  return (
    <Box w="80%">
      <HStack>
        <Head>
          <title>Product List</title>
          <meta name="description" content="We have everything you want" />
        </Head>
        <Flex
          wrap="wrap"
          bg="blackAlpha.400"
          justifyContent={"space-between"}
          padding={3}
        >
          {renderProducts()}
        </Flex>
      </HStack>
      <Box
        marginBlock={2}
        marginInline={"auto"}
        display="flex"
        w="30%"
        justifyContent={"space-between"}
      >
        <Button disabled={page == 1} variant={"outline"} onClick={onPrevClick}>
          Prev
        </Button>
        <Button variant={"outline"}>{page}</Button>
        <Button variant={"outline"} onClick={onNextClick}>
          Next
        </Button>
      </Box>
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
