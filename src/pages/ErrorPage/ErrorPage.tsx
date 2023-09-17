import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage: React.FC = () => {
  const location = useLocation();

  const errorMessage =
    location.state && location.state.errorMessage
      ? location.state.errorMessage
      : 'An unexpected Error!';

  return (
    <section className={styles.errorPage} data-aos="zoom-in-down">
      <h2 className={styles.errorPage__title}> Error occured!</h2>

      <p className={styles.errorPage__message}>{errorMessage}</p>

      <div className={styles.errorPage__linkWrapper}>
        <Link to="/orders" className={styles.errorPage__link}>
          Orders Page
        </Link>
        <Link to="/products" className={styles.errorPage__link}>
          Products Page
        </Link>
      </div>
    </section>
  );
};
