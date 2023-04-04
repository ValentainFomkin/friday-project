import React, {ChangeEvent, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import s from './Slider.module.css'
import {minCardsCountAC} from "../../../../n2-bll/table-reducer";


export const RangeSlider = () => {
  const maxCardsCount = useAppSelector(s => s.table.cards.maxCardsCount)
  const minCardsCount = useAppSelector(s => s.table.cards.minCardsCount)

  const dispatch = useAppDispatch()
  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount]);

  console.log('slider' + minCardsCount + ' min', maxCardsCount + ' max')

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const minHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(minCardsCountAC(+e.target.value))
  }
  return (
    <Box sx={{width: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div className={s.textField}>
        <TextField
          onChange={minHandler}

          size={'small'}
          InputProps={{
            inputMode: 'numeric',
          }}
        />
      </div>

      <Slider
        value={sliderValue}
        onChange={handleChange}
        disableSwap
      />
      <div className={s.textField}>
        <TextField

          // onChange={maxHandler}
          size={'small'}
          InputProps={{
            inputMode: 'numeric',
          }}/>
      </div>

    </Box>
  );
};

