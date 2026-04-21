"use client";

import React from "react";
import { LogoAcrobat } from "@gravity-ui/icons";
import { Link, Button } from "@heroui/react";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Left Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <LogoAcrobat className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg font-bold tracking-tight text-gray-800">
            ACME
          </h1>
        </div>

        {/* Middle Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <li>
            <Link
              href="/"
              className="hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className="hover:text-blue-600 transition duration-200"
            >
              Tasks
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <ThemeSwitch />

          {/* Button */}
          <Button
            radius="full"
            className="bg-blue-600 text-white px-5 py-2 text-sm font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;