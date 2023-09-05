import React from 'react';
import styles from './PriceInfo.module.scss';

interface PriceInfoProps {
  prices: { priceUSD: number; priceUAH: number };
}

export const PriceInfo: React.FC<PriceInfoProps> = ({ prices }) => {
  const { priceUSD, priceUAH } = prices;

  return (
    <div className={styles.priceInfo}>
      <p className={styles['priceInfo-USD']}>
        {priceUSD} <span className={styles['priceInfo-USD-label']}>$</span>
      </p>
      <p className={styles['priceInfo-UAH']}>
        {priceUAH} <span className={styles['priceInfo-UAH-label']}>UAH</span>
      </p>
    </div>
  );
};
