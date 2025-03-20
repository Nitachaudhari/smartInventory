import { useState, useEffect } from "react";
import { Input, Button, Select, VStack, FormControl, FormLabel } from "@chakra-ui/react";

const InventoryForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", category: "", quantity: "", expiryDate: "" });
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} p={4}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <Input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
      </FormControl>

      <FormControl>
        <FormLabel>Expiry Date</FormLabel>
        <Input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} />
      </FormControl>

      <Button type="submit" colorScheme="blue">Submit</Button>
    </VStack>
  );
};

export default InventoryForm;
