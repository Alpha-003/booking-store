import classNames from 'classnames';
import React from 'react'
import { AiFillMessage } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { MdWorkHistory } from 'react-icons/md';
import { SiOpenaccess } from 'react-icons/si';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ImagePeople from '../../public/images/ImagePeople.png'
import ImagePeople2 from '../../public/images/ImagePeople2.png'
import ImagePeople3 from '../../public/images/ImagePeople3.png'
import ImagePeople4 from '../../public/images/ImagePeople4.png'
import Image from 'next/image';
import Link from 'next/link';



type Props = {}
const LocationInfo = (props: Props) => {
  let array = [ImagePeople, ImagePeople2, ImagePeople3, ImagePeople4]
  return (
    <div className='flex flex-col-reverse lg:flex lg:flex-row lg:gap-10 '>
      <div className={Container}>
        <p className='text-2xl   mt-10 mb-2 sm:text-4xl sm:mt-20 lg:text-5xl lg:mb-4'>Storage South East Melbourne</p>
        <p className='text-md sm:text-lg '>At StorageX, we offer diverse storage units in multiple sizes and
          specialty storage to fit your needs, whether you're moving, running out of space, or need to store a
          prized possession. Our team is always ready to help, ensuring a stress-free experience
        </p>
        <div className={mainDataContainer}>

          <div className={miniDataBox}>
            <div className={titleIcon}>
              <ImLocation2 size={20} className={Icon} />
              <p className={Title}>Address</p>
            </div>
            <p className={Desc}>1313-1315 North Road Huntingdale,Victoria 3166</p>


          </div>


          <div className={miniDataBox}>
            <div className={titleIcon}>
              <MdWorkHistory size={20} className={Icon}></MdWorkHistory>
              <p className={Title}>Office Hours</p>
            </div>
            <p className={Desc}><span className=' font-semibold'>M-F</span>:8:30am – 5:00pm</p>
            <p className={Desc}><span className=' font-semibold ml-[-2px]'>SAT</span>:8:30am – 2:00pm</p>
          </div>





          <div className={miniDataBox}>
            <div className={titleIcon}>
              <AiFillMessage size={20} className={Icon} ></AiFillMessage>
              <p className={Title}>Contact</p>
            </div>

            <a href="tel:+03-4328-5546" className={Desc}><span className='font-semibold'>Phone:</span> (03) 4328 5546</a>
            <p className={Desc}><span className='font-semibold'>Email:</span> info@storagex.com.au</p>

          </div>

          <div className={miniDataBox}>
            <div className={titleIcon}>
              <SiOpenaccess size={20} className={Icon} color='black' ></SiOpenaccess>
              <p className={Title}>Access Hours</p>
            </div>
            <p className={Desc}><span className='text-xl font-bold'>5:00am to 10:00pm</span></p>
          </div>



        </div>
      </div>
      <div className='w-[80%] ml-auto mr-auto sm:w-[60%] md:w-[50%]  lg:w-[100%] lg:mr-0 lg:ml-0 lg:mt-20 relative'>
        <Carousel className=' rounded-xl' showThumbs={false} showIndicators={false} swipeable showStatus={false} autoPlay infiniteLoop>
          {array.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt='Image of people packing' />
              </div>


            )

          })}


        </Carousel>

        {/* <div className='grid  grid-cols-2 grid-rows-2  gap-4 mt-4'>
          <div>
            <p className={SmallDesc}>24/7 Camera Security Surveillance</p>
          </div>
          <div>
            <p className={SmallDesc}>Individually alarmed units</p>
          </div>
          <div>
            <p className={SmallDesc}>Coded key pads at all entrances</p>
          </div>
          <div>
            <p className={SmallDesc}>Fenced Perimeter</p>
          </div>
        </div> */}

      </div>



    </div >
  )
}

export default LocationInfo
const Container = classNames('')
const mainDataContainer = classNames('grid grid-cols-1 gap-5 mt-10 w-[60%] ml-auto mr-auto  sm:w-[80%]  sm:grid-cols-2    lg:gap-10 lg:ml-0 lg:mr-0 lg:w-[90%] xl:w-[80%]')
// const Col = classNames('mt-10 flex flex-col gap-10 w-[300px] ')
const miniDataBox = classNames('text-white   px4 py-4 rounded-lg  flex flex-col justify-center items-center bg-[#e6b42d] ')
const Title = classNames('text-2xl ')
const Desc = classNames('text-lg mb-2 inline text-center')
const titleIcon = classNames('flex items-center gap-2 mb-2 ')
const Icon = classNames('font-bold text-black ')
