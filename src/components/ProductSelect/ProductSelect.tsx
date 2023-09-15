import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import styles from './ProductSelect.module.scss';
import { ProductType } from '../../types/ProductType';
import { useSearchParams } from 'react-router-dom';

interface ProductSelectProps {
  filterValue: string;
}

export const ProductSelect: React.FC<ProductSelectProps> = ({
  filterValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeFilterValue = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('type', value);

    setSearchParams(newSearchParams);
  };

  return (
    <FormControl>
      <div className={styles.productSelect__wrapper}>
        <span className={styles.productSelect__label}>Type:</span>
        <Select
          value={filterValue}
          onChange={handleChangeFilterValue}
          className={styles.productSelect__select}
        >
          <MenuItem value="default" disabled>
            Select an option
          </MenuItem>
          <MenuItem value={ProductType.ALL}>All</MenuItem>
          <MenuItem value={ProductType.LAPTOPS}>Laptops</MenuItem>
          <MenuItem value={ProductType.MONITORS}>Monitors</MenuItem>
          <MenuItem value={ProductType.PHONES}>Phones</MenuItem>
          <MenuItem value={ProductType.TABLETS}>Tablets</MenuItem>
        </Select>
      </div>
    </FormControl>
  );
};
