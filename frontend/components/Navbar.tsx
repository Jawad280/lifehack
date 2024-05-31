"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity } from "lucide-react";

const Navbar = () => {
  const path = usePathname();

  const navStyle = (currentPath: any) => {
    return currentPath == path
      ? "font-bold text-blue-900"
      : "font-bold text-black";
  };

  return (
    <div className="w-full flex p-6 justify-between items-center shadow-sm bg-white z-50 fixed top-0">
      <div className="flex gap-2 items-center">
        <Activity size={24} />
        <div className="font-bold text-[18px]">Inventorize</div>
      </div>

      <div className="flex gap-4">
        <Link href="/" className={navStyle("/")}>
          Dashboard
        </Link>
        <Link href="/inventory" className={navStyle("/inventory")}>
          Inventory
        </Link>
        <Link href="/dish" className={navStyle("/dish")}>
          Dish
        </Link>
        <Link href="/track" className={navStyle("/track")}>
          Track
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
