import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.notFoundPage__title}>Oops!</h1>
      <p className={styles.notFoundPage__message}>
        Sorry, we can’t find the page you’re looking for.
      </p>
      <Link to="/" className={styles.notFoundPage__link}>
        Home page
      </Link>
      <div className={styles.notFoundPage__apologies}>Sorry!</div>
    </div>
  );
};
