'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { IconArrowRight } from '@tabler/icons-react'
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { doctorAgent } from './DoctorAgentCard'
import { Loader2 } from 'lucide-react'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { SessionDetail } from '../medical-agent/[sessionId]/page'


function AddNewSessionDialog() {


    const [note, setNote] = useState<string | undefined>();
    const [loading, setLoading] = useState(false)
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent>()
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>()
    const router = useRouter()
    const [historyList, setHistoryList] = useState<SessionDetail[]>([])


      const {has}= useAuth()
      const paidUser = has({ plan: 'pro' })


    const onClickNext= async()=>{
        setLoading(true)
        const result = await axios.post("/api/suggest-doctors", {
            notes: note
        })
        setSuggestedDoctors(result.data)
        console.log(result.data)
        setLoading(false)
    }


    const onStartConsultation = async()=>{
        setLoading(true)
        const result = await axios.post('/api/session-chat',{
            notes : note,
            selectedDoctor : selectedDoctor
        })
        console.log(result.data)
        if(result.data?.sessionId){
            const sessionId = result.data.sessionId
             
            router.push('/dashboard/medical-agent/'+sessionId)

        }
        setLoading(false)
    }



      const getHistoryList = async()=>{
        const result =  await axios.get('/api/session-chat?sessionId=all')
        console.log(result.data)
        setHistoryList(result.data)
    }


    useEffect(()=>{
        getHistoryList();
    }, [])


  return (
    <div>
                <Dialog>
                    <DialogTrigger render={<Button className="mt-5 cursor-pointer bg-gray-900 px-4 rounded-lg text-white py-2" disabled={!paidUser && historyList.length>=1}/>}>
                         + Start a Consultation
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add Basic Details</DialogTitle>
                        <DialogDescription asChild>
                            { !suggestedDoctors?
                                
                                <div>
                                    <h2>Add Symptoms or Any Other Details</h2>
                                    <Textarea placeholder='Add Details here...' className='h-[200px] mt-1' onChange={(e)=>setNote(e.target.value)}/>
                                </div>
                                :
                                <div>
                                    <h2>Select the Doctor</h2>
                                    <div className='grid grid-cols-2 gap-5 mt-5 '>
                                        {   
                                            //@ts-ignore
                                            suggestedDoctors.map((doctor, index)=>(
                                                    <SuggestedDoctorCard doctorAgent={doctor} key={index}
                                                    //@ts-ignore
                                                    setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                                                    //@ts-ignore
                                                    selectedDoctor={selectedDoctor}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline" />}>
                                Cancel
                            </DialogClose>
                                                            {
                                !suggestedDoctors?
                                        <Button disabled={!note || loading} onClick={()=>(onClickNext())}> Next {loading ?  <Loader2 className='animate-spin'  /> : <IconArrowRight/>}</Button>
                                        :
                                        <Button disabled={!note || loading || !selectedDoctor} onClick={()=>(onStartConsultation())}> Start Consultation {loading ?  <Loader2 className='animate-spin'  /> : <IconArrowRight/>}</Button>
                            }
                            
                        </DialogFooter>
                    </DialogContent>
            </Dialog>
    </div>
  )
}

export default AddNewSessionDialog
