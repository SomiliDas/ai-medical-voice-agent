import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment from 'moment' 

export type props = {
    historyList : SessionDetail[]
}


function HistoryTable({historyList}: props) {
  return (
    <div>
        <Table>
            <TableCaption>Previous Consultation Reports</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >AI Medical Specialist</TableHead>
                    <TableHead >Description</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                
                        historyList.map((record : SessionDetail, index : number)=>(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
                                <TableCell>{record.notes}</TableCell>
                                <TableCell>{ moment(new Date (record.createdOn)).fromNow() }</TableCell>
                                <TableCell className="text-right"><Button variant={'link'} size={'sm'}>View Report</Button></TableCell>
                            </TableRow>
                        ))
                
                }

            </TableBody>
        </Table>
    </div>
  )
}

export default HistoryTable