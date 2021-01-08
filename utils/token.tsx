import Cookies from "js-cookie";
import { GetToken } from "./@type";

let getToken: GetToken;

getToken = (token) => {
  if (token) {
    if (typeof token === "string") {
      return token;
    } else {
      return Cookies.get("token") || "";
    }
  } else {
    return "";
  }
};

export { getToken };
