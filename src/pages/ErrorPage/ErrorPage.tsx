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
    <div className={styles.errorPage}>
      <h2 className={styles.errorPage__title}>Oops! Error occured!</h2>
      <p className={styles.errorPage__message}>{errorMessage}</p>
      <Link to="/" className={styles.errorPage__link}>
        Home page
      </Link>
      <img
        className={styles.errorPage__img}
        src="https://www.mtwmag.com/wp-content/uploads/2018/06/manufacturing-Error.jpg"
        alt="Error"
      />
    </div>
  );
};
