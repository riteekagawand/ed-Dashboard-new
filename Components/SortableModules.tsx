
"use client";
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { MdOutlineDragIndicator } from "react-icons/md";

type ModuleItem = {
  id: string;
  name: string;
};

const SortableModules = ({ modules }: { modules: ModuleItem[] }) => {
  const [items, setItems] = useState<ModuleItem[]>(modules);

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

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="space-y-4" ref={sortableContainer}>
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <div className="flex items-center w-full">
              <MdOutlineDragIndicator className="mr-2 cursor-grab text-gray-500" size={22} />
              <div className="flex-1">{item.name}</div>
              <button onClick={() => handleDelete(item.id)} className="ml-2 text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortableModules;
