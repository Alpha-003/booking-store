import Image from 'next/image'
import React from 'react'
import DemoContract from '@/public/images/DemoContract.png'
import Input from '../input/Input'
import classNames from 'classnames'


type Props = {
  setCurrentFormStage: (step: number) => void
}

const ContractForm = (props: Props) => {
  const [Agreed, setAgreed] = React.useState(false)
  function HandleChange() {
    setAgreed(!Agreed)
  }

  function handleAcceptTerms() {
    if (Agreed) {

      //set local storage Aggrement to true
      let DataStored = localStorage.getItem('DataToStore')

      let DataStoredObject = DataStored ? JSON.parse(DataStored) : null
      if (DataStoredObject) {
        DataStoredObject.Agreed = true
      }
      // console.log("/////////////////")
      // console.log("After Agreement DataStoredObject")
      // console.log(DataStoredObject)
      // console.log("/////////////////")
      localStorage.setItem('DataToStore', JSON.stringify(DataStoredObject))
      props.setCurrentFormStage(3)
    }




  }
  return (
    <div className=' relative h-[80vh] pl-40 pb-10   overflow-y-auto'>

      <Image src={DemoContract} placeholder='blur' alt="Contract" className='h-[100vh]'></Image>
      <div className=' text-center'>

        <div className="flex  items-center justify-center mt-2">
          <input id="link-checkbox" onChange={HandleChange} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
          <label htmlFor="link-checkbox" className="ml-2 text-lg font-bold  text-gray-900  ">I agree with the terms and conditions.</label>
        </div>


        <button type='button' onClick={Agreed ? handleAcceptTerms : () => { }} className={`${button} ${Agreed ? buttonValid : buttonDimmed}`}>Continue</button>


      </div>
    </div>
  )
}

export default ContractForm
const button = classNames('px-10 py-2   rounded-lg text-xl  transition-all duration-300 ')
const buttonDimmed = classNames('   text-xl  bg-gray-400 text-white opacity-80')
const buttonValid = classNames(' text-black  text-xl bg-primary   hover:opacity-80')