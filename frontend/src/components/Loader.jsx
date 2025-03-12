import React from 'react'
import { TextShimmerWave } from './ui/text-shimmer-wave'


const Loader = () => {
  return (
    <div className='h-screen  flex justify-center items-center'>
        <TextShimmerWave className='[--base-color:#2C2282] [--base-gradient-color:#9C6AFF] text-3xl hidden'
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20} >
        Loading your information..
      </TextShimmerWave>
        <TextShimmerWave className='[--base-color:#CB8940] [--base-gradient-color:#CCA478] text-3xl  '
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20} >
        Loading your information..
      </TextShimmerWave>
    </div>
  )
}

export default Loader