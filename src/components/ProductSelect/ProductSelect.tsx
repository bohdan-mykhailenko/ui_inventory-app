import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import styles from './ProductSelect.module.scss';

export const ProductSelect = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
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
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </div>
    </FormControl>
  );
};
