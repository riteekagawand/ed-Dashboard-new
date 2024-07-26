// components/sortable.tsx
"use client";
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { FiPlus, FiMoreVertical, FiTrash } from 'react-icons/fi';
import { MdOutlineDragIndicator } from "react-icons/md";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";

type Item = {
  id: string;
  content: string;
};

const SortableField = ({
  item,
  onItemChange,
  onDelete,
  onAddItem
}: {
  item: Item;
  onItemChange: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onAddItem: () => void;
}) => {
  if (!item || !item.id) return null; // Handle undefined or missing id

  return (
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center w-full">
          <MdOutlineDragIndicator className="mr-2 cursor-grab text-gray-500" size={22} />
          <Input
            type="text"
            value={item.content}
            onChange={(e) => onItemChange(item.id, e.target.value)}
            className="flex-1"
            placeholder="Type your skill objective"
          />
          <div className="flex items-center space-x-2 ml-2">
            <Button onClick={onAddItem} className="ml-2 p-2">
              <FiPlus  className="text-gray-800" size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FiMoreVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent >
              <DropdownMenuItem
                onClick={() => onDelete(item.id)}
                className="flex items-center p-2 text-gray-800 bg-gray-100 hover:bg-red-300 hover:text-gray-800 focus:bg-red-300 focus:text-gray-800 active:bg-red-700 rounded-md transition-colors duration-300"
                >
                <FiTrash className="mr-2" />
                <p className="">Delete Item</p>
              </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
  );
};

const SortableComponent = () => {
  const [items, setItems] = useState<Item[]>([{ id: '1', content: '' }]);

  const handleItemChange = (id: string, content: string) => {
    setItems(items.map(item => item.id === id ? { ...item, content } : item));
  };

  const handleAddItem = () => {
    const newId = (items.length + 1).toString(); // Ensure ID is a string
    const newItem = { id: newId, content: '' };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const sortableContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sortableContainer.current) {
      const sortable = Sortable.create(sortableContainer.current, {
        animation: 150,
        onEnd: (evt) => {
          const newItems = [...items];
          const [removed] = newItems.splice(evt.oldIndex, 1);
          newItems.splice(evt.newIndex, 0, removed);
          setItems(newItems);
        },
      });

      return () => {
        sortable.destroy(); // Cleanup sortable instance
      };
    }
  }, [items]);

  return (
    <div>
      <div className="space-y-4" ref={sortableContainer}>
        {items.map(item => (
          <SortableField
            key={item.id}
            item={item}
            onItemChange={handleItemChange}
            onDelete={handleDeleteItem}
            onAddItem={handleAddItem}
          />
        ))}
      </div>
    </div>
  );
};

export default SortableComponent;
