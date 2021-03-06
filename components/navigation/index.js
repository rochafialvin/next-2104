import { Box, Button, HStack, Text, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";

function Navigation() {
  const { data: session } = useSession();

  const onLogoutClick = async () => {
    await signOut();
  };

  return (
    <Box width="80%" mx="auto" height="15vh">
      <HStack>
        <NextLink href="/">
          <Link>
            <Text fontSize="lg" color="gray.600">
              MARKET
            </Text>
          </Link>
        </NextLink>
        <Flex>
          {session && (
            <NextLink href="/products">
              <Button variant="ghost" my={5} w="100%">
                Products
              </Button>
            </NextLink>
          )}
          {!session && (
            <>
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
            </>
          )}

          {session && (
            <>
              <NextLink href="/about">
                <Button variant="ghost" my={5} w="100%">
                  About Us
                </Button>
              </NextLink>
              <Button onClick={onLogoutClick} variant="ghost" my={5} w="100%">
                Logout
              </Button>
              <NextLink href="/profile">
                <Button variant="ghost" my={5} w="100%">
                  Hello, {session?.user.username}
                </Button>
              </NextLink>
              <NextLink href="/cart">
                <Button variant="ghost" my={5} w="100%">
                  cart
                </Button>
              </NextLink>
            </>
          )}
        </Flex>
      </HStack>
    </Box>
  );
}

export default Navigation;
