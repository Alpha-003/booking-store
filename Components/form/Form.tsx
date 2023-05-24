import Input from '@/Components/input/Input'
import Modal from '@/ComponentsShared/modal/Modal'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdArrowBackIosNew } from 'react-icons/md';
import axios from 'axios'
import DataContext from '@/context/DataContext';
import { ApiURL } from '../../Constants';
import Link from 'next/link';
import NotifyComp from '@/ComponentsShared/notify/NotifyComp';
type Props = {
}

interface CompanyForm {
  futherInfo?: string
}
interface PersonalForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  companyName?: string
  ABN?: number

}
interface OrginzationForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  companyName: string
  ABN?: number

}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  DatePicker?: string
  futherInfo?: string


}
const PersonalFormSchema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  phoneNumber: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits")


})

const OrginzationFormSchema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  phoneNumber: yup.string().required("required").matches(/^[0-9]+$/, "Must be only digits"),
  companyName: yup.string().required("required"),
  ABN: yup.string().notRequired().nullable().transform((value) => (value ? value : null)).matches(/^[0-9]+$/, "Must be only digits")
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits'),
})
const CompanyFormSchema = yup.object({
  furtherInfo: yup.string()

});
const Form = (props: Props) => {


  const { register: PersonalRegister, handleSubmit, formState: { errors: PersonalErrors } } = useForm<PersonalForm>({
    resolver: yupResolver(PersonalFormSchema)
  });
  const { register: OrginzationRegister, handleSubmit: OrginzationSubmit, formState: { errors: OrginzationErrors } } = useForm<OrginzationForm>({
    resolver: yupResolver(OrginzationFormSchema)
  });
  const { register: CompanyRegister, handleSubmit: FinalSubmit, formState: { errors: CompanyErrors } } = useForm<CompanyForm>({
    resolver: yupResolver(CompanyFormSchema)
  });
  const { setOpenCTA, SelectedUnit } = React.useContext(DataContext)
  const [SecondStep, setSecondStep] = React.useState(false)
  const [FirstPhaseData, setFirstPhaseData] = React.useState<PersonalForm>()
  const [FinalData, setFinalData] = React.useState<FormData>()
  const [Submitted, setSubmitted] = React.useState(false)
  const [Loading, setLoading] = React.useState(false)
  const [Error, setError] = React.useState("")
  const [startDate, setStartDate] = React.useState(new Date());
  const [DateYMD, setDateYMD] = React.useState("");
  const [Toggle, setToggle] = React.useState(false)


  // console.log(startDate);

  const [isOrginzation, setisOrginzation] = React.useState(false)

  console.log(isOrginzation);
  function FirstPhaseSubmit(data: PersonalForm) {


    if (!PersonalErrors.firstName && !PersonalErrors.lastName && !PersonalErrors.email && !PersonalErrors.phoneNumber) {
      setFirstPhaseData(data)
      setSecondStep(true)
    }
  }

  function FirstPhaseSubmitOrginzation(data: PersonalForm) {


    if (!OrginzationErrors.companyName && !OrginzationErrors.ABN && !OrginzationErrors.firstName && !OrginzationErrors.lastName && !OrginzationErrors.email && !OrginzationErrors.phoneNumber) {
      setFirstPhaseData(data)
      setSecondStep(true)
    }
  }
  function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

  async function SecondPhaseSubmit(data: CompanyForm) {

    try {
      setLoading(true);
      let CompanyData = {}

      if (!CompanyErrors.futherInfo) {
        console.log(DateYMD)
        if (DateYMD.length == 0) {
          let date = new Date();
          const year = date.getFullYear();
          const month = padTo2Digits(date.getMonth() + 1);
          const day = padTo2Digits(date.getDate());
          const withHyphens = [year, month, day].join('-')
          CompanyData = { ...data, DatePicker: withHyphens }
        }
        else {
          CompanyData = { ...data, DatePicker: DateYMD }
        }
        //@ts-ignore

        let FinalData = { ...FirstPhaseData, ...CompanyData }
        ////Adding LEAD
        let TestData = {
          contact_type: isOrginzation ? "ORGANISATION" : "INDIVIDUAL",
          full_name: isOrginzation ? FinalData?.companyName : `${FinalData?.firstName} ${FinalData?.lastName}`,
          contact_name: `${FinalData?.firstName} ${FinalData?.lastName}`,
          contact_email: FinalData.email,
          contact_phone_mobile: FinalData.phoneNumber,
          //@ts-ignore
          expected_movein_at: FinalData.DatePicker,
          lead_source: "Website",
          contact_category: "Web Site",
          customer_type: isOrginzation ? 'Commercial' : 'Residential',
        }
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
          },
          body: JSON.stringify(TestData)

        };


        let responseLead = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/leads`, requestOptions)
        let Lead = await responseLead.json()

        if (!Lead.success) {
          //@ts-ignore
          // console.log(Lead.message)
          //@ts-ignore
          // notify(Lead.message ? Lead.message : "Error", 'error')
          setError(Lead.message ? Lead.message : "Try again later")
          setToggle(true)
          setLoading(false);
        } else {
          let LeadID = Lead.data.lead_id

          ////Adding Qoute
          let QouteData = {
            lead_id: LeadID,
            unit_type_code: SelectedUnit.code,
            price: SelectedUnit.monthly_rack_rate,
            quantity: 1,
            //@ts-ignore
            note: FinalData.futherInfo
          }

          const requestOptionsQoute = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
            },
            body: JSON.stringify(QouteData)

          };



          let responseQoute = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/quote-lines`, requestOptionsQoute)
          let QouteAdded = await responseQoute.json()


          if (!QouteAdded.success) {
            //@ts-ignore
            // console.log(QouteAdded.message)
            //@ts-ignore
            setError(QouteAdded.message ? QouteAdded.message : "Try again later")
            setToggle(true)
            setLoading(false);
          }
          else {
            // let EmailData = {
            //   email: "mohamedsalem52@outlook.com",
            //   name: 'Standefy'
            // }
            // const requestOptionsEmail = {
            //   method: 'POST',
            // };
            // //@ts-ignore
            // fetch(`https://email-service-pi.vercel.app/email`, requestOptionsEmail)


            //////////////Saving to localStorage the FinalData and the LEadID /////
            let DataToStore = { ...FinalData, LeadID, ...SelectedUnit }
            // console.log("//////////////////")
            // console.log("Initial DataToStore which will be added to the localstorage")
            // console.log(DataToStore)
            // console.log("//////////////////")

            localStorage.setItem('DataToStore', JSON.stringify(DataToStore))




            // console.log(TestData);
            // console.log(LeadData);
            setLoading(false);
            setSubmitted(true)
          }

        }

        //////////////Sending Email/////
      }

    } catch (error) {
      // console.log("I am error")
      // console.log(error)
      //@ts-ignore
      setError(error.message ? error.message : "Error")
      setToggle(true)
      setLoading(false);


    }

  }







  return (
    <>
      <NotifyComp toggleSetter={setToggle} type='error' text={Error} toggle={Toggle}></NotifyComp>
      <Modal CloseBtn CloseBtnColor='white' SetOpen={setOpenCTA}>
        {!Submitted &&
          <div className={`w-[100vw] bg-[#1a1a1a] text-white sm:w-[80vw]  lg:h-[100vh] lg:w-[60vw] xl:w-[40vw] flex flex-col items-center  justify-center rounded-lg  overflow-hidden `}>
            {SecondStep ?
              <div className='flex items-center   text-center '>
                <MdArrowBackIosNew onClick={() => setSecondStep(false)} className='absolute  top-3 left-4 p-2 bg-[#e6b42d] rounded-full  cursor-pointer ' size={35} />
                <h1 className='text-2xl mb-20 pt-20 '>We are excited to see you {FirstPhaseData?.firstName} !</h1>
              </div>
              : <h1 className='text-2xl mb-4 pt-10'>{SecondStep ? "Move in Date" : "Contact Info"}</h1>
            }
            {/* <div className='mb-10  flex flex-col   text-center'>
              <p >No obligation to rent
              </p>
              <p>No credit card required</p>
              <p>Change dates & sizing any time</p>

            </div> */}
            <form className={FormContainer + " " + (SecondStep ? Hidden : Shown)}>

              <div className='flex items-center gap-4 '>
                <p className='text-white text-2xl '>Organization: </p>
                <div className='flex items-center gap-4'>
                  <div className="flex items-center ">
                    <input id="default-radio-2" type="radio" value="" checked={isOrginzation}
                      onChange={() =>
                        setisOrginzation((prev) => {
                          if (prev === false) {
                            return true
                          }
                          else {
                            return false
                          }
                        })} name="default-radio" className="w-6 h-6  cursor-pointer " />
                    <label htmlFor="default-radio-1" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      onChange={() =>
                        setisOrginzation((prev) => {
                          if (prev === true) {
                            return false
                          }
                          else {
                            return true
                          }
                        })} checked={!isOrginzation} id="default-radio-1" type="radio" value="" name="default-radio" className="w-6 h-6 cursor-pointer" />
                    <label htmlFor="default-radio-2" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">No</label>
                  </div>
                </div>
              </div>
              {isOrginzation ?
                <>
                  <div className='flex  w-full gap-4 mb-4'>
                    <Input error={OrginzationErrors.companyName} register={OrginzationRegister} name={'companyName'} required type='text' placeholder="Company name" size='medium'></Input>
                    <Input error={OrginzationErrors.ABN} register={OrginzationRegister} name={'ABN'} type='text' placeholder="ABN (optional)" size='medium'></Input>

                  </div>

                  <div className='flex w-full gap-4 mb-2'>
                    <Input error={OrginzationErrors.firstName} register={OrginzationRegister} name={'firstName'} required type='text' placeholder="First name" size='medium'></Input>
                    <Input error={OrginzationErrors.lastName} register={OrginzationRegister} name={"lastName"} required type='text' placeholder="Last name" size='medium'></Input>
                  </div>


                  <Input error={OrginzationErrors.email} register={OrginzationRegister} name={"email"} required type='email' placeholder="email" size='full'></Input>
                  <Input error={OrginzationErrors.phoneNumber} register={OrginzationRegister} name={"phoneNumber"} type='text' required placeholder="Phone number" size='full'></Input>
                </>
                :
                <>
                  <Input error={PersonalErrors.firstName} register={PersonalRegister} name={'firstName'} required type='text' placeholder="First name" size='medium'></Input>
                  <Input error={PersonalErrors.lastName} register={PersonalRegister} name={"lastName"} required type='text' placeholder="Last name" size='medium'></Input>
                  <Input error={PersonalErrors.email} register={PersonalRegister} name={"email"} required type='email' placeholder="email" size='full'></Input>
                  <Input error={PersonalErrors.phoneNumber} register={PersonalRegister} name={"phoneNumber"} type='text' required placeholder="Phone number " size='full'></Input></>}


              <button type='button' onClick={isOrginzation ? OrginzationSubmit(FirstPhaseSubmitOrginzation) : handleSubmit(FirstPhaseSubmit)} className={FormMainButton}>Next Step</button>
            </form>

            <form className={FormContainer + " " + (!SecondStep ? Hidden : Shown)}>
              {/* <Input error={CompanyErrors.companyName} register={CompanyRegister} name={"companyName"} type='text' required placeholder="Company Name" size='full'></Input>
            <Input error={CompanyErrors.companyUrl} register={CompanyRegister} name={"companyUrl"} type='text' required={false} placeholder="Company Website (If available)" size='full'></Input> */}
              <Input setDateYMD={setDateYMD} startDate={startDate} setStartDate={setStartDate} type='datePicker' required placeholder='Pick your move in date now' size='full'></Input>
              <Input error={CompanyErrors.futherInfo} register={CompanyRegister} name={"futherInfo"} type='text' required={false} textarea placeholder="Anything else we should know?" size='full'></Input>
              {Loading ?
                <div className='mt-14' role="status">
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div> : <div className='flex flex-col w-[100%] items-center  text-center gap-6 mt-14'>
                  <button type='button' onClick={FinalSubmit(SecondPhaseSubmit)} className={FormMainButton} >Submit</button>
                </div>}

            </form>






          </div >
        }
        {
          Submitted &&
          <div className={`w-[100vw]  bg-[#1a1a1a] text-white  h-[60%]  sm:w-[80vw] lg:w-[60vw] xl:w-[40vw] overflow-hidden relative      rounded-lg  `}>
            <div className='border-b-2 border-gray-500 flex flex-col items-center py-10    '>
              <h2 className='text-2xl  mt-4 z-20 relative mb-4  text-center pt-10'>Complete your reservation now!</h2>
              <Link onClick={() => setOpenCTA(false)} href={'/Reservation'} className='text-md font-bold  uppercase  animate-text text-center mt-2 bg-gradient-to-r from-[#e6b42d] via-[#ffbd08] to-[#030200]  px-2 py-4 rounded-lg ' >Complete Reservation</Link>
            </div>
            <div className=''>
              <h2 className='text-lg px-10 text-gray-400  mt-4 z-20 relative mb-4  text-center pt-10'>If you prefer to complete your reservation through direct communication, we can contact you soon to finalize the details. </h2>

            </div>
            {/* <div className={CardSuccessCont}>
            <div className={CardSuccess}>
              <p className={CardTitle}>Pricing Plans</p>
              <p className={CardDesc}>Will be Sent to your Email within 3-5 minutes </p>
            </div>
            <div className={CardSuccess}>
              <p className={CardTitle}>Marketing Review Video</p>
              <p className={CardDesc}>Will be Sent to your Email within 1-2 working days </p>
            </div>
          </div> */}

          </div>
        }



      </Modal >
    </>

  )
}

export default Form
const FormContainer = classNames(" w-[90%] h-full  flex flex-col justify-center  items-center text-black    gap-14 ")
const FormMainButton = classNames("px-2  text-white py-4 w-[100vw] md:w-[100%] text-lg  bg-[#e6b42d]  transition-all  duration-700 rounded-md hover:bg-[#cfa229]   text-center hover:shadow-lg hover:shadow-[#e6b42d] hover:tracking-widest   ")
const Hidden = classNames("opacity-0 translate-x-[600px] absolute  w-0 h-0  pointer-events-none blur  transition-transform  duration-500  ")
const Shown = classNames("opacity-1 translate-x-0  blur-0  transition-transform duration-500 ")
const CardSuccessCont = classNames("flex flex-col gap-4  items-center w-[100%]")
const CardSuccess = classNames("  pt-2  w-[100%] flex   justify-center flex-col items-center  boxshadow  border-2 border-black transition-all    rounded-md  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 ")
const CardTitle = classNames("font-bold   text-lg mt-4 mb-2")
const CardDesc = classNames("text-md  mb-4 text-center")