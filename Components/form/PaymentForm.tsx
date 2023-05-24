import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/Components/input/Input';
import Select from 'react-select';
import classNames from 'classnames';
import { PersonalForm } from '@/pages/Reservation';
import NotifyComp from '@/ComponentsShared/notify/NotifyComp';
import Spinner from '@/ComponentsShared/spinner/Spinner';
import Script from 'next/script';
import { ApiURL } from '@/Constants'


type Props = {
  setCurrentFormStage: (step: number) => void
  ready: boolean;

}
interface PaymentForm {
  cardHolderName: string
  cardNumber: string
  cvv: string
  cardType?: string
  expiryDateYear?: string
  expiryDateMonth?: string

}
const PaymentFormSchema = yup.object({
  cardHolderName: yup.string().required("required"),
  cardNumber: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits")
    .min(16, 'Please type valid card number')
    .max(19, 'Please type valid card number'),
  // state: yup.string().required("required"),
  // country: yup.string().required("required"),
  cvv: yup.string().required('required').matches(/^[0-9]+$/, "Must be only digits")
    .min(3, 'Please type valid CVV')
    .max(4, 'Please type valid CVV'),

})

const PaymentForm = (props: Props) => {

  const { register: PaymentRegister, handleSubmit, formState: { errors: PaymentErrors } } = useForm<PaymentForm>({
    resolver: yupResolver(PaymentFormSchema)
  });
  const [ChoosenCardType, setChoosenCardType] = React.useState<{ value: string, label: string }>({ value: 'Visa', label: 'Visa' })
  const [ChoosenMonth, setChoosenMonth] = React.useState<{ value: string, label: string }>({ value: '01', label: '01' })
  const [ChoosenYear, setChoosenYear] = React.useState<{ value: string, label: string }>({ value: '2023', label: '2023' })
  const [DataStored, setDataStored] = React.useState<PersonalForm>({} as PersonalForm)
  const [Toggle, setToggle] = React.useState<boolean>(false)
  const [Error, setError] = React.useState<string>('')
  const [Loading, setLoading] = React.useState<boolean>(false)
  const [PaymentData, SetPaymentData] = React.useState<PaymentForm>({} as PaymentForm)

  let CardType = [{ value: 'Visa', label: 'Visa' }, { value: 'MasterCard', label: 'MasterCard' }]
  let monthsType = [{ value: '01', label: "01", }, { value: '02', label: "02", }, { value: '03', label: "03", }, { value: '04', label: "04", }, { value: '05', label: "05", }, { value: '06', label: "06", }, { value: '07', label: "07", }, { value: '08', label: "08", }, { value: '09', label: "09", }, { value: '10', label: "10", }, { value: '11', label: "11", }, { value: '12', label: "12", },]
  let yearsType = [{ value: '2023', label: "2023", }, { value: '2024', label: "2024", }, { value: '2025', label: "2025", }, { value: '2026', label: "2026", }, { value: '2027', label: "2027", }, { value: '2028', label: "2028", }, { value: '2029', label: "2029", }, { value: '2030', label: "2030", }, { value: '2031', label: "2031", }, { value: '2032', label: "2032", }, { value: '2033', label: "2033", }, { value: '2034', label: "2034", }, { value: '2035', label: "2035 ", }, { value: '2036', label: "2036", }, { value: '2037', label: "2037", }, { value: '2038', label: "2038", }, { value: '2039', label: "2039", }, { value: '2040', label: "2040", }]

  function handleCardTypeChange(e: any) {
    setChoosenCardType(e)
  }
  function handleMonthChange(e: any) {
    setChoosenMonth(e)
  }
  function handleYearChange(e: any) {
    setChoosenYear(e)
  }
  function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

  async function handlePaymentSubmit(data: any) {
    console.log("hi")
    setLoading(true);
    let paymentData = { ...data, cardType: ChoosenCardType.value, expiryDateYear: ChoosenYear.value, expiryDateMonth: ChoosenMonth.value }
    //1)update the customer by adding payment details
    //@ts-ignore

    console.log(paymentData)
    SetPaymentData(paymentData)

    // if (props.ready) {
    //   console.log("I WIL LCALL THE SCRIPT")
    //   eziDebit.init("3CFFD292-E2EE-4433-B49B-757D302B427C", {
    //     submitAction: "SaveCustomer",
    //     submitButton: 'submit',
    //     submitCallback: HandleCallBack,
    //     submitError: HandleError,
    //     customerLastName: "lastName",
    //     nameOnCard: "cardHolderName",
    //     cardNumber: "cardNumber",
    //     paymentAmount: "paymentAmount",
    //     cardExpiryMonth: "expiryDateMonth",//number
    //     cardExpiryYear: 'expiryDateYear', //number
    //     CardCCV: "cvv",

    //   }, "https://api.demo.ezidebit.com.au/V3-5/public-rest")
    // }




    //@ts-ignore



    try {
      ///////////////////////////
      //1)CALL THE PAYMENT API 
      // let dataNeeded = {
      //   customerName: DataStored.firstName + " " + DataStored.lastName,
      //   customerEmail: DataStored.email,
      //   productName: DataStored.code,
      //   productPrice: DataStored.monthly_rack_rate,
      //   cardNumber: paymentData.cardNumber,
      //   cardExpMonth: paymentData.expiryDateMonth,
      //   cardExpYear: paymentData.expiryDateYear,
      //   cardCvc: paymentData.cvv,
      // }
      // console.log(dataNeeded)

      // let response = await fetch(`${ApiURL}/subscribe`, {
      //   method: "POST",
      //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      //   body: JSON.stringify(dataNeeded)
      // })

      // let DataFromAPI = await response.json();
      // console.log(DataFromAPI)


      ///////////////////////////

      ///////////////////////////
      //2)MAKE THE AGREEMENT 
      // let response = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}reservations/${DataStored.agreement_id}/convert-to-agreement`)
      // let dataFromServer = await response.json()
      // console.log(dataFromServer)
      ///////////////////////////


      ///////////////////////////
      //2)MAKE THE TRANSACTION 

      // let date = new Date();
      // const year = date.getFullYear();
      // const month = padTo2Digits(date.getMonth() + 1);
      // const day = padTo2Digits(date.getDate());
      // const withHyphens = [year, month, day].join('-')

      // let TransactionBody = {
      //   reference_no: "ID  returned after creating an agreement",
      //   record_type: "AGREEMENT",
      //   trx_date: withHyphens,
      //   receipt_type_code: PaymentData.cardNumber[0] === '4' ? "CREDIT_CARD_VISA" : "CREDIT_CARD_MCARD",
      //   receipt_description: `Payment for unit ${DataStored.description}`,
      //   receipt_amount: DataStored.monthly_rack_rate,
      //   your_payment_reference: "AFTER PAYMENT REFERENCE",
      // }
      // console.log(TransactionBody)
      // const requestOptionsReservation = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
      //   },

      // };

      // let responseReserv = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/leads/${DataStored?.LeadID}/convert-to-reservation`, requestOptionsReservation)



      ///////////////////////////



    } catch (e) {
      //@ts-ignore
      setError(e.message ? e.message : "Try again later")
      setToggle(true)

    }
    props.setCurrentFormStage(4);
    setLoading(false);



  }

  function HandleCallBack(response: any) {

    console.log("Payment submitted successfully:", response);
  }

  function HandleError(response: any) {
    console.log("Error:", response);
  }






  useEffect(() => {
    //Getting Data from localstorage and setting it  with a state
    let DataStored = localStorage.getItem('DataToStore')

    let DataStoredObject = DataStored ? JSON.parse(DataStored) : null
    // console.log("//////////////////")
    // console.log("DataStored from the localstorage in the infoForm.tsx")
    // console.log(DataStoredObject)
    // console.log("//////////////////")

    setDataStored(DataStoredObject)
    console.log(DataStoredObject)



  }, [])


  return (
    <>

      <form className=' col-span-2 mt-16 px-4 sm:px-10 md:px-40 lg:px-0 lg:mt-0  lg:ml-40'>
        <NotifyComp text={Error} type={'error'} toggle={Toggle} toggleSetter={setToggle} ></NotifyComp>

        <h2 className='text-3xl  border-b-2 p-2 mb-4  font-bold text-[#45360d]'>Payment Details</h2>

        <div className='mt-10'>

          <p className='text-2xl text-[#45360d]'>Payment Total: <span className='font-bold'>$211.00</span></p>


          <div className={formInputRow}>

            <Input error={PaymentErrors.cardHolderName} register={PaymentRegister} name={"cardHolderName"} required type='text' placeholder="Card Holder Name" size='medium'></Input>
            <Input error={PaymentErrors.cardNumber} register={PaymentRegister} name={"cardNumber"} required type='text' placeholder="Card Number" size='full'></Input>
            <div className='flex flex-col gap-10'>
              <div className='w-[50%]'>

                <Input error={PaymentErrors.cvv} register={PaymentRegister} name={"cvv"} required type='password' placeholder="Cvv" size='medium'></Input>
              </div>


              <div className='flex gap-10 items-center '>
                <div>
                  <p>Expiration Month</p>
                  <Select
                    id='expiryDateMonth'
                    value={ChoosenMonth}


                    //@ts-ignore
                    onChange={handleMonthChange}
                    options={monthsType}
                  />
                </div>
                <div>
                  <p>Expiration Year</p>
                  <Select
                    id='expiryDateYear'
                    value={ChoosenYear}

                    //@ts-ignore
                    onChange={handleYearChange}
                    options={yearsType}
                  />
                </div>

              </div>
            </div>
            <div className='flex justify-center'>
              {Loading ? <Spinner /> : <button id='submit' type='button' onClick={handleSubmit(handlePaymentSubmit)} className={FormMainButton}>Reserve</button>
              }
            </div>

          </div>




        </div>














      </form>
    </>

  )
}

export default PaymentForm
const formInputRow = classNames('flex-col flex gap-16  mt-10 mb-10 border border-gray-800 px-10 py-10')

const FormMainButton = classNames("px-2  text-white py-4   w-[50vw] text-2xl  bg-[#e6b42d]  transition-all  duration-700 rounded-md hover:bg-[#cfa229]   text-center hover:shadow-lg hover:shadow-[#e6b42d] hover:tracking-widest   ")

const button = classNames(' ')
