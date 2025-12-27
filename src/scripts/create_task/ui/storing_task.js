const STORAGE_KEY = "quera_tasks";
const COMPLETED_STORAGE_KEY = "quera_completed_tasks";
export function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasksFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];}


  export function saveCompletedTasksToStorage(completedTasks) {
  localStorage.setItem(
    COMPLETED_STORAGE_KEY,
    JSON.stringify(completedTasks)
  );
}

export function loadCompletedTasksFromStorage() {
  const data = localStorage.getItem(COMPLETED_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}