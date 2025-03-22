import { Box, Button, Container, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navbar */}
      <Flex as="nav" bg="teal.500" color="white" px={8} py={4} justify="space-between" align="center">
        <Heading size="md">Inventory Management</Heading>
        <Stack direction="row" spacing={4}>
          <Button colorScheme="whiteAlpha" variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button colorScheme="whiteAlpha" variant="outline" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button colorScheme="whiteAlpha" variant="outline" onClick={() => navigate("/inventory")}>
            Inventory
          </Button>
        </Stack>
      </Flex>

      {/* Hero Section */}
      <Container maxW="container.xl" py={16} textAlign="center">
        <VStack spacing={6}>
          <Heading size="2xl" color="teal.600">
            Welcome to Inventory Management System
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="700px">
            Streamline your inventory tracking and management with our intuitive platform. 
            Manage your products, track stock levels, and generate reports effortlessly.
          </Text>

          {/* Action Buttons */}
          <Stack direction={["column", "row"]} spacing={4} mt={4}>
            <Button colorScheme="teal" size="lg" onClick={() => navigate("/login")}>
              Get Started
            </Button>
            <Button colorScheme="green" size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
