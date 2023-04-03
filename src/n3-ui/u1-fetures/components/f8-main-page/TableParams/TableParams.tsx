import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button/Button';
import Typography from "@mui/material/Typography";
import {RangeSlider} from "../../Slider/Slider";
import s from './TableParams.module.css'


type VariantButton = 'contained' | 'outline'
export type TableParamsProps = {
  maxCardsCount: number
  minCardsCount: number

}

export const TableParams: React.FC<TableParamsProps> = (props) => {
  const [containedButton, setContainedButton] = useState(true)
  const changeVariantButton = () => {
    setContainedButton(!containedButton)
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
          <Typography sx={{fontWeight: '600', fontSize: '17px', marginBottom: '10px'}}
                      align={'left'}>
            Show packs cards
          </Typography>
        </div>
        <div className={s.buttons}>
          <Button onClick={changeVariantButton}
                  variant={containedButton ? "contained" : 'outlined'}
                  size={'medium'}

          >
            MY
          </Button>
          <Button onClick={changeVariantButton}
                  variant={containedButton ? "outlined" : 'contained'}
                  size={'medium'}

          >
            ALL
          </Button>
        </div>
      </div>

      <div>
        <Typography sx={{fontWeight: '600', fontSize: '17px'}}
                    align={'left'}>
          Number of cards
        </Typography>
        <RangeSlider max={props.maxCardsCount} min={props.minCardsCount}/>
      </div>
    </div>
  );
};

