import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div className='p-10 md:px-20 lg:px-48'>
        <h2 className='font-bold text-3xl mb-5' >Join Subscription</h2>
        <PricingTable/>
    </div>
  )
}

export default Billing
