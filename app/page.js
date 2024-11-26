"use client"
import loading from './ui/loading.gif'
import Image from 'next/image'

import { format } from 'date-fns';

import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Slider from 'react-slick';
import { motion } from 'framer-motion';



export default function Home() {
  const [data, setData] = useState([])
  const router = useRouter()

  const [loadings, setLoadings] = useState({ display: 'none' })


  const getdata = async () => {
    setLoadings({ display: 'flex' });
    document.body.style.overflow = 'hidden';


    try {
      const res = await axios.post('/api/findblogs', { category: 'all' });
      console.log(res)
      setData(res.data.post)
      setLoadings({ display: 'none' });
      document.body.style.overflow = 'auto';

    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handelredrict = (title) => {
    router.push(`/Blog/${encodeURIComponent(title)}`)


  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // Large screen breakpoint (can be adjusted)
        settings: {
          slidesToShow: 3, // Show 3 slides on larger screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Medium screen breakpoint
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          arrows: false,

        },
      },

      {
        breakpoint: 768, // Mobile breakpoint (can be adjusted)
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          slidesToScroll: 1,
          arrows: false,

        },
      },
    ],
    arrows: true,

  };




  return (
    <>
      <div style={loadings} className='w-full h-screen absolute flex items-center justify-center top-0 left-0 bg-[#0000005b] '>
        <Image
          className=" object-cover    "
          src={loading}
          sizes={50}
          alt="Loading"
        />
      </div>

      <div className="w-full h-auto py-2 gap-3 items-center flex-col md:flex-row lg:flex-row  justify-around mt-2 lg:mt-10 bg-[#effbf6] dark:bg-[#020817] flex ">
        <div className=" px-2 text-center  font-normal lg:text-lg lg:font-medium gap-3 flex-grow text-green-500 text-md w-full flex flex-col justify-center items-center">
          <h1 className="lg:text-6xl text-center md:text-4xl text-3xl font-semibold text-green-500  ">Welcome to ZainBloggers</h1>
          <p className="w-full lg:w-3/4  text-center lg:leading-10 md:leading-8 leading-8 line-clamp-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tenetur illo praesentium! Vel nam eaque delectus consequatur possimus officiis placeat cumque rem laudantium sed tenetur dolorum sint, aperiam amet qui.</p>
          <p className="w-full lg:w-[70%] line-clamp-2">Lorem ipsum  quas quos earum laborum sit veniam, aut voluptate eligendi itaque est minima molestias magnam?</p>

        </div>
        <div className=" w-full  lg:w-[70%]  ">
          <img
            className=" object-cover w-[300px] h-[400px] mx-auto"
            src="https://picsum.photos/300/500" // Path to your image
            alt="Description of image"

          />
        </div>

      </div>
      <div className="line h-[2px] w-full bg-gray-700 my-5"></div>
      <motion.div initial={{ opacity: 0.1, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1 }} viewport={{ once: true }} className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-auto px-6 text-gray-500">
        <div className="border-2  dark:border dark:border-gray-500  w-full shadow-lg shadow-gray-300  dark:shadow-none  ">
          <img
            className=" object-cover"
            src="https://images.pexels.com/photos/3171811/pexels-photo-3171811.jpeg?auto=compress&cs=tinysrgb&w=400" // Path to your image
            alt="Description of image"
            width={300}
            height={400}
            layout="responsive"

          />
          <h1 className="py-8 text-center text-3xl italic hover:text-green-600 font-medium">
            Party
          </h1>
        </div>
        <div className="border-2   dark:border dark:border-gray-500 w-full shadow-lg  shadow-gray-300  dark:shadow-none  ">

          <img
            className=" object-cover"
            src="https://images.pexels.com/photos/2917380/pexels-photo-2917380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Path to your image
            alt="Description of image"
            width={300}
            layout="responsive"

            height={400}
          />

          <h1 className="py-8 text-center text-3xl italic hover:text-green-600 font-medium">
            Wedding
          </h1>
        </div>
        <div className="border-2  dark:border dark:border-gray-500  w-full shadow-lg shadow-gray-300  dark:shadow-none  ">
          <img
            className=" object-cover"
            src="https://images.pexels.com/photos/3051525/pexels-photo-3051525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Path to your image
            alt="Description of image"
            width={300}
            height={400}
            layout="responsive"

          />
          <h1 className="py-8 text-center text-3xl italic hover:text-green-600 font-medium">
            Halloween
          </h1>
        </div>
        <div className="border-2   dark:border dark:border-gray-500 w-full shadow-lg shadow-gray-300   dark:shadow-none ">
          <img
            className=" object-cover"
            src="https://images.pexels.com/photos/19698923/pexels-photo-19698923/free-photo-of-happy-new-year-2023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Path to your image
            alt="Description of image"
            width={300}
            layout="responsive"

            height={400}
          />
          <h1 className="py-8 text-center text-3xl italic hover:text-green-600 font-medium">
            Fun Ideas
          </h1>
        </div>
      </motion.div>
      <motion.div initial={{ y: 200 }} whileInView={{ y: 0 }} transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 150 }} viewport={{ once: true }}>

        <h1 className=" w-[90%] mx-auto  text-3xl lg:text-4xl mb-10 mt-20" >Latest Articles To Read :</h1>
        <div className="flex w-[88%] flex-col   gap-5   mx-auto h-auto ">
        {
        data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).map((data)=>(

          <div key={data._id} className="lg:col-span-2 md:h-[200px] h-[80px] lg:h-[200px]  flex     md:p-0 lg:border-none md:border-none  flex-row md:flex-row gap-2 items-center justify-between">
            <img src={data.image} className="object-cover h-full  md:w-[300px] w-1/3 lg:w-[300px] " alt="" />
            <div className="  w-full  flex flex-col  gap-1 h-auto lg:h-full md:h-full items-start md:justify-evenly justify-start lg:justify-evenly ">

              <h1 className="md:text-3xl text-lg font-medium lg:text-3xl line-clamp-3">{data.title}</h1>
              <p className="hidden lg:block md:block line-clamp-3 text-gray-800 dark:text-gray-300 text-md">{data.discription}</p>
            </div>


          </div>



        ))
        }
        </div>

      </motion.div>
      <div>

        <div className="container mb-10 mt-20 mx-auto flex justify-between items-center w-full ">

          <h1 className="  font-bold  text-4xl lg:text-5xl " >Party</h1>
          <Link href={'/Party'} className='underline text-blue-600 cursor-pointer'>View all</Link>
        </div>

        <div className="container relative mx-auto my-10  ">
          <Slider {...settings}>

            {data
              .filter(item => item.category.includes('Party'))
              .map((data, index) => (
                <>
                  <motion.div
                    initial={{ scale: 0.4 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    key={data._id} onClick={() => handelredrict(data.title)} className='border-gray-400 dark:border-gray-700   rounded-lg border  mx-2 cursor-pointer space-y-1 pb-10 flex flex-col '>

                    <img src={data.image} className='object-cover  rounded-t-lg  h-[250px]' alt={data.title} />

                    <div className='mx-4 space-y-2 h-[150px] '>
                      <h1 className='dark:text-[#ffffffe0] md:text-3xl text-xl  lg:text-2xl line-clamp-2 font-semibold'>{data.title} </h1>
                      <div className='flex w-full items-center justify-between  text-gray-600 font-normal dark:text-[#ffffffe0]' >
                        <span>{data.category}</span>
                        <span>{format(new Date(data.date), 'MMM dd yyyy')}</span>
                      </div>
                      <p className='text-gray-700 dark:text-[#a09f9fe0] line-clamp-3 text-sm'>{data.discription}</p>
                    </div>
                  </motion.div>
                </>
              ))
            }
          </Slider>

        </div>
      </div>
      <div>

        <div className="container mb-10 mt-20 mx-auto flex justify-between items-center w-full ">

          <h1 className="  font-bold  text-4xl lg:text-5xl " >Wedding</h1>
          <Link href={'/Wedding'} className='underline text-blue-600 cursor-pointer'>View all</Link>
        </div>

        <div className="container relative mx-auto my-10  ">
          <Slider {...settings}>

            {data
              .filter(item => item.category.includes('Wedding'))
              .map((data, index) => (
                <>
                  <motion.div
                    initial={{ scale: 0.4 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    key={data._id} onClick={() => handelredrict(data.title)} className='border-gray-400 dark:border-gray-700   rounded-lg border  mx-2 cursor-pointer space-y-1 pb-10 flex flex-col '>

                    <img src={data.image} className='object-cover  rounded-t-lg  h-[250px]' alt={data.title} />

                    <div className='mx-4 space-y-2 h-[150px] '>
                      <h1 className='dark:text-[#ffffffe0] md:text-3xl text-xl  lg:text-2xl line-clamp-2 font-semibold'>{data.title} </h1>
                      <div className='flex w-full items-center justify-between  text-gray-600 font-normal dark:text-[#ffffffe0]' >
                        <span>{data.category}</span>
                        <span>{format(new Date(data.date), 'MMM dd yyyy')}</span>
                      </div>
                      <p className='text-gray-700 dark:text-[#a09f9fe0] line-clamp-3 text-sm'>{data.discription}</p>
                    </div>
                  </motion.div>
                </>
              ))
            }
          </Slider>

        </div>
      </div>
      <div>

        <div className="container mb-10 mt-20 mx-auto flex justify-between items-center w-full ">

          <h1 className="  font-bold  text-4xl lg:text-5xl " >Fun Ideas</h1>
          <Link href={'/Fun'} className='underline text-blue-600 cursor-pointer'>View all</Link>
        </div>

        <div className="container relative mx-auto my-10  ">
          <Slider {...settings}>

            {data
              .filter(item => item.category.includes('FunIdeas'))
              .map((data, index) => (
                <>
                  <motion.div
                    initial={{ scale: 0.4 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    key={data._id} onClick={() => handelredrict(data.title)} className='border-gray-400 dark:border-gray-700   rounded-lg border  mx-2 cursor-pointer space-y-1 pb-10 flex flex-col '>

                    <img src={data.image} className='object-cover  rounded-t-lg  h-[250px]' alt={data.title} />

                    <div className='mx-4 space-y-2 h-[150px] '>
                      <h1 className='dark:text-[#ffffffe0] md:text-3xl text-xl  lg:text-2xl line-clamp-2 font-semibold'>{data.title} </h1>
                      <div className='flex w-full items-center justify-between  text-gray-600 font-normal dark:text-[#ffffffe0]' >
                        <span>{data.category}</span>
                        <span>{format(new Date(data.date), 'MMM dd yyyy')}</span>
                      </div>
                      <p className='text-gray-700 dark:text-[#a09f9fe0] line-clamp-3 text-sm'>{data.discription}</p>
                    </div>
                  </motion.div>
                </>
              ))
            }
          </Slider>

        </div>

      </div>
      <div>

<div className="container mb-10 mt-20 mx-auto flex justify-between items-center w-full ">

  <h1 className="  font-bold  text-4xl lg:text-5xl " >Halloween</h1>
  <Link href={'/Halloween'} className='underline text-blue-600 cursor-pointer'>View all</Link>
</div>

<div className="container relative mx-auto my-10  ">
  <Slider {...settings}>

    {data
      .filter(item => item.category.includes('Halloween'))
      .map((data, index) => (
        <>
          <motion.div
            initial={{ scale: 0.4 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            key={data._id} onClick={() => handelredrict(data.title)} className='border-gray-400 dark:border-gray-700   rounded-lg border  mx-2 cursor-pointer space-y-1 pb-10 flex flex-col '>

            <img src={data.image} className='object-cover  rounded-t-lg  h-[250px]' alt={data.title} />

            <div className='mx-4 space-y-2 h-[150px] '>
              <h1 className='dark:text-[#ffffffe0] md:text-3xl text-xl  lg:text-2xl line-clamp-2 font-semibold'>{data.title} </h1>
              <div className='flex w-full items-center justify-between  text-gray-600 font-normal dark:text-[#ffffffe0]' >
                <span>{data.category}</span>
                <span>{format(new Date(data.date), 'MMM dd yyyy')}</span>
              </div>
              <p className='text-gray-700 dark:text-[#a09f9fe0] line-clamp-3 text-sm'>{data.discription}</p>
            </div>
          </motion.div>
        </>
      ))
    }
  </Slider>

</div>

</div>

    </>
  );
}
