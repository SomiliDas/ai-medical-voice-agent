import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'



type props = {
    doctorAgent : doctorAgent,
    setSelectedDoctor : doctorAgent,
    selectedDoctor : doctorAgent
}


function SuggestedDoctorCard({doctorAgent, setSelectedDoctor, selectedDoctor} : props) {
  return (
    <div className={`flex flex-col items-center gap-1 p-4 border rounded-2xl shadow cursor-pointer hover:border-blue-500 ${selectedDoctor?.id ==doctorAgent.id && `border-blue-500` }`} onClick={()=>setSelectedDoctor(doctorAgent)}>
        <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={70} height={70} className=' w-[50px] h-[50px] rounded-4xl object-cover mt-2'/>
        <h2 className='font-semibold text-sm text-center'>{doctorAgent.specialist}</h2>
        <p className='text-sm text-center'>{doctorAgent.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard
