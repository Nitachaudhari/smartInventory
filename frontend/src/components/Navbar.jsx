import { Box, Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex justify="center">
        <Heading size="md">SmartInventory</Heading>
      </Flex>
    </Box>
  );
};

export default Navbar;
