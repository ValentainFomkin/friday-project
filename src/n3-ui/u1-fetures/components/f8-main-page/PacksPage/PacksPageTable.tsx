import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import s from './PacksPage.module.css'
import Button from "@mui/material/Button";
import {addNewPackTC, fetchCardPacksTC} from "../../../../../n2-bll/app-reducer";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {Delete, School} from "@material-ui/icons";

export const DataTable = () => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(s => s.app.cards.cardPacks)
    const user = useAppSelector(s => s.app.user)

    const iconsAll = () => {
        return <>
            <SchoolIcon/>
            <EditIcon/>
            <DeleteForeverIcon/>
        </>
    }

    useEffect(() => {
        dispatch(fetchCardPacksTC())
    }, [])

    const removeCardHandler = () => {
        alert('card is removed')
    }

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
        {field: 'createdBy', headerName: 'Created by', width: 300, headerAlign: 'center', align: 'center',},
        {
            field: 'button',
            headerName: 'Actions',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: () => rows.map(c => c.userId === user._id ? <div>
                <IconButton>
                    <School fontSize={'small'}/>
                </IconButton>
                <IconButton>
                    <EditIcon fontSize={'small'}/>
                </IconButton>
                <IconButton onClick={removeCardHandler}>
                    <Delete fontSize={'small'}/>
                </IconButton>
            </div> : <IconButton onClick={() => alert('teatching')}>
                <School fontSize={'small'}/>
            </IconButton>)
            ,
        },

    ]

    const rows = cardPacks.map(c => (
            {
                id: c._id,
                name: c.name,
                cards: c.cardsCount,
                lastUpdated: c.updated,
                createdBy: c.user_name,
                actions: '',
                userId: c.user_id
            }
        )
    )
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

            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={rows => rows.id}
                pageSizeOptions={[5, 10, 15]}
                initialState={{pagination: {paginationModel: {pageSize: 5}}}}
            />

        </Box>
    );
}