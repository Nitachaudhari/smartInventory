import { useEffect, useState } from "react";
import { fetchLowStockItems, fetchExpiringItems } from "../api";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Alert, AlertIcon } from "@chakra-ui/react";

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
    <Box p={4}>
      <Heading size="lg">Dashboard</Heading>

      {lowStockItems.length > 0 && (
        <Alert status="warning" mt={4}>
          <AlertIcon />
          {lowStockItems.length} item(s) are running low on stock!
        </Alert>
      )}

      {expiringItems.length > 0 && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {expiringItems.length} item(s) are expiring soon!
        </Alert>
      )}

      <Heading size="md" mt={4}>Low Stock Items</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lowStockItems.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="md" mt={4}>Expiring Soon</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Expiry Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expiringItems.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{new Date(item.expiryDate).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;
