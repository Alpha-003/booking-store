import React from 'react'
import classNames from 'classnames'
import HeroImage from '../../public/images/HeroImage.png'
import Image from 'next/image'
import { BsArrowDownCircle } from 'react-icons/bs';


type Props = {
  toJumpRef: React.RefObject<HTMLDivElement>

}


const Hero = (props: Props) => {
  function ScrolltoRef() {
    if (props.toJumpRef.current === null) return
    props.toJumpRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className='relative' >
      <Image src={HeroImage} alt='Image of our building' className='h-[400px] w-[100vw]' />
      <div className='absolute top-[40%] translate-y-[-50%] ml-20'>
        <p className='text-4xl sm:text-5xl text-white font-bold mb-2 lg:text-6xl '>South East Melbourne</p>
        <p className='text-lg sm:text-xl lg:w-[80%]  text-white mb-4 lg:text-2xl '>Servicing: Oakleigh, Clayton, Chadstone, Huntingdale, Mount Waverley and all neighbouring suburbs</p>
        <BsArrowDownCircle onClick={ScrolltoRef} size={40} color='#E6B42D' className='text-center  animate-bounce cursor-pointer ' />
      </div>

    </div>
  )
}

export default Hero

const HeroText = classNames(" text-6xl")
