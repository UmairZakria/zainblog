'use client'
import React, { useState, useRef,useMemo } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';


import { useTheme } from 'next-themes';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// import JoditEditor from 'jodit-react';
import loading from './ui/loading.gif'
import Image from 'next/image'

const BlogEditor = () => {
  const editor = useRef(null);
  const { theme } = useTheme()
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('')
  const [discription, setDiscription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [loadings, setLoadings] = useState({ display: 'none' })
  const editorConfig = useMemo(() => {
    return {
      theme: theme === 'dark' ? 'dark' : 'default', // Map 'default' for light mode
      readonly: false, // Editable mode
      height: 400, // Editor height
      // Add any other JoditEditor configurations here
    };
  }, [theme]);


  const handelsubmit = (e) => {
    e.preventDefault();
    setLoadings({ display: 'flex' });
    document.body.style.overflow = 'hidden';
    axios.post('/api/blogpost', { title, discription, image, category, content })
    .then(response => 

    {            setLoadings({ display: 'none' });
    setError('done')
    setTimeout(() => {
    setError('')

      
    }, 3000);
    document.body.style.overflow = 'auto';
    
  }
    )
    .catch(error => console.log(error));

  }

  return (
    <>
      <div className="container mx-auto">
        <div style={loadings} className='w-full h-screen absolute flex items-center justify-center top-0 left-0 bg-[#0000005b] '>
          <Image
            className=" object-cover    "
            src={loading} // Path to your image
            sizes={50}
            alt="Description of image"
          />
        </div>
        <form onSubmit={handelsubmit} className='flex flex-col gap-4'>
          <label className='text-lg text-red-500 font-semibold'>{error}</label>
          <input type="submit" value={'Submit'} className='w-full text-white  h-[50px] bg-green-600 text-2xl ' />

          <label htmlFor="" className='text-xl'>Meta Title as Title</label>
          <input onChange={(e) => setTitle(e.target.value)} required type="text" placeholder='Title' className='w-full h-[40px] text-lg  border-2 dark:border-none p-2' />
          <label htmlFor="" className='text-xl'>Meta Discription as Discription</label>
          <textarea onChange={(e) => setDiscription(e.target.value)} required placeholder='Discription' className='w-full h-[80px] text-lg border-2 dark:border-none p-2' name="" id=""></textarea>
          <select onChange={(e) => setCategory(e.target.value)} required name="" id="" className='p-2  border-2 dark:border-none'>
            <option value="">Select category</option>

            <option value="Halloween">Halloween</option>
            <option value="FunIdeas">FunIdeas</option>
            <option value="Party">Party</option>
            <option value="Wedding">Wedding</option>

          </select>
          <label htmlFor="" className='text-xl'>Meta Image as Front Image</label>
          <input required onChange={(e) => setImage(e.target.value)} type="text" placeholder='Image Link' className='w-full h-[40px] text-lg  border-2 dark:border-none p-2' />
          <label htmlFor="" className='text-xl'>Main Content</label>
          <div className='dark:text-black '>

            <JoditEditor
            key={theme}

              ref={editor}
              config={editorConfig}
              value={content}
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => setContent(newContent)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogEditor