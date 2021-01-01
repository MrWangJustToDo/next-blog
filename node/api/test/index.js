const { path } = require("../../path");
const {
  publishBlog,
  publishHome,
  publishTag,
  publishType,
  publishUserEx,
  registerUser,
  publishChildComment,
  publishPrimaryComment,
} = require("./test");

exports.testHandler = {
  [path.testBlog]: publishBlog,
  [path.testHome]: publishHome,
  [path.testTag]: publishTag,
  [path.testType]: publishType,
  [path.testUserEx]: publishUserEx,
  [path.testUser]: registerUser,
  [path.testPrimary]: publishPrimaryComment,
  [path.testChild]: publishChildComment,
};
