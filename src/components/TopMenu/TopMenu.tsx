import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getFormatDateAndTime } from '../../helpers/getFormatDateAndTime';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './TopMenu.module.scss';
import { API_URL } from '../../consts/api';

export const TopMenu: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dateInfo, setDateInfo] = useState<{
    formattedDate: string;
    formattedTime: string;
    weekday: string;
  }>({
    formattedDate: '',
    formattedTime: '',
    weekday: '',
  });
  const [activeSessions, setActiveSessions] = useState<number>(0);

  useEffect(() => {
    const socket = io('http://localhost:5000/');

    console.log(socket);

    socket.on('activeSessions', (count: number) => {
      setActiveSessions(count);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
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
      <p className={styles.topMenu__activeSessions}>
        Active Sessions:
        <p className={styles['topMenu__activeSessions--count']}>
          {activeSessions}
        </p>
      </p>

      <div className={styles.topMenu__dateInfo}>
        <span className={styles.topMenu__weekday}>{dateInfo.weekday}</span>

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
