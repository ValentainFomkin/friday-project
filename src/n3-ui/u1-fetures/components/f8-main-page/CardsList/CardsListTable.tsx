import React, {useEffect} from 'react';
import {Box, Pagination, Paper, Table, TableContainer} from "@mui/material";
import s from './CardsListTableStyle.module.css'

import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AddNewPackType} from "../../../../../n1-dall/table-api";
import {addNewPackTC, removePackTC, updatePackTC} from "../../../../../n2-bll/table-reducer";

import {fetchCardsTC, pageCardAC} from "../../../../../n2-bll/packs-reducer";
import {BodyCardTable} from "./BodyCardTable/BodyCardTable";
import {HeadCardTable} from "./HeadCardTable/HeadCardTable";
import {TableCardParams} from "./CardParams/CardParams";


export const CardsListTable = () => {

   const appStatus = useAppSelector(s => s.app.status)
   const tableStatus = useAppSelector(s => s.table.statusForTable)
   const cards = useAppSelector(s => s.packs.cards)
   const cardsTotalCount = useAppSelector(s => s.packs.searchParams.cardsTotalCount)
   // const maxCardsCount = useAppSelector(s => s.table.cards.maxCardsCount)
   // const minCardsCount = useAppSelector(s => s.table.cards.minCardsCount)
   const selectedPage = useAppSelector(s => s.packs.searchParams.page)
   const pageCount = useAppSelector(s => s.packs.searchParams.pageCount)
   // const searchValue = useAppSelector(s => s.table.cards.searchValue)
   // const user_id = useAppSelector(s => s.table.cards.user_id)

   const dispatch = useAppDispatch()

   const paginationPageCount = Math.ceil(cardsTotalCount / pageCount)

   const tableData = cards.map(c => ({
      id: c._id,
      user_id: c.user_id,
      question: c.question,
      answer: c.answer,
      lastUpdated: c.updated,
      grade: c.grade,
      actions: ''
   }))

   useEffect(() => {
      dispatch(fetchCardsTC())
      console.log('render Table Cards')
   }, [])

   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(pageCardAC(value))
   };


   const addNewCardHandler = () => {
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
               onClick={addNewCardHandler}
               sx={{borderRadius: '20px', width: '20%'}}
               variant={'contained'}
               size={'large'}
               type="button">
               Add new pack
            </Button>
         </div>
         <div className={s.tableParams}>
            <TableCardParams/>
         </div>
         <TableContainer className={s.container}
                         sx={{maxHeight: '440px', maxWidth: '100%', minWidth: '60%'}}
                         component={Paper}
         >
            <Table className={s.table}
                   aria-label={'customized table'}
                   stickyHeader
            >
               <HeadCardTable/>
               <BodyCardTable tableData={tableData}
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

