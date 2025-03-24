import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import BarcodeScanner from "../components/BarcodeScanner";

const BarcodeScannerPage = () => {
  const [barcodeResult, setBarcodeResult] = useState("");
  const [item, setItem] = useState(null);

  // Fetch item details when a barcode is scanned
  useEffect(() => {
    const fetchItem = async (code) => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/search/${code}`);
        if (!response.ok) throw new Error("Item not found");

        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
        setItem(null);
      }
    };

    if (barcodeResult) {
      fetchItem(barcodeResult);
    }
  }, [barcodeResult]);

  return (
    <Container maxW="container.md" py={8} textAlign="center">
      <Heading size="lg" color="teal.600">Scan a Barcode</Heading>
      <BarcodeScanner onScan={(data) => setBarcodeResult(data)} />

      {/* Display Scanned Item Details */}
      {barcodeResult && <Text fontSize="md" color="blue.500">Scanned Code: {barcodeResult}</Text>}
      {item && (
        <Box p={4} borderWidth={1} borderRadius="lg" mt={4} boxShadow="md">
          <Heading size="md" color="green.600">Item Details</Heading>
          <Text><strong>Name:</strong> {item.name}</Text>
          <Text><strong>Category:</strong> {item.category}</Text>
          <Text><strong>Quantity:</strong> {item.quantity}</Text>
          <Text><strong>Expiry Date:</strong> {item.expiryDate}</Text>
        </Box>
      )}
    </Container>
  );
};

export default BarcodeScannerPage;
