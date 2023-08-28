import React, { useState } from 'react';
import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        className={styles.search__input}
        value={query}
        onChange={handleChangeQuery}
      />
    </div>
  );
};
