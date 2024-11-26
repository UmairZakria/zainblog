'use client'
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); 

  };

  

  return (
    <motion.div
    initial={{y: -100}}
    animate={{y : 0}}
    transition={{
        delay: 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 150,
      }}
    className="sticky  bg-white top-0 items-center h-[80px] z-[100] w-full backdrop-blur-lg bg-opacity-10">
      <div className="container flex justify-between items-center h-full mx-auto w-full">
        <div className="text-3xl font-bold bg-gradient-to-l from-indigo-500 via-green-700 to-green-600 bg-clip-text text-transparent">
          ZainBloooGer
        </div>

        {/* Desktop Menu */}
        <ul className="lg:flex md:flex hidden items-center justify-center font-semibold gap-1 md:text-md lg:text-xl">
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/Party"}>Party</NavLink>
          <NavLink href={"/Wedding"}>Wedding</NavLink>
          <NavLink href={"/Fun"}>Fun Ideas</NavLink>
          <NavLink href={"/Halloween"}>Halloween</NavLink>
          <ModeToggle />
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button onClick={toggleMenu} className="md:hidden z-50">
          {isOpen ? (
             <>
             <motion.img   initial={{}} whileTap={{rotate:360}} width="32" height="32" className="hidden dark:block   " src="https://img.icons8.com/ios-filled/50/FFFFFF/close-window.png" alt="close-window"/>
             <motion.img   initial={{}} whileTap={{rotate:360}} width="32" height="32" className="block dark:hidden  "  src="https://img.icons8.com/ios-filled/50/1A1A1A/close-window.png" alt="close-window"/>
             </>

          ) : (
            <>
            <motion.img   initial={{}} whileTap={{rotate:360}} width="32" height="32" className="block dark:hidden  " src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="menu--v1"/>
            <motion.img   initial={{}} whileTap={{rotate:360}} width="32" height="32" className="hidden dark:block   "  src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v1.png" alt="menu--v1"/>
            </>
          )}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: isOpen ? 0 : "100vh" }}
          transition={{
            delay: 0.1,
            duration: 0.3,
            type: "spring",
            stiffness: 150,
          }}
          className="fixed z-[100] flex py-2 text-lg lg:hidden md:hidden flex-col top-[82px] left-0 w-full h-auto font-normal bg-green-400 dark:bg-[#1E1E1E] text-white transform"
        >
          <Link
            onClick={() => setIsOpen(false)}
            className="py-4 px-5 hover:bg-white dark:hover:text-black dark:hover:font-semibold hover:text-green-500"
            href={"/"}
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="py-4 px-5 hover:bg-white dark:hover:text-black dark:hover:font-semibold hover:text-green-500"
            href={"/Party"}
          >
            Party
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="py-4 px-5 hover:bg-white dark:hover:text-black dark:hover:font-semibold hover:text-green-500"
            href={"/Fun"}
          >
            Fun
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="py-4 px-5 hover:bg-white dark:hover:text-black dark:hover:font-semibold hover:text-green-500"
            href={"/Wedding"}
          >
            Wedding
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="py-4 px-5 hover:bg-white dark:hover:text-black dark:hover:font-semibold hover:text-green-500"
            href={"/Halloween"}
          >
            Halloween
          </Link>
          <div className="w-[30px] mx-5 self-start">
            <ModeToggle />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;

