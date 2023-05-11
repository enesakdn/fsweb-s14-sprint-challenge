const db = require("../../data/dbConfig");

async function fetch() {
  return await db("resources");
}

async function create(data) {
  const [newResourceId] = await db("resources").insert(data);
  const newResource = await db("resources")
    .where({ resource_id: newResourceId })
    .first();
  return newResource;
}

module.exports = {
  fetch,
  create,
};
