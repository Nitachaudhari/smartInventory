import { useEffect, useState } from "react";
import { fetchItems, addItem, deleteItem, updateItem } from "../api";
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Select,
  Spinner,
  useToast,
  Heading,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    threshold: 0,
    expiryDate: "",
    supplier: "",
    location: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const toast = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  // Fetch items
  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
      setError("");
    } catch (err) {
      setError("Failed to load inventory items.");
    } finally {
      setLoading(false);
    }
  };

  // Add or update item
  const handleAddOrUpdateItem = async () => {
    try {
      if (editingItem) {
        await updateItem(editingItem._id, newItem);
        toast({ title: "Item updated!", status: "success", duration: 2000 });
      } else {
        await addItem(newItem);
        toast({ title: "Item added!", status: "success", duration: 2000 });
      }
      resetForm();
      loadItems();
    } catch (err) {
      toast({ title: "Error updating item", status: "error", duration: 2000 });
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      toast({ title: "Item deleted!", status: "warning", duration: 2000 });
      loadItems();
    } catch (err) {
      toast({ title: "Error deleting item", status: "error", duration: 2000 });
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      threshold: 0,
      expiryDate: "",
      supplier: "",
      location: "",
    });
    setEditingItem(null);
    setShowForm(false);
  };

  // Handle edit
  const handleEditItem = (item) => {
    setNewItem(item);
    setEditingItem(item);
    setShowForm(true);
  };

  // Filtered items based on search and filters
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? item.category === selectedCategory : true) &&
      (selectedSupplier ? item.supplier === selectedSupplier : true) &&
      (selectedLocation ? item.location === selectedLocation : true)
  );

  // Unique categories, suppliers, locations
  const categories = [...new Set(items.map((item) => item.category))];
  const suppliers = [...new Set(items.map((item) => item.supplier))];
  const locations = [...new Set(items.map((item) => item.location))];

  return (
    <Box p={6} bg={useColorModeValue("gray.100", "gray.900")} minH="100vh">
      <Heading mb={4} textAlign="center" color="teal.500">
        Inventory Management
      </Heading>

      <Divider mb={6} />

      {/* Search and Filter Section */}
      <VStack spacing={3} align="stretch" mb={6} p={4} bg="white" boxShadow="md" borderRadius="lg">
        <Input
          placeholder="🔍 Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <HStack spacing={4}>
          <Select
            placeholder="Filter by Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Supplier"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            {suppliers.map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </HStack>
      </VStack>

      {/* Add Item Button */}
      <Button mb={4} onClick={() => setShowForm(!showForm)} colorScheme="teal">
        {showForm ? "Cancel" : "➕ Add Item"}
      </Button>

      {/* Add Item Form */}
      {showForm && (
        <VStack spacing={4} p={6} bg="white" boxShadow="lg" borderRadius="md">
          {Object.keys(newItem).map((key) => (
            <FormControl key={key}>
              <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
              <Input
                type={key.includes("Date") ? "date" : key === "quantity" || key === "threshold" ? "number" : "text"}
                value={newItem[key]}
                onChange={(e) =>
                  setNewItem({ ...newItem, [key]: e.target.value })
                }
              />
            </FormControl>
          ))}
          <Button onClick={handleAddOrUpdateItem} colorScheme="blue">
            {editingItem ? "✅ Update Item" : "➕ Add Item"}
          </Button>
        </VStack>
      )}

      {/* Loading State */}
      {loading ? (
        <Box textAlign="center" my={5}>
          <Spinner size="xl" />
        </Box>
      ) : error ? (
        <Box color="red.500" textAlign="center" my={5}>
          {error}
        </Box>
      ) : (
        // Inventory Table
        <Table variant="striped" mt={6} bg="white" boxShadow="md" borderRadius="md">
          <Thead bg="teal.500">
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Category</Th>
              <Th color="white">Quantity</Th>
              <Th color="white">Threshold</Th>
              <Th color="white">Expiry Date</Th>
              <Th color="white">Supplier</Th>
              <Th color="white">Location</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems.map((item, index) => (
              <Tr key={item._id || index} _hover={{ bg: "gray.100" }}>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.threshold}</Td>
                <Td>{item.expiryDate ? new Date(item.expiryDate).toDateString() : "N/A"}</Td>
                <Td>{item.supplier}</Td>
                <Td>{item.location}</Td>
                <Td>
                  <Button colorScheme="yellow" mr={2} onClick={() => handleEditItem(item)}>✏ Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDeleteItem(item._id)}>🗑 Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Inventory;
