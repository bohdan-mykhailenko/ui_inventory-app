import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <section className={styles.notFoundPage} data-aos="zoom-in-down">
      <h2 className={styles.notFoundPage__title}>Oops!</h2>
      <p className={styles.notFoundPage__message}>
        Sorry, we can’t find the page you’re looking for.
      </p>
      <div className={styles.notFoundPage__linkWrapper}>
        <Link to="/orders" className={styles.notFoundPage__link}>
          Orders Page
        </Link>
        <Link to="/products" className={styles.notFoundPage__link}>
          Products Page
        </Link>
      </div>
    </section>
  );
};
