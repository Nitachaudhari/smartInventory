import { useEffect, useState } from "react";
import { fetchItems, addItem, deleteItem } from "../api";
import { Box, Button, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: 0 });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  const handleAddItem = async () => {
    await addItem(newItem);
    setNewItem({ name: "", category: "", quantity: 0 });
    loadItems();
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <Input
        placeholder="Category"
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
      />
      <Button onClick={handleAddItem} mt={2}>Add Item</Button>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Quantity</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Inventory;
