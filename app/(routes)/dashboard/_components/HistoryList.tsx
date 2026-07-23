'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'
import axios from 'axios'
import HistoryTable from './HistoryTable'
import { SessionDetail } from '../medical-agent/[sessionId]/page'

function HistoryList() {

    const [historyList, setHistoryList] = useState<SessionDetail[]>([])



    const getHistoryList = async()=>{
        const result =  await axios.get('/api/session-chat?sessionId=all')
        console.log(result.data)
        setHistoryList(result.data)
    }


    useEffect(()=>{
        getHistoryList();
    }, [])


  return (
    <div className='mt-10'>
        {historyList.length==0 ? 
            <div className='flex flex-col items-center justify-center p-7 border border-dashed border-2 rounded-2xl'>
                <Image src={'/medical-assistance.png'} alt='empty' width={150} height={200}/>
                <h2 className='font-bold text-xl mt-2'>No Recent Consultations</h2>
                <p>It looks like you have not cosulted with any doctors yet.</p>
                <AddNewSessionDialog/>
            </div>
            :
            <div>
                <HistoryTable historyList = {historyList}/>
            </div>
        }
    </div>
  )
}

export default HistoryList
