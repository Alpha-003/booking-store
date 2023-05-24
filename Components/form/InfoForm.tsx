import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonalForm } from '@/pages/Reservation';
import classNames from 'classnames';
import Select from 'react-select';

import Input from '@/Components/input/Input';
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router';
import NotifyComp from '@/ComponentsShared/notify/NotifyComp';
import Spinner from '@/ComponentsShared/spinner/Spinner';

type Props = {
  setCurrentFormStage: (step: number) => void

}

const PersonalFormSchema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  phoneNumber: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits"),
  streetAddress: yup.string().required("required"),
  // state: yup.string().required("required"),
  // country: yup.string().required("required"),
  postCode: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits")

})

const OrganizationFormSchema = yup.object({
  companyName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  phoneNumber: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits"),

  streetAddress: yup.string().required("required"),
  // state: yup.string().required("required"),
  // country: yup.string().required("required"),
  postCode: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits")

})


const InfoForm = (props: Props) => {


  const [Valid, setValid] = useState(false)

  let router = useRouter();
  const [NotifyToggle, setNotifyToggle] = useState(false)
  const [Error, setError] = useState({ state: false, message: "" })
  const [Loading, setLoading] = useState(false);
  const [DataStored, setDataStored] = useState<PersonalForm | null>(null)
  const [AddressExtra, setAddressExtra] = useState({ country: { value: "Australia", label: "Australia" }, state: { value: "Victoria", label: "Victoria" } })
  const { reset, register: PersonalRegister, handleSubmit, formState: { errors: PersonalErrors } } = useForm<PersonalForm>({
    resolver: yupResolver(PersonalFormSchema)
  });

  const { reset: OrgReset, register: OrgRegister, handleSubmit: OrgSubmit, formState: { errors: OrgErrors } } = useForm<PersonalForm>({
    resolver: yupResolver(OrganizationFormSchema)
  });

  let country_list = [{ value: "Australia", label: "Australia" }];
  let states = [
    {
      value: "New South Wales",
      label: "New South Wales",

    },
    {
      value: "Victoria",
      label: "Victoria",
    },
    {
      value: "Queensland",
      label: "Queensland",
    },
    {
      value: "Tasmania",
      label: "Tasmania",
    },
    {
      value: "South Australia",
      label: "South Australia",
    },
    {
      value: "Western Australia",
      label: "Western Australia",
    },
    {
      value: "Northern Territory",
      label: "Northern Territory",
    },
    {
      value: "Australian Capital Territory",
      label: "Australian Capital Territory",
    }
  ];

  function statechange(state: { label: string; value: string }) {
    HandleAddressChange(state.value, 'state');
  }
  function countrychange(country: { label: string, value: string }) {
    HandleAddressChange(country.value, 'state');
  }

  function HandleAddressChange(name: string, type: "country" | "state") {


    setAddressExtra((prev) => {
      return (
        { ...prev, type: { value: name, label: name } }
      )
    }
    )
  }

  ///////////////////////////////


  async function onSubmit(dataForm: PersonalForm) {

    setLoading(true)
    if (dataForm?.companyName) {
      //@ts-ignore
      dataForm.firstName = DataStored?.firstName
      //@ts-ignore
      dataForm.lastName = DataStored?.lastName
    }
    dataForm.country = AddressExtra.country.value
    dataForm.state = AddressExtra.state.value

    // console.log("//////////////////")
    // console.log("Data after submitting  in the infoForm.tsx")
    // console.log(dataForm);
    // console.log("//////////////////")
    try {


      const requestOptionsReservation = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
        },

      };



      let responseReserv = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/leads/${DataStored?.LeadID}/convert-to-reservation`, requestOptionsReservation)
      let ResponseData: {
        success: boolean,
        message: string,
        data: {
          reservation_id: number,
          customer_id: number,
          reservation_number: string,
          customer_code: string
        }
      } = await responseReserv.json()
      // console.log("/////////////")
      // console.log("ResponseData AFTER FILLING INFOFORM")
      // console.log(ResponseData)
      // console.log("/////////////")

      if (!ResponseData.success) {
        setError({ state: true, message: ResponseData.message })
        setNotifyToggle(true)

      }
      else {
        //UPDATE CUSTOMER INFO

        const CustomerDatatoAdd = {
          billing_address: dataForm?.streetAddress,
          billing_post_code: dataForm?.postCode,
          billing_city: dataForm?.state,
          billing_country: dataForm?.country,
          customer_type: DataStored?.companyName ? "ORGANISATION" : "INDIVIDUAL",
          contact_email: dataForm?.email.toLowerCase(),
          contact_phone_mobile: dataForm?.phoneNumber,
          customer_name: dataForm?.firstName + " " + dataForm?.lastName,

        }

        const OrginzationDatatoAdd = {
          billing_address: dataForm?.streetAddress,
          billing_post_code: dataForm?.postCode,
          billing_city: dataForm?.state,
          billing_country: dataForm?.country,
          customer_type: DataStored?.companyName ? "ORGANISATION" : "INDIVIDUAL",
          contact_email: dataForm?.email.toLowerCase(),
          contact_phone_mobile: dataForm?.phoneNumber,
          customer_name: dataForm?.firstName + " " + dataForm?.lastName,
          org_name: dataForm?.companyName,
          org_contact_name: dataForm?.firstName + " " + dataForm?.lastName,

        }



        const requestOptionsCustomer = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
          },
          body: JSON.stringify(DataStored?.companyName ? OrginzationDatatoAdd : CustomerDatatoAdd)
        }

        let responseCustomer = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/customers/${ResponseData.data.customer_id}`, requestOptionsCustomer)
        let data = await responseCustomer.json();
        if (!data.success) {
          //@ts-ignore
          setError({ state: true, message: responseCustomer.message ? responseCustomer.message : "Something went wrong try again later" })
          setNotifyToggle(true)
        }
        else {
          console.log(ResponseData.data)
          let MessageData = {
            source_system: "Website",
            record_type: "RESERVATION",
            reference_no: ResponseData.data.reservation_number,
            notice_name: "SIGNUP AT HOME",
            type: "EMAIL"
          }
          const requestOptionsMessage = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
            },
            body: JSON.stringify(MessageData)
          }
          let responseMessage = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/correspondence/send`
            , requestOptionsMessage)

          let dataMessage = await responseMessage.json()
          console.log("/////////////")
          console.log("ResponseMessaginfo AFTER FILLING INFOFORM")
          console.log(dataMessage)
          console.log("/////////////")
          if (!dataMessage.success) {
            //@ts-ignore
            setError({ state: true, message: responseCustomer.message ? responseCustomer.message : "Something went wrong try again later" })
            setNotifyToggle(true)
          }
          let newDataToStore = { ...DataStored }
          newDataToStore.reservation_id = ResponseData.data.reservation_id
          newDataToStore.customer_id = ResponseData.data.customer_id
          newDataToStore.reservation_number = ResponseData.data.reservation_number
          newDataToStore.customer_code = ResponseData.data.customer_code
          // console.log("//////////////////")
          // console.log("Data after submitting  in the infoForm.tsx")
          // console.log(newDataToStore);
          // console.log("//////////////////")

          localStorage.setItem('DataToStore', JSON.stringify(newDataToStore))

          props.setCurrentFormStage(2)
        }








      }

      setLoading(false)

    } catch (e) {
      setError({ state: true, message: "Something went wrong try again later" })
      setNotifyToggle(true)
    }
  }



  function VerifyCaptcha() {
    setValid(true);
  }

  useEffect(() => {
    let DataStored = localStorage.getItem('DataToStore')


    let DataStoredObject = DataStored ? JSON.parse(DataStored) : null
    setDataStored(DataStoredObject)

    if (DataStoredObject) {

      let defaultValues = { firstName: "", lastName: "", email: "", phoneNumber: "", companyName: "" }
      if (DataStoredObject.companyName) {
        defaultValues.companyName = DataStoredObject.companyName
        defaultValues.email = DataStoredObject.email
        defaultValues.phoneNumber = DataStoredObject.phoneNumber
        OrgReset({ ...defaultValues })
      }
      else {
        defaultValues.firstName = DataStoredObject.firstName
        defaultValues.lastName = DataStoredObject.lastName
        defaultValues.email = DataStoredObject.email
        defaultValues.phoneNumber = DataStoredObject.phoneNumber
      }
      reset({ ...defaultValues })


    }



  }, [])


  return (
    <form className=' px-10'>
      <NotifyComp type='error' text={Error.message} toggleSetter={setNotifyToggle} toggle={NotifyToggle}></NotifyComp>

      <h2 className='text-3xl  border-b-2 p-2 mb-4  font-bold text-[#45360d]'>Your Details</h2>
      <p className='text-lg'>Ok let’s get started. We need to grab a few details so we can help you move in quickly.</p>

      <div className='mt-10'>

        <p className='text-2xl text-[#45360d]'>Contact Details</p>
        {DataStored?.companyName && <div className='mt-8'>
          <Input error={OrgErrors.companyName} register={OrgRegister} name={'companyName'} required type='text' placeholder="Company name" size='medium'></Input>
        </div>
        }

        <div className={formInputCont}>
          <div className={formInputRow}>
            {!DataStored?.companyName && <Input error={PersonalErrors.firstName} register={PersonalRegister} name={'firstName'} required type='text' placeholder="First name" size='medium'></Input>
            }

            <Input error={DataStored?.companyName ? OrgErrors.email : PersonalErrors.email} register={DataStored?.companyName ? OrgRegister : PersonalRegister} name={"email"} required type='email' placeholder="email" size='full'></Input>
          </div>

          <div className={formInputRow}>
            {!DataStored?.companyName && <Input error={PersonalErrors.lastName} register={PersonalRegister} name={"lastName"} required type='text' placeholder="Last name" size='medium'></Input>
            }
            <Input error={DataStored?.companyName ? OrgErrors.phoneNumber : PersonalErrors.phoneNumber} register={DataStored?.companyName ? OrgRegister : PersonalRegister} name={"phoneNumber"} required type='text' placeholder="Phone Number" size='full'></Input>

          </div>

        </div>



      </div>


      <div className='mt-16'>

        <p className='text-2xl text-[#45360d]'>Billing Address</p>

        <div className={formInputCont}>

          <div className={formInputRow}>

            <Input error={DataStored?.companyName ? OrgErrors.streetAddress : PersonalErrors.streetAddress} register={DataStored?.companyName ? OrgRegister : PersonalRegister} name={'streetAddress'} required type='text' placeholder="Street Address" size='medium'></Input>
            <div>
              <p>State</p>
              <Select
                value={AddressExtra.state}
                //@ts-ignore
                onChange={statechange}
                options={states}
              />
            </div>
          </div>

          <div className={formInputRow}>
            {/* <Input error={PersonalErrors.suburb} register={PersonalRegister} name={"suburb"} required type='text' placeholder="suburb" size='full'></Input> */}
            {/* <Input error={PersonalErrors.postCode} register={PersonalRegister} name={"postCode"} required type='text' placeholder="Postcode" size='medium'></Input>
          <Input error={PersonalErrors.country} register={PersonalRegister} name={"country"} type='text' required placeholder="country " size='full'></Input> */}
            <Input error={DataStored?.companyName ? OrgErrors.postCode : PersonalErrors.postCode} register={DataStored?.companyName ? OrgRegister : PersonalRegister} name={"postCode"} required type='text' placeholder="Postcode" size='medium'></Input>
            <div>
              <p>Country</p>
              <Select
                value={AddressExtra.country}
                //@ts-ignore
                onChange={countrychange}
                options={country_list}
              />
            </div>
          </div>

        </div>



      </div>








      <div className='lg:flex-row sm:flex-col sm:flex mt-20 justify-between   items-center '>
        <ReCAPTCHA
          className=' w-[20vw]'
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA}
          onChange={VerifyCaptcha}
        />
        {Loading ? <Spinner /> : <button type='button' onClick={Valid ? DataStored?.companyName ? OrgSubmit(onSubmit) : handleSubmit(onSubmit) : () => { }} className={`${button} ${Valid ? buttonValid : buttonDimmed}`}>Continue</button>
        }
      </div>




    </form>

  )
}

export default InfoForm

const formInputCont = classNames(' grid lg:grid-cols-2 gap-4 mt-8')
const formInputRow = classNames('flex-col flex gap-16 mt-10')


const button = classNames('px-10 py-2   rounded-lg text-xl  transition-all duration-300 ')
const buttonDimmed = classNames('   text-xl  bg-gray-400 text-white opacity-80')
const buttonValid = classNames(' text-black  text-xl bg-primary   hover:opacity-80')