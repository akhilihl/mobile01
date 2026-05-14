export const fullMonthArray = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const monthArray = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
];

export const allMonths = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

type DateFormat =
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'Month DD, YYYY'
  | 'DD Mon YYYY'
  | 'DD/MM/YY'
  | 'DD.MM.YYYY'
  | 'dd Mon, YYYY';

export const DateField = (dateInput: string | Date, format: DateFormat): string => {
  const d = new Date(dateInput);
  const date = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'YYYY-MM-DD': return `${year}-${month}-${date}`;
    case 'DD/MM/YYYY': return `${date}/${month}/${year}`;
    case 'Month DD, YYYY': return `${fullMonthArray[d.getMonth()]} ${date}, ${year}`;
    case 'DD Mon YYYY': return `${date} ${monthArray[d.getMonth()]} ${year}`;
    case 'DD/MM/YY': return `${date}/${month}/${year.toString().slice(2, 4)}`;
    case 'DD.MM.YYYY': return `${date}.${month}.${year}`;
    case 'dd Mon, YYYY': return `${date} ${monthArray[d.getMonth()]}, ${year}`;
    default: return '';
  }
};
