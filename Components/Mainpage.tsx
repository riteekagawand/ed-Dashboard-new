"use client"
import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import Sortable from 'sortablejs'
import { FiPlus, FiMoreVertical, FiTrash } from 'react-icons/fi'
import { MdOutlineDragIndicator } from "react-icons/md";
import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Textarea } from "@/Components/ui/textarea"

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
    <div className="p-2 bg-gray-100 rounded-md border border-gray-200 shadow-sm">
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
              <FiPlus className="text-gray-800" size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FiMoreVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onDelete(item.id)}>
                  <FiTrash className="mr-2" /> Delete Item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
          </div>
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

const Mainpage = () => {
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="p-4">
      {/* 1st Card */}
      <Card className="w-[450px] mt-20 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Title</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Input id="title" placeholder="Title of the roadmap" />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 2nd Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Category</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col space-y-1.5">
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="softskills">Soft Skills</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 3rd Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Logo</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Input id="logo" type="file" placeholder="Logo" onChange={handleLogoChange} />
              {logo && <img src={logo} alt="Selected logo" className="mt-2 w-full max-h-[200px] object-cover" />}
            </div>
          </form>
        </CardContent>
      </Card>
       {/* 4th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Course Tag</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="popular" id="popular" />
                  <Label htmlFor="popular">Popular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 5th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Description</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Textarea id="description" placeholder="Description of your roadmap" />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 6th Card: Sortable List */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Skill Objectives</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <SortableComponent />
        </CardContent>
      </Card>

      {/* 7th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Total Time</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Input id="title" placeholder="Title of the roadmap" />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 8th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Total Units</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Input id="title" placeholder="Title of the roadmap" />
            </div>
          </form>
        </CardContent>
      </Card>
</div>
  )
}

export default Mainpage
