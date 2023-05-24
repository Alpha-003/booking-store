import ContractForm from '@/Components/form/ContractForm';
import FeedBackForm from '@/Components/form/FeedBackForm';
import InfoForm from '@/Components/form/InfoForm';
import PaymentForm from '@/Components/form/PaymentForm';
import Navbar from '@/ComponentsShared/navbar/Navbar';
import Spinner from '@/ComponentsShared/spinner/Spinner';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
//@ts-ignore

import { TiTickOutline } from 'react-icons/ti';
import { IoChevronBack } from 'react-icons/io5';


type Props = {}

export interface PersonalForm {


  //Initial Data
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  companyName?: string
  DatePicker?: string
  futherInfo?: string
  ABN?: number
  //Unit 
  id: number;
  description: string;
  code: string;
  monthly_rack_rate: number;
  type_category: string;
  size_category: string;
  total_vacant: number;
  length: number;
  width: number;

  //address
  streetAddress: string
  suburb: string,
  postCode: number,
  state?: string,
  country?: string
  Agreed?: boolean
  Payment?: boolean
  LeadID?: number
  //Reservation
  reservation_id?: number,
  customer_id?: number,
  reservation_number?: string,
  customer_code?: string
  //Agreement
  agreement_id?: number
  agreement_number?: string


}





const Reservation = (props: Props) => {


  let router = useRouter();


  const [CurrentFormStage, setCurrentFormStage] = useState(1);
  const [DataStoredInfo, setDataStoredInfo] = useState<PersonalForm | null>(null)
  const [Loading, setLoading] = useState(true);
  const Steps = ['Personal Details', 'Rental Confirmation']

  let [isReady, setIsReady] = useState(false);



  function CurrentFormChecker(data: PersonalForm) {
    if (!data?.customer_id) {
      setCurrentFormStage(1)

    }
    else {
      if (data?.Agreed) {
        if (data?.Payment) {
          setCurrentFormStage(2)
        }
        else {
          setCurrentFormStage(2)//CHANGE
        }
      }
      else {
        setCurrentFormStage(2)//CHANGE
      }
    }
  }



  function handleBack() {
    setCurrentFormStage(prev => prev - 1)

  }

  useEffect(() => {
    //get DataToStore from localstorage 
    async function getLocalStorage() {
      setLoading(true);
      let DataStored = localStorage.getItem('DataToStore')
      let DataStoredObject = DataStored ? JSON.parse(DataStored) : null
      // console.log("//////////////////")
      // console.log("DataStored from the localstorage in the Reservation.tsx")
      // console.log(DataStoredObject)
      // setDataStoredInfo(DataStoredObject)
      // console.log("//////////////////")
      if (DataStoredObject === null) {

        //route to index page
        await router.push('/')
      }
      else {
        setDataStoredInfo(DataStoredObject)
        CurrentFormChecker(DataStoredObject)
      }


      setLoading(false);

    }

    getLocalStorage();


  }, [router.pathname])




  if (Loading) {
    return (
      <div className='w-full  h-screen bg-transparent flex justify-center items-center'>

        <Spinner />

      </div>

    )
  }



  return (
    <div className='text-gray-600  '>

      <Navbar></Navbar>



      <div className="flex w-full overflow-x-auto gap-10 items-center  p-6  lg:justify-center  transition-all duration-300    bg-[#1a1a1a]  border-gray-200  shadow-sm text-gray-400 ">
        {Steps.map((item, index) => {
          return (
            <li className="flex items-center   ">
              <span className={`${bannerItemNumber}  ${CurrentFormStage == index + 1 ? bannerItemNumberChoosen : bannerItemNumberNotChoosen}`}>
                {index + 1}
              </span>
              <p className={`${CurrentFormStage == index + 1 && bannerItemTitleChoosen} `}>
                {item}
              </p>
              {index + 1 === Steps.length ? <TiTickOutline className={`w-6 h-6  ml-2 ${CurrentFormStage == index + 1 && bannerIconChoosen}`} /> :
                <svg aria-hidden="true" className={`w-4 h-4  ml-2 ${CurrentFormStage == index + 1 && bannerIconChoosen}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>}
            </li>
          )
        })}









      </div>

      {(CurrentFormStage !== 2 && CurrentFormStage !== 1) && <div className=' absolute z-10 inline-flex items-center gap-4 cursor-pointer    px-4 py-10 ' onClick={handleBack}>
        <IoChevronBack className='text-[40px]'> </IoChevronBack>
      </div>}

      {CurrentFormStage === 2 && <FeedBackForm setCurrentFormStage={setCurrentFormStage} />}

      {/* <div className=' flex  justify-center'>

      </div> */}

      {CurrentFormStage !== 2 && <div className=' grid  lg:grid-cols-3 lg:gap-20 pt-10'>
        <div className=' lg:col-span-2 lg:pb-40  '>

          {CurrentFormStage === 1 && <InfoForm setCurrentFormStage={setCurrentFormStage} />}
          {/* {CurrentFormStage === 2 && < ContractForm setCurrentFormStage={setCurrentFormStage} />} */}
          {/* {CurrentFormStage === 3 && <PaymentForm ready={isReady} setCurrentFormStage={setCurrentFormStage} />} */}
        </div>

        {CurrentFormStage != 2 && <div>

          <div className=' border-2  p-4 lg:mt-12 lg:w-[90%] '>
            <h2 className='text-2xl mb-6'>Space & Location</h2>
            <div className='mb-4'>
              <p className='font-bold'>Chosen space</p>
              <p >{DataStoredInfo?.description} {DataStoredInfo?.size_category} {DataStoredInfo?.length}m X {DataStoredInfo?.width}m</p>
            </div>

            <div className='mb-2'>
              <p className='font-bold'>Payment Plan</p>
              <p> Automatic recurring monthly payments</p>
              <p>Monthly Storage Fee: ${DataStoredInfo?.monthly_rack_rate}</p>
            </div>

            <div className='mb-2'>
              <p className='font-bold'>Move in details
              </p>
              <p>Move In Date: {DataStoredInfo?.DatePicker}</p>
            </div>

          </div>






        </div>}


      </div>}


    </div>
  )
}

export default Reservation


const bannerItemTitleChoosen = classNames('text-lg mr-2 text-white ')

const bannerItemNumber = classNames('flex items-center mr-2 justify-center border  rounded-full shrink-0 border-gray-600')
const bannerItemNumberChoosen = classNames(" w-8 h-8   text-lg bg-primary text-black")
const bannerItemNumberNotChoosen = classNames('w-5 h-5  text-xs ')
const bannerIconChoosen = classNames('text-primary')


const formInputCont = classNames(' grid lg:grid-cols-2 gap-4 mt-8')
const formInputRow = classNames('flex-col flex gap-16 mt-10')


const button = classNames('px-10 py-2   rounded-lg text-xl  transition-all duration-300 ')
const buttonDimmed = classNames('   text-xl  bg-gray-400 text-white opacity-80')
const buttonValid = classNames(' text-black  text-xl bg-primary   hover:opacity-80')