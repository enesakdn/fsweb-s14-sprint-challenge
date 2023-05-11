const db = require("../../data/dbConfig");

async function fetch() {
  const data = await db("projects");

  const returndata = data.map((obj) => {
    return {
      ...obj,
      project_completed: obj.project_completed === 1 ? true : false,
    };
  });
  return returndata;
}

async function create(data) {
  const insertedData = await db("projects").insert(data);
  const dataFromDataBase = await db("projects")
    .where({
      project_id: insertedData[0],
    })
    .first();
  const returnData = {
    ...dataFromDataBase,
    project_completed: data.project_completed === 1 ? true : false,
  };
  return returnData;
}

module.exports = {
  fetch,
  create,
};
