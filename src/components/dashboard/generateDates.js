import { CalendarViewDaySharp } from "@material-ui/icons";

export function todayDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const todayString = dd + '-' + mm + '-' + yyyy;
  return todayString;
}

export function last7Days() {
  let result = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i)
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const dateString = dd + '-' + mm + '-' + yyyy;
    result.push(dateString);
  }
  
  return result;

}