import React, {ChangeEvent, useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import s from './CardParams.module.css'

import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {CloseRounded} from "@material-ui/icons";
import {useAppDispatch} from "../../../../../../n2-bll/store";


export type TableParamsProps = {
   // packName: string
}

export const TableCardParams: React.FC<TableParamsProps> = (props) => {
   const dispatch = useAppDispatch()

   const [searchValue, setSearchValue] = useState('')
   const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null)

   useEffect(() => {
      if (timerId) {
         clearTimeout(timerId)
      }
      setTimerId(setTimeout(() => {
         // dispatch(searchValueAC(searchValue))
         setTimerId(null)
      }, 1500))
   }, [searchValue])


   const closeSearchHandler = () => {
      setSearchValue('')
      // dispatch(searchValueAC(''))
   }
   return (
      <div className={s.container}>
         <div className={s.search}>
            <Typography sx={{fontWeight: '600', fontSize: '17px', marginBottom: '10px'}}
                        align={'left'}
            >
               Search
            </Typography>
            <Paper variant={'outlined'}
                   sx={{
                      p: '2px 4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                   }}>
               <InputBase
                  className={s.searchInput}
                  // onChange={debounceQuery}
                  type={'text'}
                  placeholder="Card search "
                  value={searchValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)}
                  // defaultValue={props.packName}
               />
               <IconButton onClick={closeSearchHandler}>
                  <CloseRounded/>
               </IconButton>
            </Paper>
         </div>
      </div>
   );
};

