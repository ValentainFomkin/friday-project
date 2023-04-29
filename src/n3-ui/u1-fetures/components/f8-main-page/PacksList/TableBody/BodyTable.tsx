import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import {Delete, School} from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import {useAppDispatch, useAppSelector} from "n2-bll/store";
import s from './BodyTable.module.css'
import {useNavigate} from "react-router-dom";
import {PATH} from "n3-ui/u1-fetures/components/routes/paths-routes/PathRoutes";
import {cardsPackIdAC} from "n2-bll/packs-reducer";


type TableDataType = {
   id: string
   user_id: string
   firstName: string
   cardsCount: number
   lastUpdated: string
   createdBy: string
   actions: string
}

type BodyTable = {
   tableData: TableDataType[]
   updateHandler: (_id: string, name: string) => void
   removeCardHandler: (id: string) => void
}

export const BodyTable: React.FC<BodyTable> = (props) => {
   const {tableData, updateHandler, removeCardHandler} = props
   const user = useAppSelector(s => s.app.user)
   const packId = useAppSelector(s => s.packs.searchParams.cardsPack_id)
   const tableStatus = useAppSelector(s => s.table.statusForTable)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()


   const redirectOnCardHandler = (id: string) => {
      dispatch(cardsPackIdAC(id))
      navigate(`${PATH.USER_CARD_PATH}`)
   }

   return (
      <TableBody>
         {
            tableData.map(row => (


               <TableRow key={row.id}
                         onClick={() => redirectOnCardHandler(row.id)}
                         className={s.tableRow}
               >
                  <TableCell align={'left'} className={s.cardName}>{row.firstName}</TableCell>
                  <TableCell align={'center'}>{row.cardsCount}</TableCell>
                  <TableCell align={'center'}>{row.lastUpdated}</TableCell>
                  <TableCell align={'center'}>{row.createdBy}</TableCell>
                  {user._id === row.user_id
                     ? <TableCell align={'center'}>

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
                     : <TableCell align={'center'}>
                        <IconButton onClick={() => alert('go learning!')}
                                    disabled={row.createdBy === user.name && tableStatus === 'loading learn button'}
                        >
                           <School fontSize={'small'}/>
                        </IconButton>
                     </TableCell>
                  }
               </TableRow>
            ))
         }
      </TableBody>
   );
};

