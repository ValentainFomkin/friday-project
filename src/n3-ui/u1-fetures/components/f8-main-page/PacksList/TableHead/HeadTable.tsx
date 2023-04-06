import React from 'react';
import s from "./TableHeadComponent.module.css";
import {TableCell, TableHead, TableRow} from "@mui/material";


export const HeadTable = () => {
  return (
    <TableHead className={s.tableHead}>
      <TableRow className={s.tableHeadRow}>
        <TableCell sx={{
          width: '240px',
          backgroundColor: 'lightgrey',
          fontSize: '16px',
          fontWeight: '600'
        }}
                   align={'justify'}>Name</TableCell>
        <TableCell sx={{
          backgroundColor: 'lightgrey',
          fontSize: '16px',
          fontWeight: '600'
        }} align={'center'}>Cards</TableCell>
        <TableCell sx={{
          backgroundColor: 'lightgrey',
          fontSize: '16px',
          fontWeight: '600'
        }} align={'center'}>last Updated</TableCell>
        <TableCell sx={{
          backgroundColor: 'lightgrey',
          fontSize: '16px',
          fontWeight: '600'
        }} align={'center'}>Created by</TableCell>
        <TableCell sx={{
          backgroundColor: 'lightgrey',
          fontSize: '16px',
          fontWeight: '600'
        }} align={'center'}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

