import moment from "moment";
import "moment/locale/zh-cn";
import { TimeToString } from "./@type";

let momentTo: TimeToString;
let calendar: TimeToString;

momentTo = (time) => {
  if (typeof time === "string") {
    time = new Date(time);
  }
  if (time instanceof Date) {
    return moment(new Date()).to(moment(time));
  } else {
    console.error(`time parameter error d${time}`);
    const now = new Date();
    return moment(now).to(now);
  }
};

calendar = (time) => {
  if (typeof time === "string") {
    time = new Date(time);
  }
  if (time instanceof Date) {
    return moment(time).calendar();
  } else {
    return moment(new Date()).calendar();
  }
};

export { momentTo, calendar };
