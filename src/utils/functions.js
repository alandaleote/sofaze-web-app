export default function formatDate(date) {
  let arr = date.split("-");
  //In dd-mm-yyyy format
  let dateFormat = arr[2] + "-" + arr[1] + "-" + arr[0];
  return dateFormat;
}
