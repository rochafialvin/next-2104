import {
  Box,
  Button,
  Stack,
  VStack,
  HStack,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

function Navigation() {
  return (
    <Box width="80%" mx="auto">
      <HStack>
        <NextLink href="/">
          <Link>
            <Text fontSize="lg" color="gray.600">
              MARKET
            </Text>
          </Link>
        </NextLink>
        <Flex>
          <NextLink href="/products">
            <Button variant="ghost" my={5} w="100%">
              Products
            </Button>
          </NextLink>
          <NextLink href="/login">
            <Button variant="ghost" my={5} w="100%">
              Login
            </Button>
          </NextLink>
          <NextLink href="/register">
            <Button variant="ghost" my={5} w="100%">
              Register
            </Button>
          </NextLink>
          <NextLink href="/about">
            <Button variant="ghost" my={5} w="100%">
              About Us
            </Button>
          </NextLink>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Navigation;
