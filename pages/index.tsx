import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Hero from '@/Components/hero/Hero'
import Navbar from '@/ComponentsShared/navbar/Navbar'
import Services from '@/Components/services/Services'
import Projects from '@/Components/projects/Projects'
import WhyUs from '@/Components/whyUs/WhyUs'
import Footer from '@/ComponentsShared/footer/Footer'
import LocationInfo from '@/Components/locationInfo/LocationInfo'
import OurUnits from '@/Components/ourUnits/OurUnits'
import DataContext from '@/context/DataContext'
import React, { useEffect, useRef, useState } from 'react'
import Form from '@/Components/form/Form'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import { ToastContainer, toast } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })

type Props = {
  dataGetter: DataInterface[],
}
export interface DataInterface {
  id: number,
  code: string,
  description: string,
  monthly_rack_rate: number,
  type_category: string,
  size_category: string,
  total_vacant: number,
  length: number,
  width: number,
  message?: string

}

export default function Home(props: Props) {
  // let AccessToken = props.data.access_token;
  // let RefreshToken = props.data.refresh_token;



  const [Data, SetData] = useState<DataInterface[]>([]);
  const unitesRef = useRef(null);
  const { OpenCTA } = React.useContext(DataContext)
  const [Error, SetError] = useState({ state: false, message: "" })

  useEffect(() => {
    localStorage.clear();
    //@ts-ignore
    if (props.dataGetter.message) {
      //@ts-ignore
      notify(props.dataGetter.message, 'error')

    }
    else {
      let filteredData = props.dataGetter.filter((item) => item.total_vacant > 0)
      SetData(filteredData);
    }
    //I want to filter the datagetter array to get data that has total-vacant > 0


  }, [])

  function notify(text: string, Type: 'error' | 'success') {
    toast(text, {
      type: Type
    })
  }

  return (
    <div className=' text-black '>
      <Navbar></Navbar>
      <ToastContainer />

      <Hero toJumpRef={unitesRef}></Hero>
      {OpenCTA && <Form></Form>}
      <div className='px-4  pt-20 sm:px-10 xl:px-20'>

        <LocationInfo></LocationInfo>
      </div>
      <OurUnits Data={Data} Ref={unitesRef}></OurUnits>

    </div>

  )
}

//get static porps
// export async function getStaticProps() {
//   console.log(params);


let Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTJiMGVkYzI1YzViZmJjZGFlODI0NmYxNTk5ZDY5MTc5MDI1Njk0NmU2YmQ3ZGUzZTI1MDI2Yjc4NDc4MzAwYzM4MDc5MWJlMTJiZjIyMjAiLCJpYXQiOjE2ODA1MzUwMTYuNjY2MjgsIm5iZiI6MTY4MDUzNTAxNi42NjYyODIsImV4cCI6MTcxMjE1NzQxNi42NTg2ODMsInN1YiI6IjIxMjUiLCJzY29wZXMiOltdfQ.n1efTyCmOGrZ8tQQjca2kmbj_6bSIvmJ5JAvjDGEKSRqyvMYCNtaRxq3E6_grsd4d8zZE4xyQu_c_GmK6AOd8XeUCo-3YNevtOswY6TVizP42ezbV4CpW0zNYkx_oIPNDswJJPDV38wbrtZH1z6wBmJ1WvuNFjwU76Te7A78gJQMzVTbMTUoS5WzUgTmOm-13HAwmfaL7KOO1MeJz9QclRiI1mNsP7_Wbr-ewlFXus0_eRWoBuLKN8XOeqFPZsDG5UFSbrBkdNxHVXGTeDyFfm6ykV8k43GZhP83-_vO1FofxGCPwz6cXKqnXDdikHRNzmc8Okuo0kwzqBMpTBtgKO4ci3pdODAwJ2lESZ9pLFm9jtnRa4b8h0HcAwiPEQGatoH4NVMGG7q78ahTymqdXqR60Mk4b8PFcYJBxDkruDJ7KAz-Dc2xviBC-puFib9_sK2QjLQDKalwf_quxi7v_Y7_pc5IgN3KJVtNtK5QsfFLHaGNP_7dLnFkvwZpKrXvgrvfTlCy9DqajAr5y6bUfScayMQ_zGGYokn5MLVcCZq_EuYmmBXvYgNnwQnmJNsKYpKYjg9PeQ_-o0Drda8rIuIN8lkFMMV4mqmy7pU_WNT4gsi27C5afgZgW6-chjvoNQfVDtz1hhuNl50dL_w2xlB3bFOBh_SYO7eliKUVNJw'
//   const headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${Token} `
//   };
//   let data = await axios.get('https://cloud.storman.com/oauth/authorize?client_id=51&redirect_uri=https://storage-x.vercel.app/&response_type=code', { headers, withCredentials: true })
//   console.log(data);

