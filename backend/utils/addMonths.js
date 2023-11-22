const addMonths = (date, months) => {
  date.setMonth(date.getMonth() + months);

  return date;
};

export default addMonths;
