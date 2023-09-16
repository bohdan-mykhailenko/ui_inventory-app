import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getFormatDateAndTime } from '../../helpers/getFormatDateAndTime';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { API_URL } from '../../consts/api';
import styles from './TopMenu.module.scss';
import { FormattedDate } from '../../types/FormattedDate';

export const TopMenu: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeSessions, setActiveSessions] = useState<number>(0);
  const [dateInfo, setDateInfo] = useState<FormattedDate>({
    formattedDate: '',
    formattedTime: '',
    weekday: '',
  });

  useEffect(() => {
    const socket = io(API_URL);

    socket.on('activeSessions', (count: number) => {
      setActiveSessions(count);
    });

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const { formattedDate, formattedTime, weekday } =
      getFormatDateAndTime(currentDate);
    setDateInfo({
      formattedDate,
      formattedTime,
      weekday,
    });
  }, [currentDate]);

  return (
    <div className={styles.topMenu}>
      <div className={styles.topMenu__dateInfo}>
        <div className={styles.topMenu__sessionWrapper}>
          <p className={styles.topMenu__weekday}>{dateInfo.weekday}</p>
          <div className={styles.topMenu__activeSessions}>
            Sessions:
            <p className={styles['topMenu__activeSessions--count']}>
              {activeSessions}
            </p>
          </div>
        </div>

        <div className={styles.topMenu__dateWrapper}>
          <span className={styles.topMenu__date}>{dateInfo.formattedDate}</span>

          <div className={styles.topMenu__timeWrapper}>
            <AccessTimeIcon className={styles.topMenu__timeIcon} />
            <span className={styles.topMenu__time}>
              {dateInfo.formattedTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
