import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import Logo from '../../public/images/Logo.png'
import Link from 'next/link'

import { IoCall } from 'react-icons/io5';

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className={'flex justify-between  items-center px-6 sm:px-20 py-[24px] bg-primary '}>
      <Link href={'https://storagex.com.au/'} className={' cursor-pointer'}>
        <Image src={Logo} alt='Logo Image' placeholder='blur' priority blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAAyCAYAAACqECmXAAAAu0lEQVR42u3VMQ0AMAgAsKF8Pzc28MiFCJLWRCOr/wMATguhA4DQAQChAwBCBwCEDgBCBwCEDgAIHQAQOgAIHQAQOgAgdABA6AAgdABA6ACA0AEAoQOA0AEAoQMAQgcAhA4AQgcAhA4ACB0AEDoACB0AEDoAIHQAQOgAIHQAQOgAgNABAKEDgNABAKEDAEIHAIQOAEIHAIQOAAgdABA6AAhd6AAgdABA6ACA0AEAoQOA0AEAoQMAQgcA1gAumHKnLUkH+gAAAABJRU5ErkJggg==' />
      </Link>
      <a href="tel:03-4328-5546">
        <IoCall className='text-white  text-[30px]  sm:text-[40px]   cursor-pointer' />
      </a>
      {/* <div className='flex gap-20 items-center'>
        <button className=' py-[10px] px-[25px] rounded-md bg-white text-black  text-[20px] hover:bg-black  hover:text-white  transition-colors  duration-300 '>CONTACT US</button>
        <p className='text-black  text-[20px] cursor-pointer'>(03) 4328 2845</p>
      </div> */}



    </div>
  )
}

export default Navbar



