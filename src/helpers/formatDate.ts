export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedMonth = monthNames[month - 1];

  const formattedDate = `${
    day < 10 ? '0' + day : day
  } / ${formattedMonth} / ${year}`;

  return formattedDate;
};
