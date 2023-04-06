import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import Typography from "@mui/material/Typography";
import s from './Slider.module.css'
import {minMaxCardsCountAC} from "../../../../n2-bll/table-reducer";


export const RangeSlider = () => {
  const maxCardsCount = useAppSelector(s => s.table.cards.maxCardsCount)
  const minCardsCount = useAppSelector(s => s.table.cards.minCardsCount)
  const appStatus = useAppSelector(s => s.app.status)

  const dispatch = useAppDispatch()
  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount]);

  useEffect(() => {
    setSliderValue([minCardsCount, maxCardsCount])
  }, [maxCardsCount, minCardsCount])

  // console.log('slider' + minCardsCount + ' min', maxCardsCount + ' max')

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    const [num1, num2] = newValue as number[]
    setSliderValue([num1, num2])
  };

  const onMouseHandler = () => {
    dispatch(minMaxCardsCountAC(sliderValue[0], sliderValue[1]))
    
  }

  return (
    <Box sx={{
      // border: '2px solid green',
      width: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start'
    }}>

      <div className={s.typography}>
        <Typography>{sliderValue[0]}</Typography>
      </div>

      <Slider
        value={sliderValue}
        onChange={handleChange}
        disableSwap
        onMouseUp={onMouseHandler}
        max={110}
        disabled={appStatus === 'loading'}
      />
      <div className={s.typography}>
        <Typography>{sliderValue[1]}</Typography>
      </div>

    </Box>
  );
};

