import { Button } from "@chakra-ui/react";

export default function MyButton(props) {
  const { children } = props;
  return (
    <Button colorScheme="purple" {...props}>
      {children}
    </Button>
  );
}

// {...props} akan menerapkan semua property yang dikirim
