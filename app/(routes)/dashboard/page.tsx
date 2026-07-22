import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/DoctorsAgentList'

function Dashboard() {
  return (
    <div className='px-12' >
      <div className='flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>My Dashboard</h2>
          <Button className="cursor-pointer bg-gray-900"> + Consult with a Doctor</Button>
      </div>
      
      <HistoryList/>
      <DoctorsAgentList/>
    </div>
  )
}

export default Dashboard
