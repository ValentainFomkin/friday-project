import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import {useAppSelector} from "../../../../../../n2-bll/store";
import s from './BodyCardTable.module.css'


type TableDataType = {
   id: string
   user_id: string
   question: string
   answer: string
   lastUpdated: string
   grade: number
   actions: string
}

type BodyTable = {
   tableData: TableDataType[]
   updateHandler: (_id: string, name: string) => void
   removeCardHandler: (id: string) => void
}

export const BodyCardTable: React.FC<BodyTable> = (props) => {
   const {tableData, updateHandler, removeCardHandler} = props
   const user = useAppSelector(s => s.app.user)
   const searchParamsCards = useAppSelector(s => s.packs.searchParams)
   const tableStatus = useAppSelector(s => s.table.statusForTable)

   const redirectOnCardHandler = (id: string) => {
      alert(`card - ${id}`)
   }

   return (
      <TableBody>
         {
            tableData.map(row => (


               <TableRow key={row.id}
                         onClick={() => redirectOnCardHandler(row.id)}
                         className={s.tableRow}
               >
                  <TableCell align={'left'} className={s.question}>{row.question}</TableCell>
                  <TableCell align={'center'}>{row.answer}</TableCell>
                  <TableCell align={'center'}>{row.lastUpdated}</TableCell>
                  <TableCell align={'center'}>{row.grade}</TableCell>
                  <TableCell align={'center'}>
                     <IconButton onClick={() => updateHandler(row.id, 'PACK' +
                        ' UPDATED')}
                     >
                        <EditIcon fontSize={'small'}/>
                     </IconButton>
                     <IconButton
                        onClick={() => removeCardHandler(row.id)}>
                        <Delete fontSize={'small'}/>
                     </IconButton>
                  </TableCell>
               </TableRow>
            ))
         }
      </TableBody>
   );
};

