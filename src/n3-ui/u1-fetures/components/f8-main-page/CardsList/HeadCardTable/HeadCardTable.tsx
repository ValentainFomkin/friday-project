import React from 'react';
import s from "./CardHead.module.css";
import {TableCell, TableHead, TableRow} from "@mui/material";


export const HeadCardTable = () => {
   return (
      <TableHead className={s.tableHead}>
         <TableRow className={s.tableHeadRow}>
            <TableCell sx={{
               width: '240px',
               backgroundColor: 'lightgrey',
               fontSize: '16px',
               fontWeight: '600'
            }}
                       align={'justify'}>Question</TableCell>
            <TableCell sx={{
               backgroundColor: 'lightgrey',
               fontSize: '16px',
               fontWeight: '600'
            }} align={'center'}>Answer</TableCell>
            <TableCell sx={{
               backgroundColor: 'lightgrey',
               fontSize: '16px',
               fontWeight: '600'
            }} align={'center'}>last Updated</TableCell>
            <TableCell sx={{
               backgroundColor: 'lightgrey',
               fontSize: '16px',
               fontWeight: '600'
            }} align={'center'}>Grade</TableCell>
            <TableCell sx={{
               backgroundColor: 'lightgrey',
               fontSize: '16px',
               fontWeight: '600'
            }} align={'center'}></TableCell>
         </TableRow>
      </TableHead>
   );
};

