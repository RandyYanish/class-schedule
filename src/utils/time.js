export function currentTime(format = 'hh:mm:ss') {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  switch (format) {
    case 'hh:mm':
      return `${hours}:${minutes}`;
    case 'hh:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    default:
      return `${hours}:${minutes}:${seconds}`;
  }
};

export function formatTimeSeconds(time) {
  let hours = time.split(':')[0];
  let minutes = time.split(':')[1];
  let seconds = time.split(':')[2];
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

export function formatTimeMinutes(time) {
  let hours = time.split(':')[0];
  let minutes = time.split(':')[1];
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

export function timeToMinutes(time) {
  let hours = time.split(':')[0];
  let minutes = time.split(':')[1];
  return parseInt(hours) * 60 + parseInt(minutes);
}
