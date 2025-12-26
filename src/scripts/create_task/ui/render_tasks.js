export function renderTasks({
  tasks,
  taskList,
  priorityOrder,
  createTask,
}) {
  taskList.innerHTML = "";

  [...tasks]
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    .forEach((task) => {
      const taskNode = createTask(task);
      taskList.appendChild(taskNode);
    });
}