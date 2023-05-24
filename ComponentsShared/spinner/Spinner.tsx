import React from 'react'
import Lottie from 'react-lottie-player'
import spinner from '../../public/images/spinner.json'
type Props = {}

const Spinner = (props: Props) => {
  return (
    <Lottie play loop speed={3} animationData={spinner} style={{ width: 200, height: 200 }}></Lottie>

  )
}

export default Spinner