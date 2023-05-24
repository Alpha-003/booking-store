import classNames from 'classnames'
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import Box1 from '../../public/images/Box1.png'
import Box2 from '../../public/images/Box2.png'
import Box3 from '../../public/images/Box3.png'
import Image from 'next/image';
import { SiOpenaccess } from 'react-icons/si';
import { RiLockPasswordFill, RiAlarmWarningFill } from 'react-icons/ri';
import { GiSpikedFence } from 'react-icons/gi';
import { BsClockFill } from 'react-icons/bs';
import DataContext from '@/context/DataContext';
import { DataInterface } from '@/pages';


type Props = {
  Data: DataInterface
}

const Unit = (props: Props) => {
  const [Anim, SetAnim] = useState(false);
  const { setOpenCTA, setSelectedUnit } = React.useContext(DataContext)

  return (
    <div className='  text-center   border-[5px] rounded-lg border-[#e6b42d] xl:grid xl:grid-cols-3  xl:items-start xl:w-[60%]'>
      <div className='px-10 xl:px-8 py-2 flex flex-col justify-center '>
        <p className={Title}>{props.Data.size_category}</p>
        <p className='opacity-9  text-lg font-bold mt-1 mb-1  '>{props.Data.length}<span className='text-md font-light'>m</span> X {props.Data.width}<span className='text-md font-light'>m</span></p>
        <p className='text-md text-bold w-[200px] ml-auto mr-auto '>Unit {props.Data.description}</p>
        <p className='  text-md mb-3'>{props.Data.type_category}</p>
        <div className={titleIcon}>
          <SiOpenaccess color='#e6bb2d'></SiOpenaccess>
          <p className={Desc}>7 days Access</p>
        </div>
        <div className={titleIcon}>
          <RiAlarmWarningFill color='#e6bb2d'></RiAlarmWarningFill>
          <p className={Desc}>Alarmed</p>
        </div>
        <div className={titleIcon}>
          <RiLockPasswordFill color='#e6bb2d'></RiLockPasswordFill>
          <p className={Desc}>Coded keypads</p>
        </div>

      </div>
      <div className='px-8 py-2'>
        <p className={Title}>Price</p>
        <p ><span className='text-2xl font-bold text-[#e6bb2d] xl:text-4xl'>${props.Data.monthly_rack_rate}</span> per month</p>
        <div className='flex items-center gap-1 mb-2  justify-center xl:mt-2'>
          <BsClockFill color='#e6bb2d'></BsClockFill>
          <p className='text-sm'>{props.Data.total_vacant} Spaces left!</p>
        </div>
      </div>
      <div onClick={() => {
        setSelectedUnit(props.Data)
        setOpenCTA(true)
      }
      } onMouseEnter={() => { SetAnim(true) }} onMouseLeave={() => { SetAnim(false) }}
        className='border-t-[5px] flex h-[100%] flex-col  items-center gap-4 px-4 py-4 cursor-pointer text-xl   
       border-[#e6bb2d]  border-r-0 hover:bg-[#e6b42d]  transition-color duration-300 xl:border-l-[5px] xl:border-t-0'>


        <div className=' flex  items-center  justify-center gap-4 '>
          <button className='font-bold' >
            Select Unit
          </button>
          <IoIosArrowDown color='#e6bb2d'></IoIosArrowDown>
        </div>
        <Image src={props.Data.size_category.toLowerCase() == "small" ? Box1 : props.Data.size_category.toLowerCase() == 'x-large' ? Box3 : Box2} className={`${Anim ? 'animate-FlyAnimSlowSlow' : ""} w-[80%]`} alt='3D image of the container unit' ></Image>
      </div>


    </div >
  )
}

export default Unit
const Title = classNames('text-xl xl:text-2xl ')
const Desc = classNames('text-sm xl:text-lg ')
const titleIcon = classNames('flex items-center gap-2 mb-2 ')

