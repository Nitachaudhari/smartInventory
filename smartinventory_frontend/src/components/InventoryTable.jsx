import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const InventoryTable = ({ items, onEdit, onDelete }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Quantity</Th>
          <Th>Expiry Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item._id}>
            <Td>{item.name}</Td>
            <Td>{item.category}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.expiryDate ? new Date(item.expiryDate).toDateString() : "N/A"}</Td>
            <Td>
              <IconButton icon={<EditIcon />} mr={2} onClick={() => onEdit(item)} />
              <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => onDelete(item._id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default InventoryTable;
