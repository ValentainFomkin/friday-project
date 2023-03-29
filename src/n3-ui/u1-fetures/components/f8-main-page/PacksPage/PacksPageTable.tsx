import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";


export const DataTable = () => {


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
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            type: 'boolean',
            editable: true
        },

    ]

    const rows = [
        {
            id: 1,
            name: 'Snow',
            cards: 35,
            lastUpdated: new Date(),
            createdBy: 'created by',
            actions: 'some actions',
        },
        {
            id: 2,
            name: 'aaaa',
            cards: 2,
            lastUpdated: new Date(),
            createdBy: 'created by',
            actions: 'some actions',
        },
        {
            id: 3,
            name: 'sssss',
            cards: 3,
            lastUpdated: new Date(),
            createdBy: 'created by',
            actions: 'some actions',
        },
        {
            id: 4,
            name: 'ddddd',
            cards: 44,
            lastUpdated: new Date(),
            createdBy: 'created by',
            actions: 'some actions',
        },
        {
            id: 5,
            name: 'ffffff',
            cards: 55,
            lastUpdated: new Date().toLocaleDateString(),
            createdBy: 'created by',
            actions: 'some actions',
        },

    ];


    return (
        <Box sx={{
            height: 400,
            minWidth: '20%',
            maxWidth: '80%',
            margin: '0 auto'
        }}>
            <Typography variant={'h3'}
                        component={'h3'}
                        sx={{textAlign: 'left', mt: 3, mb: 5}}
            >
                Pack list
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={rows => rows.id}
            />

        </Box>
    );
}