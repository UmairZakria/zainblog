"use client"

import React from "react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import moon from './ui/image.png'
import wmoon from './ui/wimage.png'

import sun from './ui/sun.png'
import system from './ui/system.png'

import Image from "next/image"

export function ModeToggle() {
  const [menufor ,setMenufor] = useState({display:'none'})
  const { theme, setTheme } = useTheme()
  const [value, setValue] = useState()
  const [icon, setIcon] = useState()
  // const activeTheme = theme 
  useEffect(() => {
    if (theme === 'dark') {
      setIcon(moon)
      setMenufor({display:'none'})

    } else if (theme === 'light') {
      setIcon(sun)
      setMenufor({display:'none'})

    } else {
      setIcon(system)
      setMenufor({display:'none'})

      
    }
  }, [theme])
  const handelmenu = () => {
 
    setMenufor({display:'flex'})
    if (menufor.display === 'none'){
    setMenufor({display:'flex'})

    }else{
      setMenufor({display:'none'})

    }

  }


  return (
    <>
      <div  onClick={handelmenu} className="relative p-[5px] cursor-pointer border  rounded-lg">
        <Image src={icon} width={20} height={20} />
        <div style={menufor} className='absolute  md:right-2 lg:right-2 font-[500] gap-2  -bottom-[120px] p-1 text-lg text-left border py-2 px-2  flex-col items-start   rounded-sm w-[100px] bg-[white] text-black'  >
          <button className="flex gap-2  "  onClick={() =>  setTheme('dark')}>Dark <Image src={wmoon}  alt="theme" width={24} height={24} /></button>
          <button  className="flex gap-2  " onClick={() => setTheme('light')} >Light <Image src={sun} alt="theme"  width={24} height={24} /></button>
          <button  className="flex gap-2  " onClick={() => setTheme('system')} >System <Image src={system} alt="theme"  width={24} height={24} /></button>
        </div>

      </div>
    </>
  )
}
