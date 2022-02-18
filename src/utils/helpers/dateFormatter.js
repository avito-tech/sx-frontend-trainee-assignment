import { format } from "date-fns";

export const timestampToTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString("ru-RU");
};
