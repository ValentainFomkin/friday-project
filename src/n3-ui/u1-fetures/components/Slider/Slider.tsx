import React, {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Slider} from "@mui/material";
import {useAppDispatch} from "../../../../n2-bll/store";


export type RangeSliderProps = {
  max: number
  min: number
}

export const RangeSlider: React.FC<RangeSliderProps> = (props) => {
  const [value, setValue] = useState<number[]>([props.min, props.max]);
  const dispatch = useAppDispatch()


  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{width: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <TextField
        required
        size={'small'}
        value={value[0]}
        InputProps={{
          inputMode: 'numeric'
        }}
      />

      <Slider
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        disableSwap
      />
      <TextField
        required={true}
        size={'small'}
        value={value[1]}
        InputProps={{
          inputMode: 'numeric',
        }}>
        123
      </TextField>

    </Box>
  );
};