//   return {
//     props: { data },
//   }
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // let Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTJiMGVkYzI1YzViZmJjZGFlODI0NmYxNTk5ZDY5MTc5MDI1Njk0NmU2YmQ3ZGUzZTI1MDI2Yjc4NDc4MzAwYzM4MDc5MWJlMTJiZjIyMjAiLCJpYXQiOjE2ODA1MzUwMTYuNjY2MjgsIm5iZiI6MTY4MDUzNTAxNi42NjYyODIsImV4cCI6MTcxMjE1NzQxNi42NTg2ODMsInN1YiI6IjIxMjUiLCJzY29wZXMiOltdfQ.n1efTyCmOGrZ8tQQjca2kmbj_6bSIvmJ5JAvjDGEKSRqyvMYCNtaRxq3E6_grsd4d8zZE4xyQu_c_GmK6AOd8XeUCo-3YNevtOswY6TVizP42ezbV4CpW0zNYkx_oIPNDswJJPDV38wbrtZH1z6wBmJ1WvuNFjwU76Te7A78gJQMzVTbMTUoS5WzUgTmOm-13HAwmfaL7KOO1MeJz9QclRiI1mNsP7_Wbr-ewlFXus0_eRWoBuLKN8XOeqFPZsDG5UFSbrBkdNxHVXGTeDyFfm6ykV8k43GZhP83-_vO1FofxGCPwz6cXKqnXDdikHRNzmc8Okuo0kwzqBMpTBtgKO4ci3pdODAwJ2lESZ9pLFm9jtnRa4b8h0HcAwiPEQGatoH4NVMGG7q78ahTymqdXqR60Mk4b8PFcYJBxDkruDJ7KAz-Dc2xviBC-puFib9_sK2QjLQDKalwf_quxi7v_Y7_pc5IgN3KJVtNtK5QsfFLHaGNP_7dLnFkvwZpKrXvgrvfTlCy9DqajAr5y6bUfScayMQ_zGGYokn5MLVcCZq_EuYmmBXvYgNnwQnmJNsKYpKYjg9PeQ_-o0Drda8rIuIN8lkFMMV4mqmy7pU_WNT4gsi27C5afgZgW6-chjvoNQfVDtz1hhuNl50dL_w2xlB3bFOBh_SYO7eliKUVNJw'
  // let data: {
  //   access_token: string,
  //   expires_in: number,
  //   refresh_token: string,
  //   token_type: string,
  // };
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  //   body: JSON.stringify({
  //     grant_type: "authorization_code",
  //     client_id: 52,
  //     client_secret: "qpiH1AxfUPI6EUO6MjoeJ9YYdoSVGjd8dtIL4Y3b",
  //     redirect_uri: "https://storage-x.vercel.app/",
  //     code: (context.query.code + "")
  //   })

  // };


  // let api = await fetch(`https://cloud.storman.com/oauth/token`, requestOptions)
  // data = await api.json()


  let apiGetter = await fetch(`${process.env.NEXT_PUBLIC_STORMAN_CLOUD_API_URI}/unit-types?is_active=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`
    }
  })
  let dataGetter = await apiGetter.json()


  return {
    props: { dataGetter }, // will be passed to the page component as props
  }
}