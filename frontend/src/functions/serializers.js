import { format } from 'date-fns';

export const serializeEvent = (event) => {
  if (event === null) {
    return null;
  }

  // stateのeventからstatとendの日付を取得し、定数に代入する。
  const start = new Date(event.start);
  const end = new Date(event.end);

  // stateのeventオブジェクトを整形し、returnする。
  return {
    ...event,
    start,
    end,
    // 日付の文字列を変換した、startDateとendDateのオブジェクトに追加する。
    startDate: format(start, 'yyyy/MM/dd'),
    endDate: format(end, 'yyyy/MM/dd'),
    // 時刻を文字列に変換した、startTimeとendTimeをオブジェクトに追加する。
    startTime: format(start, 'HH:mm'),
    endTime: format(end, 'HH:mm'),
    // デフォルトカラーを青色に設定
    color: event.color || '#2196F3' ,
  };
};
