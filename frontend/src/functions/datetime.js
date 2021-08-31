// timeList = [ '00:00', '01:00',...]を24時間分作る関数
export const getTimeIntervalList = () => {
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  // console.log(hours);
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map(hour => minutes.map(minute => hour + ':' + minute)).flat();
  // console.log(timeList);
  return timeList;
};