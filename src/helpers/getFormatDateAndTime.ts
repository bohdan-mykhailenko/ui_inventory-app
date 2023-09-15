import { monthNames } from '../consts/monthNames';

export const getFormatDateAndTime = (inputDate: string | Date) => {
  const date = new Date(inputDate);

  const weekday = date.toLocaleString('en-US', { weekday: 'long' });

  const day = date.getDate().toString().padStart(2, '0');
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  // const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${day} / ${month} / ${year}`;

  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime, weekday };
};
