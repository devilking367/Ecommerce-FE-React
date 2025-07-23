import { useEffect, useState } from "react";

type Item = Record<string, any> & { id?: string | number; createdAt?: string; updatedAt?: string };
type Config = {
  searchFields?: string[];
  generateId?: () => string | number;
};

const useCRUD = (initialData: Item[] = [], config: Config = {}): {
  items: Item[];
  filteredItems: Item[];
  searchTerm: string;
  loading: boolean;
  create: (newItem: Partial<Item>) => Item;
  update: (id: string | number, updatedData: Partial<Item>) => void;
  remove: (id: string | number) => void;
  getById: (id: string | number) => Item | undefined;
  bulkDelete: (ids: Array<string | number>) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
} => {
  const [items, setItems] = useState(initialData);
  const [filteredItems, setFilteredItems] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    const searchFields = config.searchFields || ['name'];
    const filtered = items.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredItems(filtered);
  }, [searchTerm, items, config.searchFields]);

  // CRUD Operations
  const create = (newItem: Partial<Item>): Item => {
    setLoading(true);
    const item = {
      ...newItem,
      id: config.generateId ? config.generateId() : Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setItems(prev => [...prev, item]);
    setLoading(false);
    return item;
  };

  const update = (id: string | number, updatedData: Partial<Item>): void => {
    setLoading(true);
    setItems(prev => prev.map(item =>
      item.id === id ? { 
        ...item, 
        ...updatedData, 
        updatedAt: new Date().toISOString() 
      } : item
    ));
    setLoading(false);
  };

  const remove = (id: string | number): void => {
    setLoading(true);
    setItems(prev => prev.filter(item => item.id !== id));
    setLoading(false);
  };

  const getById = (id: string | number): Item | undefined => {
    return items.find(item => item.id === id);
  };

  const bulkDelete = (ids: Array<string | number>): void => {
    setLoading(true);
    setItems(prev => prev.filter(item => !ids.includes(item.id)));
    setLoading(false);
  };

  return {
    items,
    filteredItems,
    searchTerm,
    loading,
    create,
    update,
    remove,
    getById,
    bulkDelete,
    setSearchTerm,
    setItems
  };
};

export default useCRUD
