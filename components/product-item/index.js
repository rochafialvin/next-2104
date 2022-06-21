import { Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function ProductItem(props) {
  const { id, productName, productImage, price } = props.product;

  return (
    <Flex
      w="30%"
      direction="column"
      background="gray.200"
      marginBlock={5}
      rounded={5}
      p={3}
    >
      <img src={productImage} alt={productName} />
      <Text mt={3} mb={2}>
        {productName}
      </Text>
      <Text mb={3}>Rp. {price.toLocaleString("id")}</Text>
      <Link href={`/products/${id}`}>
        <Button>Detail</Button>
      </Link>
    </Flex>
  );
}
