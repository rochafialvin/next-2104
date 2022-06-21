import { Box, HStack, Flex } from "@chakra-ui/react";
import ProductItem from "../../components/product-item";
import axiosInstance from "../../services/axios";

function Products(props) {
  const { products } = props;

  const renderProducts = () => {
    return products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  };

  return (
    <HStack>
      <Box>Empty</Box>
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

export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get("/products");

    return {
      props: { products: res.data },
    };
  } catch (error) {
    console.log({ error });
  }
}

export default Products;
