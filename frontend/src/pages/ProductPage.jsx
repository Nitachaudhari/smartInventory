import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import axios from "axios";
import { Box, Text, Spinner } from "@chakra-ui/react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (barcode) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/inventory/${barcode}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setLoading(false);
  };

  return (
    <Box>
      <BarcodeScanner onScan={handleScan} />
      {loading && <Spinner />}
      {product && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <Text>Expiry Date: {product.expiryDate}</Text>
          <Text>Supplier: {product.supplier}</Text>
          <Text>Location: {product.location}</Text>
        </Box>
      )}
    </Box>
  );
};

export default ProductPage;
