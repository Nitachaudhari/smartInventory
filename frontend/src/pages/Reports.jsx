import { useState, useEffect, useContext } from "react";
import { fetchStockReport, fetchExpiryReport } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Heading } from "@chakra-ui/react";
import { CSVLink } from "react-csv";

const Reports = () => {
  const [stockReport, setStockReport] = useState([]);
  const [expiryReport, setExpiryReport] = useState([]);
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    if (role === "admin" || role === "manager") {
      fetchStockReport(token).then((res) => setStockReport(res.data));
      fetchExpiryReport(token).then((res) => setExpiryReport(res.data));
    }
  }, [token, role]);

  if (role !== "admin" && role !== "manager") {
    return <Box p={4}><Heading size="md">Access Denied</Heading></Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Inventory Reports</Heading>

      {/* Stock Report */}
      <Heading size="md">Stock Report</Heading>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Quantity</Th>
            <Th>Threshold</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stockReport.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.threshold}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CSVLink data={stockReport} filename="stock_report.csv">
        <Button colorScheme="blue" mt={4}>Export Stock Report</Button>
      </CSVLink>

      {/* Expiry Report */}
      <Heading size="md" mt={8}>Expiry Report</Heading>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Expiry Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expiryReport.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{new Date(item.expiryDate).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CSVLink data={expiryReport} filename="expiry_report.csv">
        <Button colorScheme="red" mt={4}>Export Expiry Report</Button>
      </CSVLink>
    </Box>
  );
};

export default Reports;
