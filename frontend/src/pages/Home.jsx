import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaChartBar, FaBell, FaCogs } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="teal.50" py={16} textAlign="center">
        <Container maxW="container.lg">
          <VStack spacing={6}>
            <Heading size="2xl" color="teal.700">
              Inventory Management System
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="700px">
              Track stock levels, manage products, and streamline your inventory effortlessly.
            </Text>
            <Stack direction={["column", "row"]} spacing={4} mt={4}>
              <Button colorScheme="teal" size="lg" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
              {/* <Button variant="outline" colorScheme="teal" size="lg" onClick={() => navigate("/about")}>
                Learn More
              </Button> */}
            </Stack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.lg" py={16}>
        <Heading size="xl" textAlign="center" mb={8} color="gray.700">
          Key Features
        </Heading>
        <SimpleGrid columns={[1, 2, 2]} spacing={10}>
          <FeatureCard
            icon={FaBoxOpen}
            title="Stock Management"
            description="Keep track of your product stock levels in real time."
          />
          <FeatureCard
            icon={FaChartBar}
            title="Reports & Insights"
            description="Generate detailed reports to analyze stock trends and performance."
          />
          <FeatureCard
            icon={FaBell}
            title="Low Stock Alerts"
            description="Get notified when stock levels drop below the threshold."
          />
          <FeatureCard
            icon={FaCogs}
            title="Easy Integration"
            description="Seamlessly integrate with your existing business workflow."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <VStack
      p={6}
      borderRadius="lg"
      shadow="md"
      bg="white"
      align="center"
      spacing={3}
      _hover={{ shadow: "lg", transform: "scale(1.05)", transition: "0.3s" }}
    >
      <Icon as={icon} boxSize={10} color="teal.500" />
      <Heading size="md" color="gray.800">
        {title}
      </Heading>
      <Text textAlign="center" color="gray.600">
        {description}
      </Text>
    </VStack>
  );
};

export default Home;
