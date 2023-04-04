import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import {useAppDispatch} from "../../../../n2-bll/store";
import {
  maxCardsCountAC,
  minCardsCountAC,
  packNameAC,
  pageAC,
  userIdAC
} from "../../../../n2-bll/table-reducer";


type CloseSettingsProps = {
  setContainedButton: (containedButton: boolean) => void
  setSearchValue: (searchValue: string) => void
}

export const CloseSettings: React.FC<CloseSettingsProps> = (props) => {
  const dispatch = useAppDispatch()
  const {setContainedButton, setSearchValue} = props
  const onClickHandler = () => {
    dispatch(packNameAC(''))
    setSearchValue('')
    dispatch(userIdAC(''))
    setContainedButton(false)
    dispatch(maxCardsCountAC(110))
    dispatch(minCardsCountAC(0))
    dispatch(pageAC(1))
  }
  return (
    <IconButton onClick={onClickHandler}
                sx={{border: '1px solid #D1D1D2FF', borderRadius: '6px', alignItems: 'center'}}>
      <CancelIcon sx={{color: '#0080FF'}}/>
    </IconButton>
  );
};

