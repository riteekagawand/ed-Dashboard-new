"use client";
import * as React from "react";
import { FiUpload } from "react-icons/fi";
import { PiDiamondsFour } from "react-icons/pi";
import SortableComponent from "./Sortable";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineAddLink } from "react-icons/md";



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Textarea } from "@/Components/ui/textarea";

const Mainpage = () => {
  const [logo, setLogo] = React.useState<string | null>(null);
  const [modules, setModules] = React.useState<string[]>([]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleAddModule = (event: React.ChangeEvent<HTMLInputElement>, type: 'existing' | 'new') => {
    if (event.target.files && event.target.files[0]) {
      const newModule = type === 'existing' ? 'Existing Module' : 'New Module'; // Modify as needed
      setModules([...modules, newModule]);
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
            <Input id="title" placeholder="Title of the roadmap" />
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
            <Select>
              <SelectTrigger id="category">
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
            <div className="flex flex-row gap-[100px]">
              {/* Choose a File Option */}
              <div className="flex items-center space-x-2">
                <PiDiamondsFour className="text-purple-950 text-[20px]" />
                <Input
                  id="choose-file"
                  type="file"
                  placeholder="Choose a file"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label htmlFor="choose-file" className="cursor-pointer text-purple-900 text-sm font-semibold">
                  Choose a file
                </label>
              </div>

              {/* Upload a File Here Option */}
              <div className="flex items-center space-x-2">
                <FiUpload className="text-purple-950 text-[20px]" />
                <Input
                  id="upload-file"
                  type="file"
                  placeholder="Upload a file here"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label htmlFor="upload-file" className="cursor-pointer text-purple-900 text-sm font-semibold">
                  Upload a file here
                </label>
              </div>
            </div>
            <div className="mt-5">
              {/* Display Selected Logo */}
              {logo && (
                <img
                  src={logo}
                  alt="Selected logo"
                  className="mt-2 w-full max-h-[200px] object-cover"
                />
              )}
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
            <RadioGroup defaultValue="popular">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular" />
                <Label htmlFor="popular">Popular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">New</Label>
              </div>
            </RadioGroup>
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
            <Textarea id="description" placeholder="Description of your roadmap" />
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
            <Input id="total-time" placeholder="Total Time" />
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
            <Input id="total-units" placeholder="Total Units" />
          </form>
        </CardContent>
      </Card>

      {/* 9th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Modules</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            {/* Display added modules */}
            <div className="mb-4">
             
            </div>
            <div className="flex flex-row gap-[50px]">
              {/* Choose Existing Entry Option */}
              <div className="flex items-center space-x-2">
                <HiMiniArrowTopRightOnSquare className="text-purple-900 text-[20px]" />
                <Input
                  id="choose-existing-entry"
                  type="file"
                  placeholder="Choose existing entry"
                  onChange={(e) => handleAddModule(e, 'existing')}
                  className="hidden"
                />
                <label htmlFor="choose-existing-entry" className="cursor-pointer text-purple-900 text-sm font-semibold">
                  Choose existing entry
                </label>
              </div>

              {/* Create New Entry Option */}
              <div className="flex items-center space-x-2">
                <MdOutlineAddLink className="text-purple-900 text-[20px]" />
                <Input
                  id="create-new-entry"
                  type="file"
                  placeholder="Create new entry"
                  onChange={(e) => handleAddModule(e, 'new')}
                  className="hidden"
                />
                <label htmlFor="create-new-entry" className="cursor-pointer text-purple-900 text-sm font-semibold">
                  Create new entry
                </label>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 10th Card */}
      <Card className="w-[450px] mt-5 shadow-md">
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <CardTitle className="text-lg">Tags</CardTitle>
            <CardDescription className="text-sm">(required)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <Input id="tags" placeholder="Tags" />
          </form>
        </CardContent>
      </Card>

    </div>
  );
};

export default Mainpage;
