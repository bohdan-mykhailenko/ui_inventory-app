import React, { useCallback, useState } from 'react';
import styles from './Search.module.scss';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>('');

  const debouncedHandleChangeQuery = useCallback(
    debounce((value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set('query', value);
      setSearchParams(newSearchParams);
    }, 700),
    [searchParams, setSearchParams],
  );

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    debouncedHandleChangeQuery(value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        className={styles.search__input}
        name="query"
        onChange={handleChangeQuery}
        value={inputValue}
      />
    </div>
  );
};
