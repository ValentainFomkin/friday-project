import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button/Button';
import Typography from "@mui/material/Typography";
import {RangeSlider} from "../../Slider/Slider";
import s from './TableParams.module.css'
import {CloseSettings} from "../../CloseSettings/CloseSettings";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import {packNameAC, userIdAC} from "../../../../../n2-bll/table-reducer";
import {debounce} from "lodash";


export type TableParamsProps = {
  packName: string
}

export const TableParams: React.FC<TableParamsProps> = (props) => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(s => s.app.user)


  const [containedButton, setContainedButton] = useState(false)

  const [searchValue, setSearchValue] = useState<string>('')
  const searchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target && setSearchValue(e.target.value)
    dispatch(packNameAC(searchValue))
  }

  const debounceQuery = debounce(searchHandler, 1000)


  const getMyCardsHandler = () => {
    setContainedButton(true)
    dispatch(userIdAC(user._id))
  }
  const getAllCardsHandler = () => {
    setContainedButton(false)
    dispatch(userIdAC(''))
  }

  return (
    <div className={s.container}>
      <div className={s.search}>
        <Typography sx={{fontWeight: '600', fontSize: '17px', marginBottom: '10px'}}
                    align={'left'}
        >
          Search
        </Typography>
        <TextField
          onChange={debounceQuery}
          size={'small'}
          label="Search"
          InputProps={{
            type: 'search',
            // size: 'small'
          }}
        />
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
        <Typography sx={{fontWeight: '600', fontSize: '17px'}}
                    align={'left'}>
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

