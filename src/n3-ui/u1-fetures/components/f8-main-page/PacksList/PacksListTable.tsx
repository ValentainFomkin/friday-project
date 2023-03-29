import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import s from './PacksListTableStyle.module.css'
import {v1} from "uuid";

export const PacksListTable = () => {
    const tableData = [
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 2, lastUpdated: 2, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 3, lastUpdated: 1, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 4, lastUpdated: 3, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 5, lastUpdated: 4, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 5, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 6, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},
        {id: v1(), firstName: 'Jon', cards: 1, lastUpdated: 35, createdBy: 'Snow', actions: 'some actions'},

    ];
    

    return (
        <TableContainer className={s.container}
                        sx={{maxHeight: '600px', width: '80%'}}
                        component={Paper}
        >
            <Table className={s.table}
                   aria-label={'customized table'}
                   stickyHeader
            >
                <TableHead className={s.tableHead}>
                    <TableRow className={s.tableHeadRow}>
                        <TableCell className={s.tableHeadCell} align={'center'}>Name</TableCell>
                        <TableCell className={s.tableHeadCell} align={'center'}>Cards</TableCell>
                        <TableCell className={s.tableHeadCell} align={'center'}>last Updated</TableCell>
                        <TableCell className={s.tableHeadCell} align={'center'}>Created by</TableCell>
                        <TableCell className={s.tableHeadCell} align={'center'}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData.map(row => (
                            <TableRow sx={{'&:last-child, &:last-child th': {border: 0}}} key={row.id}>
                                <TableCell align={'center'}>{row.firstName}</TableCell>
                                <TableCell align={'center'}>{row.cards}</TableCell>
                                <TableCell align={'center'}>{row.lastUpdated}</TableCell>
                                <TableCell align={'center'}>{row.createdBy}</TableCell>
                                <TableCell align={'center'}>{row.actions}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

