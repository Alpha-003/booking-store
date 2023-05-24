import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  text: string
  type: 'error' | 'success'
  toggle: boolean
  toggleSetter: (value: boolean) => void
}

const NotifyComp = (props: Props) => {
  let [FirstRender, setFirstRender] = useState(true)
  function notify(text: string, Type: 'error' | 'success') {
    toast(text, {
      type: Type
    })
  }
  useEffect(() => {
    if (FirstRender) {
      setFirstRender(false)
    } else {
      if (props.toggle) {
        notify(props.text, props.type)
        props.toggleSetter(false)

      }
    }
  }, [props.toggle])

  return (
    <div>
      <ToastContainer />

    </div>
  )
}

export default NotifyComp