import dayjs from "dayjs";
import "dayjs/locale/en"; // Import the locale you want to use
import relativeTime from "dayjs/plugin/relativeTime"; // Import the relativeTime plugin

dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin
dayjs.locale("en"); // Set the locale you want to use

export function getDayjsFromDate(date: Date): dayjs.Dayjs {
  return dayjs(date);
}
