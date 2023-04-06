import React, {useEffect} from 'react';
import {Box, Pagination, Paper, Table, TableContainer} from "@mui/material";
import s from './PacksListTableStyle.module.css'

import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AddNewPackType} from "../../../../../n1-dall/table-api";
import {
  addNewPackTC,
  fetchCardPacksTC,
  pageAC,
  removePackTC,
  updatePackTC
} from "../../../../../n2-bll/table-reducer";
import {TableParams} from "../TableParams/TableParams";
import {HeadTable} from "./TableHead/HeadTable";
import {BodyTable} from "./TableBody/BodyTable";


export const PacksListTable = () => {

  const appStatus = useAppSelector(s => s.app.status)
  const tableStatus = useAppSelector(s => s.table.statusForTable)
  const cardPacks = useAppSelector(s => s.table.cards.cardPacks)
  const cardPacksTotalCount = useAppSelector(s => s.table.cards.cardPacksTotalCount)
  const maxCardsCount = useAppSelector(s => s.table.cards.maxCardsCount)
  const minCardsCount = useAppSelector(s => s.table.cards.minCardsCount)
  const selectedPage = useAppSelector(s => s.table.cards.page)
  const pageCount = useAppSelector(s => s.table.cards.pageCount)
  const searchValue = useAppSelector(s => s.table.cards.searchValue)
  const user_id = useAppSelector(s => s.table.cards.user_id)

  const dispatch = useAppDispatch()

  const paginationPageCount = Math.ceil(cardPacksTotalCount / pageCount)
  console.log(
    pageCount, ' - pageCount, ',
    selectedPage, ' - selectedPage, ',
    cardPacksTotalCount, ' - cardPacksTotalCount, ',
    minCardsCount, ' - min, ',
    maxCardsCount, ' - max, ')

  const tableData = cardPacks.map(c => ({
    id: c._id,
    user_id: c.user_id,
    firstName: c.name,
    cardsCount: c.cardsCount,
    lastUpdated: c.updated,
    createdBy: c.user_name,
    actions: ''
  }))

  useEffect(() => {
    dispatch(fetchCardPacksTC())
    console.log('render Table Page')
  }, [maxCardsCount, minCardsCount, selectedPage, pageCount, cardPacksTotalCount, searchValue, user_id])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(pageAC(value))
  };


  const addNewPackHandler = () => {
    console.log('add new page')
    const data: AddNewPackType = {
      name: 'ADD NEW PACK',
      private: false
    }
    dispatch(addNewPackTC(data))
  }
  const removeCardHandler = (id: string) => {
    dispatch(removePackTC(id))

  }
  const updateHandler = (_id: string, name: string) => {
    const data = {_id, name}
    dispatch(updatePackTC(data))
  }

  // console.log('PackLIST : ' + 'min = ' + minCardsCount + ', max = ' + maxCardsCount)
  return (
    <Box sx={{
      height: 480,
      minWidth: '20%',
      maxWidth: '80%',
      margin: '0 auto'
    }}>
      <div className={s.header}>
        <Typography variant={'h3'}
                    component={'h4'}
                    sx={{textAlign: 'left', fontWeight: '600',}}
        >
          Packs list
        </Typography>
        <Button
          disabled={tableStatus === 'loading add button'}
          onClick={addNewPackHandler}
          sx={{borderRadius: '20px', width: '20%'}}
          variant={'contained'}
          size={'large'}
          type="button">
          Add new pack
        </Button>
      </div>
      <div className={s.tableParams}>
        <TableParams packName={searchValue}/>
      </div>
      <TableContainer className={s.container}
                      sx={{maxHeight: '440px', maxWidth: '100%', minWidth: '60%'}}
                      component={Paper}
      >
        <Table className={s.table}
               aria-label={'customized table'}
               stickyHeader
        >
          <HeadTable/>
          <BodyTable tableData={tableData}
                     removeCardHandler={removeCardHandler}
                     updateHandler={updateHandler}
          />
        </Table>
      </TableContainer>
      <Pagination sx={{mt: 3}}
                  disabled={appStatus === 'loading'}
                  count={paginationPageCount}
                  page={selectedPage} onChange={handleChange}
                  shape="rounded"/>
    </Box>

  )

}

