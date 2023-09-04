export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? '0' + day : day} 
  / ${month < 10 ? '0' + month : month} 
  / ${year}`;

  return formattedDate;
};
