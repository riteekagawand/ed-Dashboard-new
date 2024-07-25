"use client"
import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import Sortable from 'sortablejs'
import { FiPlus, FiMenu, FiMoreVertical, FiTrash } from 'react-icons/fi'
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
  id: string
  content: string
  subItems: Item[]
}

const MAX_SUBFIELDS = 15

const SortableField = ({ item, onItemChange, onDelete, onAddSubItem }: { item: Item, onItemChange: (id: string, content: string) => void, onDelete: (id: string) => void, onAddSubItem: (parentId: string) => void }) => {
  const sortableContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sortableContainer.current) {
      Sortable.create(sortableContainer.current, {
        animation: 150,
        onEnd: (evt) => {
          // Handle reordering within subItems
          const newSubItems = [...item.subItems]
          const [removed] = newSubItems.splice(evt.oldIndex, 1)
          newSubItems.splice(evt.newIndex, 0, removed)
          onItemChange(item.id, JSON.stringify(newSubItems))
        },
      })
    }
  }, [item.subItems])

  return (
    <div className="p-2 bg-gray-100 rounded-md border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center w-full">
          <FiMenu className="mr-2 cursor-pointer" />
          <Input
            type="text"
            value={item.content}
            onChange={(e) => onItemChange(item.id, e.target.value)}
            className="flex-1"
            placeholder="Type your skill objective"
          />
          <div className="flex items-center space-x-2 ml-2">
            <Button
              onClick={() => onAddSubItem(item.id)}
              disabled={item.subItems.length >= MAX_SUBFIELDS}
              className="p-2"
              variant="gray"
            >
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
      <div ref={sortableContainer} >
        {item.subItems.map(subItem => (
          <div key={subItem.id} className="flex items-center mb-2 p-2 bg-white rounded-md border border-gray-300 shadow-sm w-full">
            <FiMenu className="mr-2 cursor-pointer" />
            <Input
              type="text"
              value={subItem.content}
              onChange={(e) => onItemChange(subItem.id, e.target.value)}
              className="flex-1"
              placeholder="Type your skill objective"
            />
            <div className="flex items-center space-x-2 ml-2">
            <Button
              onClick={() => onAddSubItem(item.id)}
              disabled={item.subItems.length >= MAX_SUBFIELDS}
              variant="gray"
             className="p-2"
            >
              <FiPlus className="text-gray-800" size={20}/>
            </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FiMoreVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onDelete(subItem.id)}>
                    <FiTrash className="mr-2" /> Delete Item
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SortableComponent = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', content: '', subItems: [] },
    { id: '2', content: '', subItems: [] },
    { id: '3', content: '', subItems: [] }
  ])

  const handleItemChange = (id: string, content: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, content } : item
    ))
  }

  const handleSubItemChange = (parentId: string, newSubItems: string) => {
    setItems(items.map(item =>
      item.id === parentId ? { ...item, subItems: JSON.parse(newSubItems) } : item
    ))
  }

  const handleAddSubItem = (parentId: string) => {
    setItems(items.map(item => {
      if (item.id === parentId) {
        if (item.subItems.length < MAX_SUBFIELDS) {
          const newSubItem = { id: `${item.id}-${item.subItems.length + 1}`, content: '', subItems: [] }
          return { ...item, subItems: [...item.subItems, newSubItem] }
        }
      }
      return item
    }))
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id && !item.subItems.some(subItem => subItem.id === id)))
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <SortableField
          key={item.id}
          item={item}
          onItemChange={(id, content) => handleItemChange(id, content)}
          onDelete={handleDeleteItem}
          onAddSubItem={handleAddSubItem}
        />
      ))}
    </div>
  )
}

const Mainpage = () => {
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
              <Input id="logo" type="file" placeholder="Logo" />
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
              <Textarea placeholder="Type your description here." />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 6th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Skill Objective</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Textarea placeholder="Type your description here." />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 7th Card: Sortable List */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Sortable List</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <SortableComponent />
        </CardContent>
      </Card>
    </div>
  )
}

export default Mainpage
