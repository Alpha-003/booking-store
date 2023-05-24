import React, { useEffect, useState } from 'react'
import Unit from './Unit'
import { DataInterface } from '@/pages'
import classNames from 'classnames'

type Props = {
  Ref: React.RefObject<HTMLDivElement>
  Data: DataInterface[]
}

const OurUnits = (props: Props) => {
  const [FilterSize, SetFilterSize] = useState<"All" | "Small" | "Medium" | "Large" | "X-Large">("All")

  const [FilteredUnits, SetFilteredUnits] = useState<DataInterface[]>([])
  //Small 
  //Meduim
  //Large
  //Xlarge
  useEffect(() => {
    let DataToSet = props.Data;
    //Filter the props data according to the filter size choosen and then add it to the state
    if (FilterSize === 'All') {
      DataToSet = props.Data;
    }

    if (FilterSize === 'Small') {
      DataToSet = (props.Data.filter((item) => item.size_category === "Small"))

    }
    if (FilterSize === 'Medium') {
      DataToSet = (props.Data.filter((item) => item.size_category === "Medium"))
    }
    if (FilterSize === 'Large') {
      DataToSet = (props.Data.filter((item) => item.size_category === "Large"))
    }
    if (FilterSize === 'X-Large') {
      DataToSet = (props.Data.filter((item) => item.size_category === "X-Large"))
    }
    //Order Filtered Units by price
    SetFilteredUnits(DataToSet.sort((a, b) => a.monthly_rack_rate - b.monthly_rack_rate))
  }, [FilterSize, props.Data])

  const Sizes = ['All', 'Small', 'Medium', 'Large', 'X-Large'];

  if (props.Data.length === 0) {
    <div>
      <h1 className='text-5xl text-center'>No Units Found</h1>
    </div>
  }


  return (
    <div className='text-white bg-[#1a1a1a] mt-52 py-20 px-20  ' >
      <h1 ref={props.Ref} className=' text-5xl md:text-6xl lg:text-8xl  text-center  '>Our Units</h1>
      <div className='flex flex-wrap justify-center gap-4  mt-6'>
        {Sizes.map((item, index) => {
          return (<div key={index} onClick={() => { SetFilterSize(item as "All" | "Small" | "Medium" | "Large" | "X-Large") }} className={sizeBox + " " + (item === FilterSize ? sizeBoxSelected : "")}>
            <p className=' text-lg'>{item}</p>
          </div>

          )
        })}



      </div>
      <p className=' font-bold  text-center mt-16' >Number of units: {FilteredUnits.length}</p>

      <div className='flex flex-wrap  justify-center  xl:flex-col gap-10  mt-8 items-center '>

        {FilteredUnits.map((item, index) => {
          return (
            <Unit key={item.id} Data={item}></Unit>
          )
        })}

      </div>
    </div>
  )
}

export default OurUnits

const sizeBox = classNames('w-20 h-16 border-2 flex justify-center  items-center  border-[#e6bb2d] transition-all duration-300 cursor-pointer hover:bg-[#ecc956]  rounded-lg')
const sizeBoxSelected = classNames('bg-[#e6bb2d] text-black')