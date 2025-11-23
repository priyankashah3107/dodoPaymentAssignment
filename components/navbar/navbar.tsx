"use client";

import { ArrowUpRight, BellDot, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full px-4 md:px-8 py-3 bg-white border-b">
      <div className="flex justify-between items-center w-full">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-2">
          <Image
            src="/avatar/avatar.png"
            alt="img"
            width={48}
            height={48}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h2 className="text-[#0D111B] text-base md:text-lg font-medium leading-6">
              Arthur Taylor
            </h2>
            <p className="text-[#525866] text-xs md:text-sm font-normal leading-5">
              Welcome back to Apex 👋🏻
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (Desktop + Tablet) */}
        <div className="hidden md:flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <BellDot className="w-5 h-5 cursor-pointer" />

          <Button className="bg-[#335CFF] hover:bg-[#1E4CFF] rounded-lg font-medium">
            Move Money
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          {open ? (
            <X
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 pb-4 animate-slide-down">
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5" />
            <span className="text-sm text-gray-700">Search</span>
          </div>

          <div className="flex items-center gap-4">
            <BellDot className="w-5 h-5" />
            <span className="text-sm text-gray-700">Notifications</span>
          </div>

          <Button className="bg-[#335CFF] hover:bg-[#1E4CFF] rounded-lg w-full font-medium">
            Move Money
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
