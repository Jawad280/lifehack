"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  const navStyle = (currentPath: any) => {
    return currentPath == path
      ? "font-bold text-blue-900"
      : "font-bold text-black";
  };

  return (
    <div className="w-full flex p-6 justify-between items-center shadow-sm bg-white z-50">
      <div className="gap-4 flex">
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
