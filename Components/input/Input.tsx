import classNames from 'classnames'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/zh-cn';


type Props = {
  type: "email" | "text" | "password" | 'datePicker' | 'checkBox'
  placeholder: string,
  size: "medium" | "large" | 'full' | 'small'
  required?: boolean
  textarea?: boolean
  register?: any
  error?: any
  name?: string
  startDate?: Date
  setStartDate?: any
  setDateYMD?: any
  defaultValue?: any
}


const Input = (props: Props) => {
  function getHoursAndMinutes(date = new Date()) {
    return padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes()) + ':' + padTo2Digits(date.getSeconds());
  }

  function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

  return (
    <div className={"relative group  w-full  h-[40px] " + " " + (props.size == 'medium' ? MedInput : props.size == 'large' ? LargeInput : 'w-full')}>
      {props.textarea
        ? <textarea id={props.name} {...props.register(props.name)} placeholder=" " maxLength={400} className={input + " resize-none  -z-10 "} style={{ height: "100px" }}></textarea>
        : props.type == 'datePicker'
          ?
          // <DatePicker
          //   selected={props.startDate}
          //   onChange={(date: Date) => {
          //     const year = date.getFullYear();
          //     const month = padTo2Digits(date.getMonth() + 1);
          //     const day = padTo2Digits(date.getDate());
          //     const withHyphens = [year, month, day].join('-');
          //     const hoursAndMinutes = getHoursAndMinutes(date);
          //     props.setDateYMD(withHyphens);
          //     console.log('date changes',withHyphens)
          //     const newdate = date.toLocaleDateString("en-GB")
          //     console.log('new date',newdate)
          //     props.setStartDate(date)
          //   }}
          //   minDate={new Date()}
          //   customInput={<input id={props.name} placeholder=" " type={props.type} className={input + "mt-8" + (props.error && Error)} />}
          //   placeholderText="Select a date after 5 days ago"

          // />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
            <DateField sx={{ background: "white", width: "100%", borderRadius: "0.5rem" }} defaultValue={dayjs('2022-04-17')} />
          </LocalizationProvider>
          : props.type == 'checkBox'
            ? <input id={props.name} {...props.register(props.name)} placeholder=" " type={props.type} className={input + "  " + (props.error && Error)} />
            : <input id={props.name} {...props.register(props.name)} defaultValue={props.defaultValue ? props.defaultValue : ""} placeholder=" " type={props.type} className={input + "  " + (props.error && Error)} />
      }

      {props.error && <p className='text-red-500 text-xs font-bold w-[100%] ml-2'>{props.error.message}</p>}
      <label className={label}>{props.placeholder}{props.required && <span className='text-xl font-bold'>*</span>}</label>
    </div>
  )
}

export default Input
const input = classNames("block py-4 px-2 w-full text-md  rounded-lg border-2 border-gray-600 appearance-none    focus:outline-none focus:ring-0 focus:border-[#e6b42d] peer  ")
const label = classNames("pointer-events-none  px-3 peer-focus:font-medium peer-focus: absolute text-xl text-gray-400   duration-300 transform -translate-y-9 left-1 scale-75 top-2  origin-[0] peer-focus:left-1 peer-focus:text-[#e6b42d]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10")
const MedInput = classNames("w-[13vw]")
const LargeInput = classNames("w-[25vw]")


const Error = classNames("border-red-500")