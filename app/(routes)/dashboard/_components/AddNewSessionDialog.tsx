'use client'
import React, { useState } from 'react'
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


function AddNewSessionDialog() {


    const [note, setNote] = useState<string | undefined>();
  return (
    <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mt-5 cursor-pointer bg-gray-900 px-4 rounded-lg text-white py-2"> + Start a Consultation</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add Basic Details</DialogTitle>
                        <DialogDescription asChild>
                            <div>
                                <h2>Add Symptoms or Any Other Details</h2>
                                <Textarea placeholder='Add Details here...' className='h-[200px] mt-1' onChange={(e)=>setNote(e.target.value)}/>
                            </div>
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant={"outline"}>Cancel</Button>
                            </DialogClose>
                            
                            <Button disabled={!note}>Next <IconArrowRight/></Button>
                        </DialogFooter>
                    </DialogContent>
            </Dialog>
    </div>
  )
}

export default AddNewSessionDialog
