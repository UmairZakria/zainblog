'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import Scroll from "@/components/Scroll";

// import { useEffect, useState } from 'react'
import React, { useState, useRef, useEffect } from 'react';


import JoditEditor from 'jodit-react';
import loading from './ui/loading.gif'
import Image from 'next/image'



const Page = ({ params }) => {
  const title = decodeURIComponent(params.title);

  // const rout = useRouter()
  const editor = useRef(null);
  const [content, setContent] = useState('Loading...');
  const [post, setPost] = useState({ title: 'Loading...', discription: 'Loading...', image: 'Loading...', category: 'Loading...', content: 'Loading...' })
  const [ctitle, setCtitle] = useState(post.title)
  const [discription, setDiscription] = useState(post.discription)
  const [category, setCategory] = useState(post.category)
  const [error, setError] = useState('')

  const [image, setImage] = useState(post.image)
  const [loadings, setLoadings] = useState({ display: 'none' })

  const getdata =  (title) => {
    document.body.style.overflowY = 'hidden';
    setLoadings({ display: 'flex' });


    try {
    axios.post('/api/findpost', {title})
    .then((res)=>{
      setPost(res.data.post)
      setPost(res.data.post)
      setContent(res.data.post.content)
      setCtitle(res.data.post.title)
      setCategory(res.data.post.category)
      setImage(res.data.post.image)
      setDiscription(res.data.post.discription)
      document.body.style.overflowY = 'auto';
      setLoadings({ display: 'none' });
    })
    .catch((err)=>{console.log(err)})



    } catch (error) {
      console.error('Error fetching post:', error);
      document.body.style.overflowY = 'auto';
      setLoadings({ display: 'none' });
    } 
  };
  useEffect(() => {

    getdata(title);

  }, [title]);
  const handelsubmit = (e) => {
    e.preventDefault();
    setLoadings({ display: 'flex' });
    document.body.style.overflow = 'hidden';
    axios.put('/api/blogpost', { title, ctitle, discription, image, category, content })
      .then((response) => {
        setLoadings({ display: 'none' });
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

      <div style={loadings} className='w-full h-screen absolute flex items-center justify-center top-0 left-0 bg-[#0000005b] '>
        <Image
          className=" object-cover    "
          src={loading} // Path to your image
          sizes={50}
          alt="Description of image"
        />
      </div>

      <div>
        <Scroll />
        <form onSubmit={handelsubmit} className=' container mx-auto flex flex-col gap-4'>
          <label className='text-2xl text-red-500 font-semibold'>{error}</label>
          <input type="submit" value={'UPdate'} className='w-full text-white  h-[50px] bg-green-600 text-2xl ' />

          <label htmlFor="" className='text-xl'>Meta Title as Title</label>
          <input value={ctitle} onChange={(e) => setCtitle(e.target.value)} required type="text" placeholder='Title' className='w-full h-[40px] text-lg  border-2 dark:border-none p-2' />
          <label htmlFor="" className='text-xl'>Meta Discription as Discription</label>
          <textarea value={discription} onChange={(e) => setDiscription(e.target.value)} required placeholder='Discription' className='w-full h-[80px] text-lg border-2 dark:border-none p-2' name="" id=""></textarea>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required name="" id="" className='p-2  border-2 dark:border-none'>
            <option value="">Select category</option>

            <option value="Halloween">Halloween</option>
            <option value="FunIdeas">FunIdeas</option>
            <option value="Party">Party</option>
            <option value="Wedding">Wedding</option>


          </select>
          <label htmlFor="" className='text-xl'>Meta Image as Front Image</label>
          <input value={image} required onChange={(e) => setImage(e.target.value)} type="text" placeholder='Image Link' className='w-full h-[40px] text-lg  border-2 dark:border-none p-2' />
          <label htmlFor="" className='text-xl'>Main Content</label>
          <div className='dark:text-black '>

            <JoditEditor

              ref={editor}
              value={content}
              // tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => setContent(newContent)}
            />
          </div>
        </form>
      </div>






    </>
  )
}

export default Page
