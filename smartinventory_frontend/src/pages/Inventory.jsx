import { useState, useEffect } from "react";
import { fetchInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } from "../api/inventoryAPI";
import InventoryTable from "../components/InventoryTable";
import InventoryForm from "../components/InventoryForm";
import { Box, Heading, useToast } from "@chakra-ui/react";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const toast = useToast();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const data = await fetchInventory();
    setItems(data);
  };

  const handleAddOrUpdate = async (item) => {
    if (editingItem) {
      await updateInventoryItem(editingItem._id, item);
      toast({ title: "Item updated", status: "success", duration: 2000 });
    } else {
      await addInventoryItem(item);
      toast({ title: "Item added", status: "success", duration: 2000 });
    }
    setEditingItem(null);
    loadInventory();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    await deleteInventoryItem(id);
    toast({ title: "Item deleted", status: "error", duration: 2000 });
    loadInventory();
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Inventory Management</Heading>
      <InventoryForm onSubmit={handleAddOrUpdate} initialData={editingItem} />
      <InventoryTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};

export default Inventory;
