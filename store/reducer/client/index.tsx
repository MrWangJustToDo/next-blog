import { combineReducers } from "redux";
import currentToken from "./currentToken";
import currentHomePage from "./currentHomePage";
import currentHeader from "./currentHeader";
import currentType from "./currentType";
import currentTYpePage from "./currentTypePage";
import currentTag from "./currentTag";
import currentTagPage from "./currentTagPage";
import currentBlogId from "./currentBlogId";
import { actionName } from "config/action";

export default combineReducers({
  [actionName.currentHeader]: currentHeader,
  [actionName.currentHomePage]: currentHomePage,
  [actionName.currentToken]: currentToken,
  [actionName.currentType]: currentType,
  [actionName.currentTypePage]: currentTYpePage,
  [actionName.currentTag]: currentTag,
  [actionName.currentTagPage]: currentTagPage,
  [actionName.currentBlogId]: currentBlogId,
});
