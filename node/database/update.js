// 更新指定type的count计数
exports.updateTypeCountByTypeId = async ({ db, typeId, count }) => {
  return await db.run("UPDATE type SET typeCount = ? WHERE typeId = ? ", count, typeId);
};

// 更新指定tag的count计数
exports.updateTagCountByTagId = async ({ db, count, tagId }) => {
  return await db.run("UPDATE tag SET tagCount = ? WHERE tagId = ?", count, tagId);
};
