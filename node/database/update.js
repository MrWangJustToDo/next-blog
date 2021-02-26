const { log } = require("../utils");
const { RequestError } = require("../utils/error");

/**
 * update操作
 * @param {db: Object, table: String, param: {set: {String: String}, where: {String: {value:operator}}}} params db 数据库连接对象，table 表名称，paramupdate参数{set:{typeCount: 1}, where: {typeId: {value: 1, oparetor: 'and'}}}
 */
exports.updateTableWithParam = async ({ db, table, param }) => {
  let Sql = `UPDATE ${table} SET`;
  const sqlParam = [];
  const set = param.set;
  if (!set || typeof set !== "object") {
    throw new RequestError(`更新${table}参数错误`, 400);
  }
  for (let key in set) {
    Sql += ` ${key} = ?,`;
    sqlParam.push(set[key]);
  }
  Sql = Sql.slice(-1);
  const where = param.where;
  if (!where || typeof where !== "object") {
    throw new RequestError(`更新${table}参数错误`, 400);
  }
  Sql = Sql + "WHERE";
  for (let key in where) {
    Sql += ` ${key} = ?`;
    sqlParam.push(where[key].value);
    if (where[key].operator) {
      Sql += `${where[key].operator}`;
    }
  }
  log(`update type sql: ${Sql}, params: ${sqlParam.toString()}`);
  return await db.run(Sql, ...sqlParam);
};

// 更新指定type的count计数
exports.updateTypeCountByTypeId = async ({ db, typeId, count }) => {
  return await db.run("UPDATE type SET typeCount = ? WHERE typeId = ? ", count, typeId);
};

// 更新指定tag的count计数
exports.updateTagCountByTagId = async ({ db, count, tagId }) => {
  return await db.run("UPDATE tag SET tagCount = ? WHERE tagId = ?", count, tagId);
};
