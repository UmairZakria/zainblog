'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import loading from './ui/loading.gif'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Sidebar = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState([])
  const [loadings, setLoadings] = useState({ display: 'none' })
  const [search, setSearch] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false

  }

  const getdata = async () => {
    setLoadings({ display: 'flex' });
    document.body.style.overflow = 'hidden';


    try {
      const res = await axios.post('/api/findblogs', { category: 'all' });
      setData(res.data.post)

    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoadings({ display: 'none' });
      document.body.style.overflow = 'auto';

    }
  };
  useEffect(() => {
    getdata();



  }, []);
  useEffect(() => {

    const searchdata = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setSearch(searchdata)
    if (searchQuery === ''){
    setSearch([])

    }



  }, [searchQuery])

  const handelredrict = (title) => {
    router.push(`/Blog/${encodeURIComponent(title)}`)


  }
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
      <div className='lg:border-l-2 md:border-t-2 lg:border-t-0 md:border-l-0 pt-4 lg:w-[450px] w-full px-3 block '>
        <input
          type="text"
          id="search"
          placeholder="Search Article "
          className="search w-full box-border dark:border-none border-2 p-3 pr-[50px] text-lg placeholder:text-[16px]  rounded-lg "
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='space-y-4 my-2'>
          {
              search.slice(0, 5).map((data,index)=>(
                <div key={index}  onClick={() => handelredrict(data.title)} className='flex  w-full h-[80px] gap-1 p-1 cursor-pointer'>
                <img className='h-full w-[35%]' src={data.image} alt={data.image} />
                <h2 className='line-clamp-3'>{data.title}</h2>
    
    
              </div>


              ))
            


          }

        </div>

        <h1 className='text-2xl my-5 '>Latest Articles</h1>
        <div className='space-y-4 hidden lg:block md:block '>
        {
          data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).map((data)=>(

            
          <div key={data._id}  onClick={() => handelredrict(data.title)} className='flex cursor-pointer   w-full lg:h-[80px] md:h-[180px] gap-3 lg:gap-1 p-1 '>
            <img className='h-full md:w-[500px] lg:w-[35%]' src={data.image} alt={data.image} />
            <div className='w-full flex  justify-evenly   flex-col'>

            <h2 className='line-clamp-3 lg:text-[16px] md:text-2xl'>{data.title}</h2>
            <p className='text-gray-700 lg:hidden md:block dark:text-[#a09f9fe0] line-clamp-4 text-sm'>{data.discription}</p>
            
            </div>


          </div>
          ))
          }

        </div>
      <div className="lg:hidden md:hidden w-full h-auto  ">
        <Slider {...settings}>
        {
          data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((data)=>(

            
            <div key={data._id} onClick={() => handelredrict(data.title)} className='border-gray-400 dark:border-gray-700   rounded-lg border cursor-pointer space-y-1 pb-3 flex flex-col '>

            <img src={data.image} className='object-cover  rounded-t-lg w-full h-[180px]' alt={data.title} />

            <div className='mx-4 space-y-2'>
              <h1 className='dark:text-[#ffffffe0] md:text-3xl text-xl  lg:text-2xl line-clamp-2 font-semibold'>{data.title} </h1>
              <div className='flex w-full items-center justify-between  text-gray-600 font-normal dark:text-[#ffffffe0]' >
                <span>{data.category}</span>
              </div>
              <p className='text-gray-700 dark:text-[#a09f9fe0] line-clamp-4 text-sm'>{data.discription}</p>
            </div>
          </div>
          ))
          }
        </Slider>
        </div>
      </div>
    </>
  )
}

export default Sidebar
