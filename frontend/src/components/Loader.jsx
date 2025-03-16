import React from 'react'
import { TextShimmerWave } from './ui/text-shimmer-wave'


const Loader = () => {
  return (
    <div className='h-screen  flex justify-center items-center'>
        
        <TextShimmerWave className='[--base-color:#ffffff] [--base-gradient-color:#dddddd] text-2xl md:text-3xl  '
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