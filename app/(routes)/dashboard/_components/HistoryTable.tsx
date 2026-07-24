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

import moment from 'moment' 
import ViewReportDialog from './ViewReportDialog'

type props = {
    historyList : SessionDetail[]
}


function HistoryTable({historyList}: props) {
  return (
    <div>
        <Table>
            <TableCaption>Previous Consultation Reports</TableCaption>
            <TableHeader>
                <TableRow >
                    <TableHead className='font-extrabold text-lg' >AI Medical Specialist</TableHead>
                    <TableHead className='font-extrabold text-lg' >Description</TableHead>
                    <TableHead className='font-extrabold text-lg'>Time</TableHead>
                    <TableHead className="text-right font-extrabold text-lg">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                
                        historyList.map((record : SessionDetail, index : number)=>(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
                                <TableCell>{record.notes}</TableCell>
                                <TableCell>{ moment(new Date (record.createdOn)).fromNow() }</TableCell>
                                <TableCell className="text-right"> <ViewReportDialog record = {record}/></TableCell>
                            </TableRow>
                        ))
                
                }

            </TableBody>
        </Table>
    </div>
  )
}

export default HistoryTable