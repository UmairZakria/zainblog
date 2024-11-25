'use client'
import Image from 'next/image'
import loading from './ui/loading.gif'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Scroll from "@/components/Scroll";


import { useEffect, useState } from 'react'
const page = ({ params }) => {
    const router = useRouter()
    const title = decodeURIComponent(params.title);
    const [content, setContent] = useState('')
    const [post, setPost] = useState({title:'',content:''})
    const [loadings, setLoadings] = useState({ display: 'none' })

    const getdata = async (title) => {
        document.body.style.overflow = 'hidden';
        setLoadings({ display: 'flex' });


        try {
            const res = await axios.post('/api/findpost', { title });
            setPost(res.data.post)

        } catch (error) {
            console.error('Error fetching post:', error);
            router.push('/')
        } finally {
             document.body.style.overflow = 'auto';

            setLoadings({ display: 'none' });


        }
    };

    useEffect(() => {
        console.log(title);
        getdata(title);
    }, [title]);



    return (
        <>
      <Scroll />
        
        <div className='flex lg:w-[95%] w-full  ml-[4%] my-10 gap-4  h-auto min-h-screen '>

            <div style={loadings} className='w-full h-screen absolute flex items-center justify-center top-0 left-0 bg-[#0000005b] '>
                <Image
                    className=" object-cover    "
                    src={loading} // Path to your image
                    sizes={50}
                    alt="Description of image"
                />
            </div>
            <div className=' w-full h-full '>

                
                <h1 className='text-[40px]  font-semibold w-3/4 '>{post.title}</h1>
                <div className='h-[2px]  w-full my-5 bg-black dark:bg-white'></div>




                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>


            <Sidebar />


        </div>
        </>

    )
}

export default page
