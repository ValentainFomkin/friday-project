import React, {useEffect} from 'react';
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import s from './PacksListTableStyle.module.css'
import {
  addNewPackTC,
  fetchCardPacksTC,
  removePackTC,
  updatePackTC
} from "../../../../../n2-bll/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Delete, School} from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import {AddNewPackType} from "../../../../../n1-dall/table-api";


export const PacksListTable = () => {
  const [page, setPage] = React.useState(1);

  const tableStatus = useAppSelector(s => s.app.statusForTable)
  const status = useAppSelector(s => s.app.status)
  const user = useAppSelector(s => s.app.user)
  const cardPacks = useAppSelector(s => s.app.cards.cardPacks)


  const dispatch = useAppDispatch()

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
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  const addNewPackHandler = () => {
    const data: AddNewPackType = {
      name: 'ADD NEW PACK',
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
          disabled={tableStatus === 'loading add button'}
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
              }} align={'center'}>
                Cards
              </TableCell>
              <TableCell sx={{
                backgroundColor: 'lightgrey',
                fontSize: '16px',
                fontWeight: '600'
              }} align={'center'}>
                last Updated
              </TableCell>
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
          <TableBody>
            {
              tableData.map(row => (
                <TableRow key={row.id}>
                  <TableCell align={'left'}>{row.firstName}</TableCell>
                  <TableCell align={'center'}>{row.cardsCount}</TableCell>
                  <TableCell align={'center'}>{row.lastUpdated}</TableCell>
                  <TableCell align={'center'}>{row.createdBy}</TableCell>
                  <TableCell align={'center'}>
                    <IconButton onClick={() => alert('go learning!')}
                                disabled={row.createdBy === user.name && tableStatus === 'loading learn button'}
                    >
                      <School fontSize={'small'}/>
                    </IconButton>
                    <IconButton onClick={() => updateHandler(row.id, 'PACK' +
                      ' UPDATED')}
                                disabled={row.createdBy === user.name && tableStatus === 'loading update button'}>
                      <EditIcon fontSize={'small'}/>
                    </IconButton>
                    <IconButton
                      disabled={row.createdBy === user.name && tableStatus === 'loading remove' +
                        ' button'}
                      onClick={() => removeCardHandler(row.id)}>
                      <Delete fontSize={'small'}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={10} page={1} onChange={handleChange} shape="rounded"/>
    </Box>

  )

}

