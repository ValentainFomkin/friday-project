import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@mui/material/Button/Button';
import Typography from "@mui/material/Typography";
import {RangeSlider} from "../../Slider/Slider";
import s from './TableParams.module.css'
import {CloseSettings} from "../../CloseSettings/CloseSettings";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import {searchValueAC, userIdAC} from "../../../../../n2-bll/table-reducer";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {CloseRounded} from "@material-ui/icons";


export type TableParamsProps = {
  packName: string
}

export const TableParams: React.FC<TableParamsProps> = (props) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(s => s.app.user)

  const [containedButton, setContainedButton] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
    setTimerId(setTimeout(() => {
      dispatch(searchValueAC(searchValue))
      setTimerId(null)
    }, 1500))
  }, [searchValue])


  const getMyCardsHandler = () => {
    setContainedButton(true)
    dispatch(userIdAC(user._id))
  }
  const getAllCardsHandler = () => {
    setContainedButton(false)
    dispatch(userIdAC(''))
  }
  const closeSearchHandler = () => {
    setSearchValue('')
    dispatch(searchValueAC(''))
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

      <div className={s.myAllButtons}>
        <div className={s.buttonsSpan}>
          <Typography sx={{fontWeight: '600', fontSize: '17px'}}
                      align={'left'}>
            Show packs cards
          </Typography>
        </div>
        <div className={s.buttons}>
          <Button onClick={getMyCardsHandler}
                  variant={containedButton ? "contained" : 'outlined'}
                  size={'medium'}>
            MY
          </Button>
          <Button onClick={getAllCardsHandler}
                  variant={containedButton ? "outlined" : 'contained'}
                  size={'medium'}>
            ALL
          </Button>
        </div>
      </div>


      <div className={s.numberOfCards}>
        <Typography sx={{fontWeight: '600', fontSize: '17px',}}
                    align={'center'}>
          Number of cards
        </Typography>
        <RangeSlider/>
      </div>


      <div className={s.resetSettings}>
        <div className={s.resetSettingText}>
          <span className={s.resetSpan}>Reset all settings</span>
        </div>
        <div className={s.resetSettingButton}>
          <CloseSettings setSearchValue={setSearchValue}
                         setContainedButton={setContainedButton}/>
        </div>
      </div>
    </div>
  );
};

