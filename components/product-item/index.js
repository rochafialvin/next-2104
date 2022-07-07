import { Flex, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem(props) {
  const { product_id, variant, price, origin } = props.product;

  return (
    <Flex
      w="30%"
      direction="column"
      background="gray.200"
      marginBlock={5}
      rounded={5}
      p={3}
    >
      {/* <Image src={productImage} alt={productName} width={500} height={700} /> */}
      {/* <img src={productImage} alt={productName} /> */}
      <Text mt={3} mb={2}>
        {variant}
      </Text>
      <Text mb={3}>Rp. {price.toLocaleString("id")}</Text>
      <Text mb={3}>Origin : {origin}</Text>
      <Link href={`/products/${product_id}`}>
        <Button>Detail</Button>
      </Link>
    </Flex>
  );
}
