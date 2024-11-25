'use client'
import React from 'react'
import { useSession, signOut } from "next-auth/react";
import NavLink from '@/components/NavLink';

const Navbar = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/Login" }); 
      }
    return (
        <div>
            <nav className="bg-slate-500  h-[60px] w-full flex gap-3 py-1 items-center justify-center ">

                <NavLink href='/Panel' >Home</NavLink>
                <NavLink href='/Panel/Addblog'>Add BLog</NavLink>
                <NavLink href='/Panel/Editblog'>Edit BLog</NavLink>
                <button className='bg-black px-3 hover:bg-yellow-50 text-white  hover:text-black font-semibold  h-full' onClick={handleLogout}>Logout</button>
            </nav>

        </div>
    )
}

export default Navbar
