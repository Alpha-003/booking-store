import { PersonalForm } from '@/pages/Reservation'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { BsClockFill } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { RiAlarmWarningFill, RiLockPasswordFill } from 'react-icons/ri'
import { SiOpenaccess } from 'react-icons/si'
import Image from 'next/image'
import Box1 from '../../public/images/Box1.png'
import Box2 from '../../public/images/Box2.png'
import Box3 from '../../public/images/Box3.png'
import Link from 'next/link'
import { BaseURL } from '@/Constants'
type Props = {
  setCurrentFormStage: (step: number) => void

}




const FeedBackForm = (props: Props) => {
  const [DataStored, setDataStored] = useState<PersonalForm | null>(null)

  useEffect(() => {
    //Getting Data from localstorage and setting it  with a state
    let DataStored = localStorage.getItem('DataToStore')

    let DataStoredObject = DataStored ? JSON.parse(DataStored) : null
    // console.log("//////////////////")
    // console.log("DataStored from the localstorage in the infoForm.tsx")
    // console.log(DataStoredObject)
    // console.log("//////////////////")

    setDataStored(DataStoredObject)

    //Clear Local Storage


  }, [])

  useEffect(() => {
    if (DataStored) {
      localStorage.clear()
    }

  }, [DataStored])

  return (
    <div className='flex flex-col items-center text-white xl;pt-32 pt-10 pb-40 gap-10  bg-black   '>
      <p className='text-xl text-center xl:text-3xl  px-40 '>Thank you {DataStored?.firstName} for choosing StorageX. An Email will be sent to you shortly to finalize your first payment. We look forward to your arrival on {DataStored?.DatePicker}. </p>
      <p className='text-xl font-bold'>Your unit </p>

      <div className='  text-center   border-[5px] rounded-lg border-[#e6b42d] lg:grid lg:grid-cols-3  lg:items-start lg:w-[60%]'>
        <div className='px-10 xl:px-8 py-2 flex flex-col justify-center '>
          <p className={Title}>{DataStored?.size_category}</p>
          <p className='opacity-9  text-lg font-bold mt-1 mb-1  '>{DataStored?.length}<span className='text-md font-light'>m</span> X {DataStored?.width}<span className='text-md font-light'>m</span></p>
          <p className='text-md text-bold w-[200px] ml-auto mr-auto '>Unit {DataStored?.description}</p>
          <p className='  text-md mb-3'>{DataStored?.type_category}</p>
          <div className={titleIcon}>
            <SiOpenaccess color='#e6bb2d'></SiOpenaccess>
            <p className={Desc}>All week Access</p>
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
          <p ><span className='text-2xl font-bold text-[#e6bb2d] xl:text-4xl'>${DataStored?.monthly_rack_rate}</span>/mo</p>

        </div>
        <div
          className='border-t-[5px] flex h-[100%] flex-col  items-center gap-4 px-4 py-4 cursor-pointer text-xl   
     border-[#e6bb2d]  border-r-0 hover:bg-[#e6b42d]  transition-color duration-300 lg:border-l-[5px] lg:border-t-0'>


          <div className=' flex  items-center  justify-center gap-4 '>

          </div>
          <Image src={DataStored?.size_category.toLowerCase() == "small" ? Box1 : DataStored?.size_category.toLowerCase() == 'x-large' ? Box3 : Box2} className="w-[80%]" alt='3D image of the container unit' ></Image>
        </div>


      </div >

      <div className='flex flex-col md:flex-row  gap-4 xl:gap-20 mt-4 '>

        <a href="tel:+03-4328-5546" type='button' className={`${button}`}>Call us for more Info</a>
        <Link href={BaseURL} type='button' className={`${button}`}>Home Page</Link>
      </div>


    </div>


  )
}

export default FeedBackForm


const button = classNames('px-10 py-2   rounded-lg text-xl  transition-all duration-300 text-black  text-xl bg-primary   hover:opacity-80')
const Title = classNames('text-xl xl:text-2xl ')
const Desc = classNames('text-sm xl:text-lg ')
const titleIcon = classNames('flex items-center gap-2 mb-2 ')
