import fecha from 'fecha';
import { DataItem } from '../..';

/**
 * 生成日历图的数据
 * @param data
 * @param from
 * @param to
 */
export function generateCalendarData(data: DataItem[], from: string, to: string): DataItem[] {
  const fromDate = fecha.parse(from, 'YYYY-MM-DD');
  const toDate = fecha.parse(to, 'YYYY-MM-DD');

  return data;
}
