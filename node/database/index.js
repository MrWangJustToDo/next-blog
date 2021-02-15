const getSql = require("./get");
const insertSql = require("./insert");
const updateSql = require("./update");
const deleteSql = require("./delete");

module.exports = { ...getSql, ...insertSql, ...updateSql, ...deleteSql };
