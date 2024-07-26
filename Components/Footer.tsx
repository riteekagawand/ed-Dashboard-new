"use client";
import * as React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "@/Components/ui/button"; // Adjust the import path if needed
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineRocketLaunch } from "react-icons/md";



const Footer: React.FC = () => {
  return (
    <footer className=" fixed bottom-0 left-0 right-0 py-5">
      <div className="container mx-[130px] flex justify-end items-center space-x-8">
        <HiDotsHorizontal className="text-gray-800" size={30} />
        <div className="flex space-x-6">
          <Button className="bg-gray-100 border-2 border-purple-900 text-md font-semibold text-gray-800"><IoSaveOutline className="mr-2 text-gray-800" size={22}/>Save</Button>
          <Button className="bg-gray-100 border-2 border-purple-900 text-md font-semibold text-gray-800"><MdOutlineRocketLaunch className="rotate-180 mr-2" size={22}/>Unpublish</Button>
          <Button className="bg-purple-900 text-white text-md font-semibold"><MdOutlineRocketLaunch className=" mr-2" size={22}/>Publish</Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
