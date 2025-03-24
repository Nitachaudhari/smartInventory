import { useEffect, useState } from "react";
import { fetchLowStockItems, fetchExpiringItems } from "../api";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { FiBox, FiAlertTriangle } from "react-icons/fi";

const Dashboard = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLowStockItems(await fetchLowStockItems());
    setExpiringItems(await fetchExpiringItems());
  };

  return (
    <Box p={6} bg="gray.100" minH="100vh">
      <Heading size="lg" textAlign="center" color="teal.700" mb={6}>
        Inventory Dashboard
      </Heading>

      <VStack spacing={6}>
        {/* Alerts Section */}
        {lowStockItems.length > 0 && (
          <Alert status="warning" variant="left-accent" w="full">
            <AlertIcon />
            {lowStockItems.length} item(s) are running low on stock!
          </Alert>
        )}

        {expiringItems.length > 0 && (
          <Alert status="error" variant="left-accent" w="full">
            <AlertIcon />
            {expiringItems.length} item(s) are expiring soon!
          </Alert>
        )}

        {/* Low Stock Items Section */}
        <Card w="full" shadow="md">
          <CardHeader bg="yellow.500" color="white" p={4} borderTopRadius="md">
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={FiBox} mr={2} /> Low Stock Items
            </Heading>
          </CardHeader>
          <CardBody p={0}>
            <Table variant="striped" colorScheme="yellow">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lowStockItems.map((item) => (
                  <Tr key={item._id} _hover={{ bg: "yellow.100" }}>
                    <Td>{item.name}</Td>
                    <Td>{item.category}</Td>
                    <Td fontWeight="bold" color="red.600">
                      {item.quantity}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Expiring Soon Section */}
        <Card w="full" shadow="md">
          <CardHeader bg="red.500" color="white" p={4} borderTopRadius="md">
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={FiAlertTriangle} mr={2} /> Expiring Soon
            </Heading>
          </CardHeader>
          <CardBody p={0}>
            <Table variant="striped" colorScheme="red">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Expiry Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expiringItems.map((item) => (
                  <Tr key={item._id} _hover={{ bg: "red.100" }}>
                    <Td>{item.name}</Td>
                    <Td>{item.category}</Td>
                    <Td fontWeight="bold">
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Dashboard;
