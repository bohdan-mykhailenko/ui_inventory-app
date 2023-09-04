import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import styles from './ProductSelect.module.scss';
import { setSelectedValue } from '../../reducers/filterSlice';
import { RootState } from '../../store';

export const ProductSelect = () => {
  const selectedValue = useSelector(
    (state: RootState) => state.filter.selectedValue,
  );
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;

    dispatch(setSelectedValue(newValue));
  };

  return (
    <FormControl>
      <div className={styles.productSelect__wrapper}>
        <span className={styles.productSelect__label}>Type:</span>
        <Select
          value={selectedValue}
          onChange={handleChange}
          className={styles.productSelect__select}
        >
          <MenuItem value="default" disabled>
            Select an option
          </MenuItem>
          <MenuItem value="Phones">Phones</MenuItem>
          <MenuItem value="Tablets">Tablets</MenuItem>
          <MenuItem value="Monitors">Monitors</MenuItem>
          <MenuItem value="Laptops">Laptops</MenuItem>
        </Select>
      </div>
    </FormControl>
  );
};
