import { Box } from "@chakra-ui/react";
import React from "react";
import Navigation from "../navigation";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Box>{children}</Box>
    </>
  );
}
export default Layout;
