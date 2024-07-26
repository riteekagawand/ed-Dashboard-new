"use client"
import * as React from "react"
import SortableComponent from "./Sortable"

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


const Mainpage = () => {
  const [logo, setLogo] = React.useState<string | null>(null);

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
