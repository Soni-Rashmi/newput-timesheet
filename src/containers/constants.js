export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const startYear = 2017;
export function getYears(){
  let currentYear = new Date().getFullYear();
  let years = [];
  for(let i = startYear; i<= currentYear; i++ ){
    years.push(i);
  }
  return years;
};
