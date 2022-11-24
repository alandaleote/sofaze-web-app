export default function formatDate(date) {
  let arr = date.split("-");
  //In dd-mm-yyyy format
  let dateFormat = arr[2] + "-" + arr[1] + "-" + arr[0];
  return dateFormat;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDateToday(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}
