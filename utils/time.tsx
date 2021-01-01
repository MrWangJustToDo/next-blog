// 事件处理的工具
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
    console.warn(`时间参数错误${time}`);
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
