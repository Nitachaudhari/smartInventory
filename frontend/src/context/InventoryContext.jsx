import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/items")
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    return (
        <InventoryContext.Provider value={{ items, setItems }}>
            {children}
        </InventoryContext.Provider>
    );
};
