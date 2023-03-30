import React, {useEffect} from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import s from './PacksListTableStyle.module.css'
import {addNewPackTC, fetchCardPacksTC} from "../../../../../n2-bll/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const PacksListTable = () => {
    const user = useAppSelector(s => s.app.user)
    const cardPacks = useAppSelector(s => s.app.cards.cardPacks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCardPacksTC())
    }, [])

    const tableData = cardPacks.map(c => ({
        id: c._id,
        firstName: c.name,
        cards: c.cardsCount,
        lastUpdated: c.updated,
        createdBy: c.user_name,
        actions: 'assaas'
    }))
    // const tableData = [
    //     {
    //         id: v1(),
    //         firstName: 'Jon',
    //         cards: 1,
    //         lastUpdated: 35,
    //         createdBy: 'Snow',
    //         actions: 'some actions'
    //     },
    // ];
    const addNewPackHandler = () => {
        dispatch(addNewPackTC())
    }

    return (
        <Box sx={{
            height: 430,
            minWidth: '20%',
            maxWidth: '80%',
            margin: '0 auto'
        }}>
            <div className={s.header}>
                <Typography variant={'h4'}
                            component={'h4'}
                            sx={{textAlign: 'left', fontWeight: '600',}}
                >
                    Packs list
                </Typography>
                <Button
                    onClick={addNewPackHandler}
                    sx={{borderRadius: '20px'}}
                    variant={'contained'}
                    type="button">
                    Add new pack
                </Button>
            </div>
            <TableContainer className={s.container}
                            sx={{maxHeight: '400px'}}
                            component={Paper}
            >
                <Table className={s.table}
                       aria-label={'customized table'}
                       stickyHeader
                >
                    <TableHead sx={{maxWidth: '400px'}}>
                        <TableRow sx={{height: '85px', backgroundColor: 'gray'}} className={s.tableHeadRow}>
                            <TableCell>Name</TableCell>
                            <TableCell>Cards</TableCell>
                            <TableCell>last Updated</TableCell>
                            <TableCell>Created by</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.cards}</TableCell>
                                    <TableCell>{row.lastUpdated}</TableCell>
                                    <TableCell>{row.createdBy}</TableCell>
                                    <TableCell>{row.actions}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )

}

