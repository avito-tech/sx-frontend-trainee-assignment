import { format } from "date-fns";

export const dateToTime = (date) => {
    return format(date, "HH:mm");
  };