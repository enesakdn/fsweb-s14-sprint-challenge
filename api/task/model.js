const db = require("../../data/dbConfig");

async function create(data) {
  const newTaskId = await db("tasks").insert(data);
  const newTask = await db("tasks").where("task_id", newTaskId[0]).first();

  const returnData = {
    ...newTask,
    task_completed: newTask.task_completed === 1 ? true : false,
  };
  return returnData;
}

async function fetch() {
  /*  [ ] `[GET] /api/tasks`
  - `task_completed` bir tamsayı olarak saklansa da API, istemciyle etkileşim kurarken boolean'lar kullanır.
  - Her task bir `project_name` ve `project_description` içermelidir
  - Yanıt gövdesi örneği: `[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]` */

  const data = await db("tasks")
    .leftJoin("projects", "tasks.project_id", "projects.project_id")
    .select(
      "tasks.task_id",
      "tasks.task_description",
      "tasks.task_notes",
      "tasks.task_completed",
      "projects.project_name",
      "projects.project_description"
    );

  const returndata = data.map((obj) => {
    return { ...obj, task_completed: obj.task_completed === 1 ? true : false };
  });
  return returndata;
}

module.exports = {
  fetch,
  create,
};
