import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import s from './PacksPage.module.css'
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {Delete, School} from "@material-ui/icons";
import {AddNewPackType} from "../../../../../n1-dall/table-api";
import {addNewPackTC, fetchCardPacksTC, removePackTC} from "../../../../../n2-bll/table-reducer";


export const PacksPageTable = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(s => s.table.cards.cardPacks)
  const user = useAppSelector(s => s.app.user)
  const cards = useAppSelector(s => s.table.cards)

  // const iconsAll = () => {
  //   return <>
  //     <SchoolIcon/>
  //     <EditIcon/>
  //     <DeleteForeverIcon/>
  //   </>
  // }

  useEffect(() => {
    dispatch(fetchCardPacksTC())
  }, [cardPacks.length])


  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      // filterable: false,
      // sortable: false,
      // type: 'singleSelect',
      // valueOptions: ['basic', 'editor', 'admin'],
      // editable: true
    },
    {field: 'cards', headerName: 'Cards', width: 300, headerAlign: 'center', align: 'center',},
    {
      field: 'lastUpdated',
      headerName: 'Last updated',
      width: 300,
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'createdBy',
      headerName: 'Created by',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'button',
      headerName: 'Actions',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: () => <div key={user._id}>
        <IconButton>
          <School fontSize={'small'}/>
        </IconButton>
        <IconButton>
          <EditIcon fontSize={'small'}/>
        </IconButton>
        <IconButton onClick={removeCardHandler}>
          <Delete fontSize={'small'}/>
        </IconButton>
      </div>
      ,
    },

  ]

  const rows = cardPacks.map(c => (
      {
        id: c._id,
        name: c.name,
        cardsCount: c.cardsCount,
        lastUpdated: c.updated,
        createdBy: c.user_name,
        actions: '',
        userId: c.user_id
      }
    )
  )

  const removeCardHandler = () => {
    dispatch(removePackTC('dsadasdas'))
  }
  const addNewPackHandler = () => {
    const data: AddNewPackType = {
      name: 'ADD NEW PACK',
    }
    dispatch(addNewPackTC(data))
    // dispatch(fetchCardPacksTC())
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

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={row => row.id}
        pageSizeOptions={[5, 10, 15]}
        initialState={{pagination: {paginationModel: {pageSize: cards.pageCount}}}}
      />

    </Box>
  );
}